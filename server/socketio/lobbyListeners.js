/* eslint-disable no-param-reassign */

import {
  USER_LOBBY_STATE, USER_IN_ROOM_STATE, USER_IN_GAME_STATE
} from '../../modules/Helpers/Constants';
import Room from '../../modules/Room';
import PlayerLobby from '../../modules/PlayerLobby';


export default function lobbyListeners(lobby, socket, rooms, clients) {
  /**
   * User Join Lobby.
   */
  socket.on('userJoinLobby', ({ username }) => {
    if (username in clients) {
      return;
    }

    clients[socket.id] = new PlayerLobby(username, socket.id);

    // Lobby gets Lobby List.
    lobby.emit('getLobbyList', {
      clients,
    });

    // Current user gets Room List.
    socket.emit('getRoomList', {
      rooms,
    });
  });

  /**
   * Creating Room Handler.
   */
  socket.on('userCreateRoom', ({ roomName, maxPlayers, gameVersion }) => {
    if (rooms.hasOwnProperty(roomName)) {
      socket.emit('duplicateRoomExists', {
        message: 'Duplicate room name exists.',
      });
      return;
    }

    const { username } = clients[socket.id];

    rooms[roomName] = new Room(
      roomName, maxPlayers, gameVersion, username,
    );

    socket.join(`room-${roomName}`);

    socket.emit('createRoomSuccess', {});
    socket.emit('joinRoomSuccess', {
      room: rooms[roomName],
    });

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
    delete clients[socket.id];
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
    const { username } = clients[socket.id];

    if (room.checkIfFull()) {
      socket.emit('joinRoomError', {
        message: 'Room is full.',
      });
      return;
    }

    if (room.checkIfStarted()) {
      socket.emit('joinRoomError', {
        message: 'Room already started.',
      });
    }

    room.addPlayer(username);

    // send msg to other players in same room

    socket.join(`room-${roomName}`);
    socket.emit('joinRoomSuccess', {
      room,
    });
    lobby.emit('updatePlayerStatus', {
      socketId: socket.id,
      state: USER_IN_ROOM_STATE,
    });
    lobby.emit('updateRoomStatus', {
      room,
    });
  });

  /**
   * Handles user leaving room.
   */
  socket.on('userLeaveRoom', ({ roomName }) => {
    // remove user from room logic

    socket.leave(`room-${roomName}`);

    socket.emit('leaveRoomSuccess', {});
    lobby.emit('updatePlayerStatus', {
      socketId: socket.id,
      state: USER_LOBBY_STATE,
    });
  });
}
