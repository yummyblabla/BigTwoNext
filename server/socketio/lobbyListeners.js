/* eslint-disable no-param-reassign */

import {
  USER_LOBBY_STATE, USER_IN_ROOM_STATE, USER_IN_GAME_STATE,
} from '../modules/Helpers/Constants';
import Room from '../modules/Room';
import Player from '../modules/Player';
import Game from '../modules/Game';


export default function lobbyListeners(lobby, socket, io, rooms, clients, usernames, games) {
  /**
   * User Join Lobby.
   */
  socket.on('userJoinLobby', ({ username }) => {
    socket.join('/lobby');
    usernames[username] = true;
    clients[socket.id] = new Player(username, socket.id);

    // Send lobby update of new lobby list
    lobby.emit('getLobbyList', {
      clients,
    });

    // Send socket room list
    socket.emit('getRoomList', {
      rooms,
    });
  });

  /**
   * Creating Room Handler.
   */
  socket.on('userCreateRoom', ({ roomName, maxPlayers, gameVersion }) => {
    // Check if client exists
    if (!clients.hasOwnProperty(socket.id)) {
      return;
    }
    // Duplicate room error
    if (rooms.hasOwnProperty(roomName)) {
      socket.emit('lobbyError', {
        message: 'Duplicate room name exists.',
      });
      return;
    }

    // Room name length checking
    if (roomName.length <= 0) {
      socket.emit('lobbyError', {
        message: 'Room name is too short.',
      });
      return;
    }
    if (roomName.length >= 8) {
      socket.emit('lobbyError', {
        message: 'Room name is too long.',
      });
      return;
    }

    const player = clients[socket.id];

    rooms[roomName] = new Room(
      roomName, maxPlayers, gameVersion, player,
    );

    // Join socket room
    socket.join(`room-${roomName}`);
    player.joinRoom(roomName);

    // Send join room success message
    socket.emit('joinRoomSuccess', {
      room: rooms[roomName],
    });

    // Send lobby update about player update
    lobby.emit('updatePlayerStatus', {
      socketId: socket.id,
      state: USER_IN_ROOM_STATE,
    });
    // Lobby gets new Room List.
    lobby.emit('getRoomList', {
      rooms,
    });
  });

  /**
   * Handles user attempt to join room.
   */
  socket.on('userJoinRoom', ({ roomName }) => {
    // Check if client exists
    if (!clients.hasOwnProperty(socket.id)) {
      return;
    }
    // Check if room exists
    if (!rooms.hasOwnProperty(roomName)) {
      socket.emit('lobbyError', {
        message: 'Room does not exist.',
      });
      return;
    }

    const room = rooms[roomName];
    const player = clients[socket.id];

    // Edge-case checking
    if (room.checkIfStarted()) {
      socket.emit('lobbyError', {
        message: 'Room already started.',
      });
      return;
    }

    if (room.checkIfFull()) {
      socket.emit('lobbyError', {
        message: 'Room is full.',
      });
      return;
    }

    if (player.checkIfInRoom()) {
      socket.emit('lobbyError', {
        message: 'You are already in a room.',
      });
      return;
    }

    // Add player to room
    room.addPlayer(player);
    player.joinRoom(roomName);

    // Join socket room
    socket.join(`room-${roomName}`);
    // Send join room success message
    socket.emit('joinRoomSuccess', {
      room,
    });
    // Send lobby update about player in room
    lobby.emit('updatePlayerStatus', {
      socketId: socket.id,
      state: USER_IN_ROOM_STATE,
    });
    // Send lobby update about room update
    lobby.emit('updateRoomStatus', {
      room,
    });
    // Send players in room update about room update
    // TODO: This may be redundant
    // if we can bundle with updateRoomStatus and handle check on clientside
    lobby.to(`room-${roomName}`).emit('updateCurrentRoom', {
      room,
    });
  });

  /**
   * Handles user leaving room.
   */
  socket.on('userLeaveRoom', ({ roomName }) => {
    // Check if client exists
    if (!clients.hasOwnProperty(socket.id)) {
      return;
    }
    // Check if room exists
    if (!rooms.hasOwnProperty(roomName)) {
      return;
    }

    const room = rooms[roomName];
    const player = clients[socket.id];

    // Remove player from room
    room.removePlayer(player);

    // Handle Player (client) side
    player.leaveRoom();
    // Leave socket room
    socket.leave(`room-${roomName}`);
    // Send leave room success message
    socket.emit('leaveRoomSuccess', {});
    // Send lobby update about player update
    lobby.emit('updatePlayerStatus', {
      socketId: socket.id,
      state: USER_LOBBY_STATE,
    });

    // Handle Rooms side
    if (room.checkIfEmpty()) {
      // Delete room if empty
      delete rooms[roomName];
      // Send lobby update about new list of rooms
      lobby.emit('getRoomList', {
        rooms,
      });
    } else {
      // Send lobby update about room update
      lobby.emit('updateRoomStatus', {
        room,
      });
      // TODO: This may be redundant
      // if we can bundle with updateRoomStatus and handle check on clientside
      lobby.to(`room-${roomName}`).emit('updateCurrentRoom', {
        room,
      });
    }
  });

  /**
   * Handle room starting game.
   */
  socket.on('startGame', ({ roomName }) => {
    // Check if client exists
    if (!clients.hasOwnProperty(socket.id)) {
      return;
    }
    // Check if room exists
    if (!rooms.hasOwnProperty(roomName)) {
      return;
    }

    const player = clients[socket.id];
    const room = rooms[roomName];

    // Do not start if player is not host
    if (room.hostName !== player.username) {
      return;
    }

    if (!room.checkCanStart()) {
      socket.emit('startGameError', {
        message: 'Not enough players to start.',
      });
      // return;
    }

    // Create game
    games[roomName] = new Game(roomName, [...room.getPlayers()], room.getVersion());

    // Send message to players in room to start game
    lobby.to(`room-${roomName}`).emit('startGameSuccess', {});

    lobby.in(`room-${roomName}`).clients((error, socketIds) => {
      if (error) throw error;
      socketIds.forEach((socketId) => {
        const currSocket = io.sockets.connected[socketId];
        const currPlayer = clients[socketId];
        // Change player state
        currPlayer.startedGame();
        // Make players in room to leave lobby namespace
        currSocket.leave('/lobby');
        // Emit message to lobby
        lobby.emit('updatePlayerStatus', {
          socketId,
          state: USER_IN_GAME_STATE,
        });
      });
    });
  });
}
