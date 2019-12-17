export default function lobbyListeners(socket) {
  socket.on('createRoom', (data) => {
    socket.join(data.name);
  });
}
