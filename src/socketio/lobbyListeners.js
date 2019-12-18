export default function lobbyListeners(socket, fn) {

  socket.on('getRoomList', ({ rooms }) => {
    // rooms = { roomName: { roomName, numberOfPlayers, gameVersion, started, players } }
    fn.setRooms(rooms);
  });

  socket.on('getLobbyList', ({ clients }) => {
    // clients = { username: { username, id } }
    fn.setPlayers(clients);
  });
}
