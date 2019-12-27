/* eslint-disable no-param-reassign */

import Game from '../../modules/Game';
import PlayerLobby from '../../modules/Player';

export default function gameListeners(lobby, socket, rooms, clients, games) {
  socket.on('getGame', ({ roomName }) => {
    games[roomName] = new Game(roomName, ['player']);
    const currentGame = games[roomName];
    socket.emit('setGame', {
      game: {
        roomName,
        players: [new PlayerLobby('Guest', 'ASDF'), new PlayerLobby('Guest1', 'ASDF'), new PlayerLobby('Guest2', 'ASDF'), new PlayerLobby('Guest3', 'ASDF')],
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
