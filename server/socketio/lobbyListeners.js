import {
  USER_LOBBY_STATE, USER_IN_ROOM_STATE, USER_IN_GAME_STATE
} from '../../modules/Helpers/Constants';

/* eslint-disable no-param-reassign */
export default function lobbyListeners(lobby, socket, rooms, clients) {
  socket.on('userJoinLobby', ({ username }) => {
    if (username in clients) {
      return;
    }
    // TODO: handle duplicate
    clients[socket.id] = {
      username,
      id: socket.id,
      state: USER_LOBBY_STATE,
    };
    lobby.emit('getLobbyList', {
      clients,
    });
    socket.emit('getRoomList', {
      rooms,
    });
  });

  socket.on('userCreateRoom', ({ roomName, numberOfPlayers, gameVersion }) => {
    if (roomName in rooms) {
      socket.emit('duplicateRoomExists', {
        message: 'Duplicate room name exists.',
      });
      return;
    }
    const { username } = clients[socket.id];

    rooms[roomName] = {
      roomName,
      numberOfPlayers,
      gameVersion,
      started: false,
      players: [username],
    };

    socket.join(`room-${roomName}`);
    socket.emit('createRoomSuccess', {});
    lobby.emit('getRoomList', {
      rooms,
    });
  });

  socket.on('join', (data) => {
    socket.join(`room-${data.name}`);
    // let rooms = socket.rooms;
    // console.log(rooms);
  });

  socket.on('disconnect', () => {
    console.log('someone disconnected');
    delete clients[socket.id];
  });
}
