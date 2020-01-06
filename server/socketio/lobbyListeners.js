/* eslint-disable no-param-reassign */

import {
  USER_LOBBY_STATE, USER_IN_ROOM_STATE, USER_IN_GAME_STATE,
} from '../modules/Helpers/Constants';
import Room from '../modules/Room';
import PlayerLobby from '../modules/Player';
import Game from '../modules/Game';


export default function lobbyListeners(lobby, socket, io, rooms, clients, usernames, games) {
  /**
   * User Join Lobby.
   */
  socket.on('userJoinLobby', ({ username }) => {
    socket.join('/lobby');
    if (username in clients) {
      return;
    }
    usernames[username] = true;
    clients[socket.id] = new PlayerLobby(username, socket.id);

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
    if (rooms.hasOwnProperty(roomName)) {
      socket.emit('createRoomError', {
        message: 'Duplicate room name exists.',
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
    // Send create room success message
    socket.emit('createRoomSuccess', {});
    // TODO: may bundle with createRoom success
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
   * User Disconnect Handler.
   */
  socket.on('disconnect', () => {
    console.log('someone disconnected');
    const player = clients[socket.id];
    if (player && player.checkIfInRoom()) {
      const roomName = player.getRoom();

      const room = rooms[roomName];
      if (room) {
        room.removePlayer(player);

        if (room.checkIfEmpty()) {
          delete rooms[roomName];
          lobby.emit('getRoomList', {
            rooms,
          });
        }
      }
      delete usernames[player.getUsername()];
    }

    delete clients[socket.id];
    lobby.emit('getLobbyList', {
      clients,
    });
  });

  /**
   * Handles user attempt to join room.
   */
  socket.on('userJoinRoom', ({ roomName }) => {
    if (!rooms.hasOwnProperty(roomName)) {
      socket.emit('joinRoomError', {
        message: 'Room does not exist.',
      });
      return;
    }

    const room = rooms[roomName];
    const player = clients[socket.id];

    if (room.checkIfStarted()) {
      socket.emit('joinRoomError', {
        message: 'Room already started.',
      });
      return;
    }

    if (room.checkIfFull()) {
      socket.emit('joinRoomError', {
        message: 'Room is full.',
      });
      return;
    }

    if (player.checkIfInRoom()) {
      socket.emit('joinRoomError', {
        message: 'You are already in a room.',
      });
    }

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
    const room = rooms[roomName];
    const player = clients[socket.id];
    room.removePlayer(player);

    if (room.checkIfEmpty()) {
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
    }
    // Leave socket room
    socket.leave(`room-${roomName}`);
    // Send leave room success message
    socket.emit('leaveRoomSuccess', {});
    // Send lobby update about player update
    lobby.emit('updatePlayerStatus', {
      socketId: socket.id,
      state: USER_LOBBY_STATE,
    });
  });

  socket.on('startGame', ({ roomName }) => {
    const player = clients[socket.id];
    const room = rooms[roomName];
    if (room.hostName !== player.username) {
      return;
    }

    if (!room.checkCanStart()) {
      socket.emit('startGameError', {
        message: 'Not enough players to start.',
      });
      // return;
    }
    games[roomName] = new Game(roomName, room.getPlayers(), room.getVersion());
    lobby.to(`room-${roomName}`).emit('startGameSuccess', {});
    lobby.in(`room-${roomName}`).clients((error, socketIds) => {
      if (error) throw error;
      socketIds.forEach((socketId) => {
        const currSocket = io.sockets.connected[socketId];
        currSocket.leave('/lobby');
        lobby.emit('updatePlayerStatus', {
          socketId,
          state: USER_IN_GAME_STATE,
        });
      });
    });
  });
}
