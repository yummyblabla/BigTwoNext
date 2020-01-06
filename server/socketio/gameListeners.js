/* eslint-disable no-param-reassign */
import { CHINESE_VERSION } from '../modules/Helpers/Constants';
import Game from '../modules/Game';
import PlayerLobby from '../modules/Player';
import Card from '../modules/Card';
import mergeSort from '../modules/Helpers/Sorting';
import evaluateCards from '../modules/Evaluation';

export default function gameListeners(lobby, socket, io, rooms, clients, games) {
  socket.on('getGame', ({ roomName }) => {
    // // TEST
    // games[roomName] = new Game(
    //   roomName,
    //   [new PlayerLobby('Guest4', 'ASDF'), new PlayerLobby('Guest', socket.id), new PlayerLobby('Guest123', 'ASDF'), new PlayerLobby('Guestasd', 'ASDF')],
    //   CHINESE_VERSION,
    // );
    // //
    const room = rooms[roomName];
    const currentGame = games[roomName];
    socket.emit('setGame', {
      game: {
        roomName,
        // // TEST
        // players: [new PlayerLobby('Guest4', 'ASDF'), new PlayerLobby('Guest', 'ASDF'), new PlayerLobby('Guest123', 'ASDF'), new PlayerLobby('Guestasd', 'ASDF')],
        // //
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

      const indexOfFirstPlayer = currentGame.getPlayerTurn();
      // // TEST
      // socket.emit('startGame', { roomName, indexOfFirstPlayer });
      // //
      io.to(`room-${roomName}`).emit('startGame', { roomName, indexOfFirstPlayer });
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
    const player = clients[socket.id];
    const currentGame = games[roomName];
    const index = currentGame.getPlayers().findIndex(
      ($player) => $player.getSocketId() === socket.id,
    );

    if (currentGame.getPlayerTurn() !== index) {
      return;
    }

    let cardClasses = [];
    cards.forEach((card) => {
      const rank = card.substr(0, card.length - 1);
      const suit = card.substr(card.length - 1);
      cardClasses.push(new Card(rank, suit));
    });
    cardClasses = mergeSort(cardClasses, currentGame.getGameVersion());

    if (!evaluateCards(cardClasses, currentGame.getCurrentPlay(), currentGame.getGameVersion())) {
      return;
    }
    currentGame.setCurrentPlay(cardClasses);

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
    // // TEST
    // socket.emit('cardsPlayed', {
    //   cards,
    //   username: 'Guest123',
    // });
    // //
    io.to(`room-${roomName}`).emit('cardsPlayed', {
      cards, username: player.getUsername(),
    });

    currentGame.goToNextTurn();
    if (hand.checkIfHandEmpty()) {
      const { username } = currentGame.getPlayers()[index];
      currentGame.setLastWinner(username);
      currentGame.resetForNextRound();
      // // TEST
      // socket.emit('endRound', {
      //   winner: username,
      //   scores: currentGame.getScores(),
      // });
      // //
      io.to(`room-${roomName}`).emit('endRound', {
        winner: username,
        scores: currentGame.getScores(),
      });

      setTimeout(() => {
        // reset round
        currentGame.startGame();

        const indexOfFirstPlayer = currentGame.getPlayers().findIndex(
          ($player) => $player.getUsername() === currentGame.getLastWinner(),
        );

        // // TEST
        // socket.emit('startGame', {
        //   roomName, indexOfFirstPlayer, players: currentGame.getPlayers(),
        // });
        // //
        io.to(`room-${roomName}`).emit('startGame', {
          roomName, indexOfFirstPlayer, players: currentGame.getPlayers(),
        });
      }, 5000);
    }
  });

  socket.on('passTurn', ({ roomName }) => {
    const player = clients[socket.id];
    const currentGame = games[roomName];

    const index = currentGame.getPlayers().findIndex(
      ($player) => $player.getSocketId() === socket.id,
    );

    if (currentGame.getPlayerTurn() !== index) {
      return;
    }

    currentGame.increasePassCounter();
    currentGame.goToNextTurn();
    console.log(currentGame);

    socket.emit('validPlay', {
      cards: [],
      passed: true,
    });

    // // TEST
    // socket.emit('cardsPlayed', {
    //   cards: [],
    //   passed: true,
    //   username: 'Guest123',
    // });
    // //

    io.to(`room-${roomName}`).emit('cardsPlayed', {
      cards: [],
      passed: true,
      username: player.getUsername(),
    });
  });
}
