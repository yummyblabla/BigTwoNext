"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var GameClient =
/*#__PURE__*/
function () {
  function GameClient(roomName, players, gameVersion) {
    (0, _classCallCheck2["default"])(this, GameClient);
    this.roomName = roomName;
    this.players = players;
    this.started = false;
    this.gameVersion = gameVersion;
    this.playerTurn = -1;
    this.opponents = [];
  }

  (0, _createClass2["default"])(GameClient, [{
    key: "findOpponent",
    value: function findOpponent(username) {
      return this.opponents.find(function (opponent) {
        return opponent.getUsername() === username;
      });
    }
  }, {
    key: "addOpponents",
    value: function addOpponents(opponents) {
      this.opponents = opponents;
    }
  }, {
    key: "getGameVersion",
    value: function getGameVersion() {
      return this.gameVersion;
    }
  }, {
    key: "startGame",
    value: function startGame() {
      this.started = true;
    }
  }, {
    key: "getNumberOfPlayers",
    value: function getNumberOfPlayers() {
      return this.players.length;
    }
  }, {
    key: "getPlayers",
    value: function getPlayers() {
      return this.players;
    }
  }, {
    key: "setPlayerTurn",
    value: function setPlayerTurn(index) {
      this.playerTurn = index;
    }
  }, {
    key: "goToNextTurn",
    value: function goToNextTurn() {
      if (this.playerTurn === this.players.length - 1) {
        this.playerTurn = 0;
      } else {
        this.playerTurn += 1;
      }

      return this.playerTurn;
    }
  }, {
    key: "getPlayerTurn",
    value: function getPlayerTurn() {
      return this.playerTurn;
    }
  }]);
  return GameClient;
}();

var _default = GameClient;
exports["default"] = _default;