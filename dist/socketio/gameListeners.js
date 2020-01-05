"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = gameListeners;

var _Constants = require("../modules/Helpers/Constants");

var _Game = _interopRequireDefault(require("../modules/Game"));

var _Player = _interopRequireDefault(require("../modules/Player"));

var _Card = _interopRequireDefault(require("../modules/Card"));

var _Sorting = _interopRequireDefault(require("../modules/Helpers/Sorting"));

var _Evaluation = _interopRequireDefault(require("../modules/Evaluation"));

/* eslint-disable no-param-reassign */
function gameListeners(lobby, socket, io, rooms, clients, games) {
  socket.on('getGame', function (_ref) {
    var roomName = _ref.roomName;
    // // TEST
    // games[roomName] = new Game(
    //   roomName,
    //   [new PlayerLobby('Guest4', 'ASDF'), new PlayerLobby('Guest', socket.id), new PlayerLobby('Guest123', 'ASDF'), new PlayerLobby('Guestasd', 'ASDF')],
    //   CHINESE_VERSION,
    // );
    // //
    var room = rooms[roomName];
    var currentGame = games[roomName];
    socket.emit('setGame', {
      game: {
        roomName: roomName,
        // // TEST
        // players: [new PlayerLobby('Guest4', 'ASDF'), new PlayerLobby('Guest', 'ASDF'), new PlayerLobby('Guest123', 'ASDF'), new PlayerLobby('Guestasd', 'ASDF')],
        // //
        players: room.getPlayers(),
        gameVersion: currentGame.getGameVersion(),
        scores: currentGame.getScores()
      }
    });
    currentGame.readyCounterIncrease();

    if (currentGame.getReadyCounter() === currentGame.getNumberOfPlayers()) {
      currentGame.distributeCards();
      currentGame.startGame();
      currentGame.determineFirst();
      var indexOfFirstPlayer = currentGame.getPlayerTurn(); // // TEST
      // socket.emit('startGame', { roomName, indexOfFirstPlayer });
      // //

      io.to("room-".concat(roomName)).emit('startGame', {
        roomName: roomName,
        indexOfFirstPlayer: indexOfFirstPlayer
      });
    }
  });
  socket.on('getCards', function (_ref2) {
    var roomName = _ref2.roomName;
    var currentGame = games[roomName];
    var index = currentGame.getPlayers().findIndex(function (player) {
      return player.getSocketId() === socket.id;
    });
    socket.emit('receiveCards', {
      cards: currentGame.getCards(index)
    });
  });
  socket.on('sendCards', function (_ref3) {
    var roomName = _ref3.roomName,
        cards = _ref3.cards;
    var player = clients[socket.id];
    var currentGame = games[roomName];
    var index = currentGame.getPlayers().findIndex(function ($player) {
      return $player.getSocketId() === socket.id;
    });

    if (currentGame.getPlayerTurn() !== index) {
      return;
    }

    var cardClasses = [];
    cards.forEach(function (card) {
      var rank = card.substr(0, card.length - 1);
      var suit = card.substr(card.length - 1);
      cardClasses.push(new _Card["default"](rank, suit));
    });
    cardClasses = (0, _Sorting["default"])(cardClasses, currentGame.getGameVersion());

    if (currentGame.getCurrentPlay() === null) {
      currentGame.setCurrentPlay(cardClasses);
    } else {
      if (!(0, _Evaluation["default"])(cardClasses, currentGame.getCurrentPlay(), currentGame.getGameVersion())) {
        return;
      }

      currentGame.setCurrentPlay(cardClasses);
    }

    var hand = currentGame.getCardPile(index);
    cards.forEach(function (card) {
      var rank = card.substr(0, card.length - 1);
      var suit = card.substr(card.length - 1);
      var cardIndex = hand.findCard(rank, suit, currentGame.getGameVersion());
      hand.discardCard(cardIndex);
    });
    socket.emit('validPlay', {
      cards: cards,
      passed: false
    }); // // TEST
    // socket.emit('cardsPlayed', {
    //   cards,
    //   username: 'Guest123',
    // });
    // //

    io.to("room-".concat(roomName)).emit('cardsPlayed', {
      cards: cards,
      username: player.getUsername()
    });
    currentGame.goToNextTurn();

    if (hand.checkIfHandEmpty()) {
      var username = currentGame.getPlayers()[index].username;
      currentGame.setLastWinner(username);
      currentGame.resetForNextRound(); // // TEST
      // socket.emit('endRound', {
      //   winner: username,
      //   scores: currentGame.getScores(),
      // });
      // //

      io.to("room-".concat(roomName)).emit('endRound', {
        winner: username,
        scores: currentGame.getScores()
      });
      setTimeout(function () {
        // reset round
        currentGame.startGame();
        var indexOfFirstPlayer = currentGame.getPlayers().findIndex(function ($player) {
          return $player.getUsername() === currentGame.getLastWinner();
        }); // // TEST
        // socket.emit('startGame', {
        //   roomName, indexOfFirstPlayer, players: currentGame.getPlayers(),
        // });
        // //

        io.to("room-".concat(roomName)).emit('startGame', {
          roomName: roomName,
          indexOfFirstPlayer: indexOfFirstPlayer,
          players: currentGame.getPlayers()
        });
      }, 5000);
    }
  });
  socket.on('passTurn', function (_ref4) {
    var roomName = _ref4.roomName;
    var player = clients[socket.id];
    var currentGame = games[roomName];
    var index = currentGame.getPlayers().findIndex(function ($player) {
      return $player.getSocketId() === socket.id;
    });

    if (currentGame.getPlayerTurn() !== index) {
      return;
    }

    currentGame.increasePassCounter();
    currentGame.goToNextTurn();
    console.log(currentGame);
    socket.emit('validPlay', {
      cards: [],
      passed: true
    }); // // TEST
    // socket.emit('cardsPlayed', {
    //   cards: [],
    //   passed: true,
    //   username: 'Guest123',
    // });
    // //

    io.to("room-".concat(roomName)).emit('cardsPlayed', {
      cards: [],
      passed: true,
      username: player.getUsername()
    });
  });
}