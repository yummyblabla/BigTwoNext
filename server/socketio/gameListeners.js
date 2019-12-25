/* eslint-disable no-param-reassign */

import Game from '../../modules/Game';

export default function gameListeners(lobby, socket, rooms, clients, games) {
  socket.on('getGame', ({ roomName }) => {
    games[roomName] = new Game();
    const currentGame = games[roomName];
    socket.emit('setGame', {
      game: {
        roomName,
        players: ['placeholder'],
      },
    });
    currentGame.readyCounterIncrease();

    if (currentGame.getReadyCounter() === currentGame.getNumberOfPlayers()) {
      currentGame.startGame();
      // emit to all people in room
      socket.emit('startGame', { roomName });
    }
  });

  socket.on('getCards', ({ roomName }) => {
    const currentGame = games[roomName];
    socket.emit('receiveCards', {
      cards: currentGame.getCards(0),
    });
  });

  socket.on('sendCards', ({ cards }) => {
    console.log(cards);
  });
}
