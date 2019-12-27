export default function gameListeners(socket, fn) {
  socket.on('something', () => {

  });

  socket.on('setGame', ({ game }) => {
    fn.handleSetGame(game);
  });
  socket.on('receiveCards', ({ cards }) => {
    fn.handleReceiveCards(cards);
  });
}

export function startGameListen(socket, cb) {
  socket.on('startGame', ({ roomName }) => {
    cb();
    socket.emit('getCards', { roomName });
  });
}
