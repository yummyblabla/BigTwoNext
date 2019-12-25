export default function gameListeners(socket, fn) {
  socket.on('something', () => {

  });

  socket.on('setGame', ({ game }) => {
    fn.handleSetGame(game);
  });

  socket.on('startGame', ({ roomName }) => {
    fn.handleStartGame();
    socket.emit('getCards', { roomName });
  });

  socket.on('receiveCards', ({ cards }) => {
    fn.handleReceiveCards(cards);
  });
}
