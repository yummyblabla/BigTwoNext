export default function gameListeners(socket, fn) {
  socket.on('setGame', ({ game }) => {
    fn.handleSetGame(game);
  });
  socket.on('startGame', ({ roomName }) => {
    fn.handleStartGame(roomName);
  });
  socket.on('receiveCards', ({ cards }) => {
    fn.handleReceiveCards(cards);
  });
}
