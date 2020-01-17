/* eslint-disable no-param-reassign */
import Card from '../modules/Card';
import mergeSort from '../modules/Helpers/Sorting';
import evaluateCards from '../modules/Evaluation';

export default function gameListeners(lobby, socket, io, rooms, clients, games) {
  socket.on('getGame', ({ roomName }) => {
    const room = rooms[roomName];
    const currentGame = games[roomName];
    socket.emit('setGame', {
      game: {
        roomName,
        players: room.getPlayers(),
        gameVersion: currentGame.getGameVersion(),
        scores: currentGame.getScores(),
      },
    });
    currentGame.readyCounterIncrease();

    if (currentGame.getReadyCounter() === currentGame.getNumberOfPlayers()) {
      currentGame.distributeCards();
      currentGame.startGame();
      currentGame.determineFirst();

      const nameOfFirstPlayer = currentGame.getPlayerTurn();
      io.to(`room-${roomName}`).emit('startGame', { roomName, nameOfFirstPlayer });
    }
  });

  socket.on('getCards', ({ roomName }) => {
    const player = clients[socket.id];
    if (!player) return;

    const currentGame = games[roomName];
    if (!currentGame) return;

    const username = player.getUsername();

    socket.emit('receiveCards', {
      cards: currentGame.getCards(username),
    });
  });

  socket.on('sendCards', ({ roomName, cards }) => {
    const player = clients[socket.id];
    if (!player) return;

    const currentGame = games[roomName];
    if (!currentGame) return;

    const playerName = player.getUsername();
    const index = currentGame.getPlayers().findIndex(
      ($player) => $player.getSocketId() === socket.id,
    );

    if (currentGame.getPlayerTurn() !== playerName) {
      return;
    }

    let cardClasses = [];
    cards.forEach((card) => {
      const rank = card.substr(0, card.length - 1);
      const suit = card.substr(card.length - 1);
      cardClasses.push(new Card(rank, suit));
    });
    cardClasses = mergeSort(cardClasses, currentGame.getGameVersion());
    // TODO: check if cards are in hand
    if (!evaluateCards(cardClasses, currentGame.getCurrentPlay(), currentGame.getGameVersion())) {
      return;
    }

    currentGame.setCurrentPlay(cardClasses);

    const hand = currentGame.getCardPile(playerName);
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

    currentGame.goToNextTurn();

    io.to(`room-${roomName}`).emit('cardsPlayed', {
      cards,
      username: playerName,
      nextPlayer: currentGame.getPlayerTurn(),
    });

    if (hand.checkIfHandEmpty()) {
      const { username } = currentGame.getPlayers()[index];
      currentGame.setLastWinner(username);
      currentGame.resetForNextRound();
      io.to(`room-${roomName}`).emit('endRound', {
        winner: username,
        scores: currentGame.getScores(),
      });

      setTimeout(() => {
        // reset round
        currentGame.startGame();

        io.to(`room-${roomName}`).emit('startGame', {
          roomName,
          nameOfFirstPlayer: currentGame.getLastWinner(),
          players: currentGame.getPlayers(),
        });
      }, 5000);
    }
  });

  socket.on('passTurn', ({ roomName }) => {
    const player = clients[socket.id];
    if (!player) return;

    const currentGame = games[roomName];
    if (!currentGame) return;

    const playerName = player.getUsername();
    if (currentGame.getPlayerTurn() !== playerName) {
      return;
    }

    currentGame.increasePassCounter();
    currentGame.goToNextTurn();

    socket.emit('validPlay', {
      cards: [],
      passed: true,
    });

    io.to(`room-${roomName}`).emit('cardsPlayed', {
      cards: [],
      passed: true,
      username: playerName,
      nextPlayer: currentGame.getPlayerTurn(),
    });
  });
}
