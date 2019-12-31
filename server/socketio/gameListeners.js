/* eslint-disable no-param-reassign */
import { CHINESE_VERSION } from '../../modules/Helpers/Constants';
import Game from '../../modules/Game';
import PlayerLobby from '../../modules/Player';

export default function gameListeners(lobby, socket, rooms, clients, games) {
  socket.on('getGame', ({ roomName }) => {
    games[roomName] = new Game(
      roomName,
      [new PlayerLobby('Guest4', 'ASDF'), new PlayerLobby('Guest', socket.id), new PlayerLobby('Guest123', 'ASDF'), new PlayerLobby('Guestasd', 'ASDF')],
      CHINESE_VERSION,
    );
    const currentGame = games[roomName];
    socket.emit('setGame', {
      game: {
        roomName,
        players: [new PlayerLobby('Guest4', 'ASDF'), new PlayerLobby('Guest', 'ASDF'), new PlayerLobby('Guest123', 'ASDF'), new PlayerLobby('Guestasd', 'ASDF')],
        gameVersion: currentGame.getGameVersion(),
        scores: currentGame.getScores(),
      },
    });
    currentGame.readyCounterIncrease();

    if (!(currentGame.getReadyCounter() === currentGame.getNumberOfPlayers())) {
      currentGame.distributeCards();
      currentGame.startGame();
      currentGame.determineFirst();

      const indexOfFirstPlayer = currentGame.getPlayerTurn();
      // emit to all people in room
      socket.emit('startGame', { roomName, indexOfFirstPlayer });
    }
  });

  socket.on('getCards', ({ roomName }) => {
    const currentGame = games[roomName];
    const index = currentGame.getPlayers().findIndex(
      (player) => player.getSocketId() === socket.id,
    );
    socket.emit('receiveCards', {
      cards: currentGame.getCards(index),
    });
  });

  socket.on('sendCards', ({ roomName, cards }) => {
    const currentGame = games[roomName];
    const index = currentGame.getPlayers().findIndex(
      (player) => player.getSocketId() === socket.id,
    );
    const hand = currentGame.getCardPile(index);
    cards.forEach((card) => {
      const rank = card.substr(0, card.length - 1);
      const suit = card.substr(card.length - 1);
      const cardIndex = hand.findCard(rank, suit, currentGame.getGameVersion());
      hand.discardCard(cardIndex);
    });

    socket.emit('validPlay', {
      cards,
      passed: false,
    });
    // emit to all people in room
    socket.emit('cardsPlayed', {
      cards,
    });
    if (hand.checkIfHandEmpty()) {
      // emit to all people in room
      const { username } = currentGame.getPlayers()[index];
      currentGame.setLastWinner(username);
      currentGame.resetForNextRound();
      socket.emit('endRound', {
        winner: username,
        scores: currentGame.getScores(),
      });

      setTimeout(() => {
        // reset round
        currentGame.startGame();

        const indexOfFirstPlayer = currentGame.getPlayers().findIndex(
          (player) => player.getUsername() === currentGame.getLastWinner(),
        );

        socket.emit('startGame', {
          roomName, indexOfFirstPlayer, players: currentGame.getPlayers(),
        });
      }, 5000);
    }
  });

  socket.on('passTurn', ({ roomName }) => {
    socket.emit('validPlay', {
      cards: [],
      passed: true,
    });
    socket.emit('cardsPlayed', {
      cards: [],
      passed: true,
    });
  });
}
