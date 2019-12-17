export default function gameListeners(socket) {
  socket.on('play', (data) => {
    console.log(data);
  });
}
