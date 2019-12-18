/* eslint-disable no-param-reassign */
export default function lobbyListeners(lobby, socket, rooms, clients) {
  socket.on('userJoinLobby', ({ username }) => {
    // TODO: handle duplicate
    clients[socket.id] = {
      username,
      id: socket.id,
    };
    lobby.emit('getLobbyList', {
      clients,
    });
  });

  socket.on('userCreateRoom', ({ roomName, numberOfPlayers, gameVersion }) => {
    // TODO: handle duplicate
    rooms[roomName] = {
      roomName,
      numberOfPlayers,
      gameVersion,
      started: false,
      players: [],
    };

    socket.join(`room-${roomName}`);

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
