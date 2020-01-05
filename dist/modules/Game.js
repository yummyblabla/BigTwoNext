"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _Deck = _interopRequireDefault(require("./Deck"));

var _Constants = require("./Helpers/Constants");

var Game =
/*#__PURE__*/
function () {
  function Game(roomName, players, gameVersion) {
    var _this = this;

    (0, _classCallCheck2["default"])(this, Game);
    this.players = players;
    this.roomName = roomName;
    this.gameVersion = gameVersion;
    this.deck = new _Deck["default"]();
    this.readyStateCounter = 0;
    this.started = false;
    this.cardPiles = [];
    this.currentPlay = null;
    this.playerTurn = 0;
    this.scores = {};
    this.lastWinner = null;
    this.passCounter = 0;
    players.forEach(function (player) {
      _this.scores[player.username] = [0];
    });
  }

  (0, _createClass2["default"])(Game, [{
    key: "increasePassCounter",
    value: function increasePassCounter() {
      this.passCounter += 1;

      if (this.passCounter >= this.players.length - 1) {
        this.currentPlay = null;
        this.passCounter = 0;
      }
    }
  }, {
    key: "setCurrentPlay",
    value: function setCurrentPlay(cards) {
      this.currentPlay = cards;
    }
  }, {
    key: "getCurrentPlay",
    value: function getCurrentPlay() {
      return this.currentPlay;
    }
  }, {
    key: "resetForNextRound",
    value: function resetForNextRound() {
      var _this2 = this;

      this.updateScores();
      this.distributeCards();
      var indexOfFirst = this.players.findIndex(function (player) {
        return player.getUsername() === _this2.lastWinner;
      });
      this.playerTurn = indexOfFirst;
      this.passCounter = 0;
      this.currentPlay = null;
      this.started = false;
    }
  }, {
    key: "updateScores",
    value: function updateScores() {
      for (var i = 0; i < this.players.length; i += 1) {
        var number = this.cardPiles[i].getNumberOfCards();

        if (number >= 10 && number <= 12) {
          number *= 2;
        }

        if (number === 13) {
          number += 3;
        }

        var playerScore = this.scores[this.players[i].username];
        var previousScore = playerScore[playerScore.length - 1];
        playerScore.push(previousScore + number);
      }
    }
  }, {
    key: "getLastWinner",
    value: function getLastWinner() {
      return this.lastWinner;
    }
  }, {
    key: "setLastWinner",
    value: function setLastWinner(name) {
      this.lastWinner = name;
    }
  }, {
    key: "getScores",
    value: function getScores() {
      return this.scores;
    }
  }, {
    key: "getCardPile",
    value: function getCardPile(index) {
      return this.cardPiles[index];
    }
  }, {
    key: "getGameVersion",
    value: function getGameVersion() {
      return this.gameVersion;
    }
  }, {
    key: "getPlayers",
    value: function getPlayers() {
      return this.players;
    }
  }, {
    key: "readyCounterIncrease",
    value: function readyCounterIncrease() {
      this.readyStateCounter += 1;
    }
  }, {
    key: "getNumberOfPlayers",
    value: function getNumberOfPlayers() {
      return this.players.length;
    }
  }, {
    key: "getReadyCounter",
    value: function getReadyCounter() {
      return this.readyStateCounter;
    }
  }, {
    key: "getCards",
    value: function getCards(index) {
      return this.cardPiles[index].getCards();
    }
  }, {
    key: "startGame",
    value: function startGame() {
      this.started = true;
    }
  }, {
    key: "distributeCards",
    value: function distributeCards() {
      this.cardPiles = this.deck.distribute(this.gameVersion);
    }
  }, {
    key: "setPlayerTurn",
    value: function setPlayerTurn(index) {
      this.playerTurn = index;
    }
  }, {
    key: "getPlayerTurn",
    value: function getPlayerTurn() {
      return this.playerTurn;
    }
  }, {
    key: "goToNextTurn",
    value: function goToNextTurn() {
      this.playerTurn += 1;

      if (this.playerTurn >= this.players.length) {
        this.playerTurn = 0;
      }
    }
  }, {
    key: "determineFirst",
    value: function determineFirst() {
      var found = false;
      var rankPointer = 0;
      var suitPointer = 0;
      var SUITS;

      if (this.gameVersion === _Constants.CHINESE_VERSION) {
        SUITS = _Constants.SUITS_CHINESE;
      } else if (this.gameVersion === _Constants.VIET_VERSION) {
        SUITS = _Constants.SUITS_VIET;
      }

      while (!found) {
        for (var i = 0; i < this.players.length; i += 1) {
          var hand = this.cardPiles[i];

          if (hand.findCard(_Constants.RANKS[rankPointer], SUITS[suitPointer], this.gameVersion) !== -1) {
            found = true;
            this.setPlayerTurn(i);
          }
        }

        suitPointer += 1;

        if (suitPointer > 4) {
          suitPointer = 0;
          rankPointer += 1;
        }
      }

      return found;
    }
  }]);
  return Game;
}();

var _default = Game;
exports["default"] = _default;