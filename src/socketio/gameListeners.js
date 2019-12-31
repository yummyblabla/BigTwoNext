export default function gameListeners(socket, fn) {
  socket.on('setGame', ({ game }) => {
    fn.handleSetGame(game);
  });
  socket.on('startGame', ({ roomName, indexOfFirstPlayer, gameVersion }) => {
    fn.handleStartGame(roomName, indexOfFirstPlayer, gameVersion);
  });
  socket.on('receiveCards', fn.handleReceiveCards);
  socket.on('validPlay', ({ cards }) => {
    fn.handleValidPlay(cards);
  });
  socket.on('cardsPlayed', ({ cards }) => {
    fn.handleCardsPlayed(cards);
  });
}
