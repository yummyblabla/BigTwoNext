export default function gameListeners(socket, fn) {
  socket.on('something', () => {

  });

  socket.on('setGame', ({ game }) => {
    fn.handleSetGame(game);
  });
}