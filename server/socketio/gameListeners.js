/* eslint-disable no-param-reassign */
import Card from '../modules/Card';
import mergeSort from '../modules/Helpers/Sorting';
import evaluateCards from '../modules/Evaluation';

export default function gameListeners(lobby, socket, io, rooms, clients, games) {
  // Client receives game data when loaded /game
  socket.on('getGame', ({ roomName }) => {
    if (!games.hasOwnProperty(roomName)) {
      return;
    }
    const currentGame = games[roomName];
    socket.emit('setGame', {
      game: {
        roomName,
        players: currentGame.getPlayers(),
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

  // Client receives cards when game starts
  socket.on('getCards', ({ roomName }) => {
    if (!clients.hasOwnProperty(socket.id)) {
      return;
    }
    if (!games.hasOwnProperty(roomName)) {
      return;
    }

    const player = clients[socket.id];
    const username = player.getUsername();
    const currentGame = games[roomName];

    if (!currentGame.isValidPlayer(username)) {
      return;
    }

    socket.emit('receiveCards', {
      cards: currentGame.getCards(username),
    });
  });

  // Client sends cards to play
  socket.on('sendCards', ({ roomName, cards }) => {
    if (!clients.hasOwnProperty(socket.id)) {
      return;
    }
    if (!games.hasOwnProperty(roomName)) {
      return;
    }

    const player = clients[socket.id];
    const playerName = player.getUsername();
    const currentGame = games[roomName];

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

    // If last played is the current player, everybody else passed
    if (currentGame.getLastPlayed() === playerName) {
      currentGame.setCurrentPlay(null);
    }

    // Check if cards are valid play.
    if (!evaluateCards(cardClasses, currentGame.getCurrentPlay(), currentGame.getGameVersion())) {
      return;
    }

    // Discard cards from hand.
    const hand = currentGame.getCardPile(playerName);
    cards.forEach((card) => {
      const rank = card.substr(0, card.length - 1);
      const suit = card.substr(card.length - 1);
      const cardIndex = hand.findCard(rank, suit, currentGame.getGameVersion());
      hand.discardCard(cardIndex);
    });

    // Let client who played cards know that cards were valid
    socket.emit('validPlay', {
      cards,
      passed: false,
    });

    currentGame.setCurrentPlay(cardClasses);
    currentGame.setLastPlayed(playerName);
    currentGame.goToNextTurn();

    io.to(`room-${roomName}`).emit('cardsPlayed', {
      cards,
      username: playerName,
      nextPlayer: currentGame.getPlayerTurn(),
    });

    if (hand.checkIfHandEmpty()) {
      currentGame.setLastWinner(playerName);
      currentGame.resetForNextRound();
      io.to(`room-${roomName}`).emit('endRound', {
        winner: playerName,
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
    if (!clients.hasOwnProperty(socket.id)) {
      return;
    }
    if (!games.hasOwnProperty(roomName)) {
      return;
    }

    const player = clients[socket.id];
    const playerName = player.getUsername();
    const currentGame = games[roomName];

    if (currentGame.getPlayerTurn() !== playerName) {
      return;
    }

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

  socket.on('leaveGame', ({ roomName }) => {
    if (!clients.hasOwnProperty(socket.id)) {
      return;
    }
    if (!rooms.hasOwnProperty(roomName)) {
      return;
    }


    const player = clients[socket.id];
    const playerName = player.getUsername();
    const room = rooms[roomName];
    socket.leave(`room-${roomName}`);
    // Remove player from room
    room.removePlayer(player);
    if (room.checkIfEmpty()) {
      delete rooms[roomName];
      lobby.emit('getRoomList', {
        rooms,
      });
    }
    lobby.emit('getRoomList', {
      rooms,
    });

    if (!games.hasOwnProperty(roomName)) {
      return;
    }
    const currentGame = games[roomName];
    // Remove player from game
    currentGame.removePlayer(player);
    if (currentGame.checkIfEmpty()) {
      delete games[roomName];
    } else {
      // TODO: handle last player logic
      io.to(`room-${roomName}`).emit('playerLeft', {
        username: playerName,
      });
      // Adjust turn
      if (currentGame.getPlayerTurn() === playerName) {
        currentGame.goToNextTurn();
        io.to(`room-${roomName}`).emit('cardsPlayed', {
          cards: [],
          passed: true,
          username: playerName,
          nextPlayer: currentGame.getPlayerTurn(),
        });
      }
    }
  });
}
