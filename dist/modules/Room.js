"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var Room =
/*#__PURE__*/
function () {
  function Room(roomName, maxPlayers, gameVersion, playerHostObject) {
    (0, _classCallCheck2["default"])(this, Room);
    this.roomName = roomName;
    this.maxPlayers = maxPlayers;
    this.gameVersion = gameVersion;
    this.hostName = playerHostObject.username;
    this.players = [playerHostObject];
    this.started = false;
  }

  (0, _createClass2["default"])(Room, [{
    key: "checkIfFull",
    value: function checkIfFull() {
      return this.players.length >= this.maxPlayers;
    }
  }, {
    key: "checkIfStarted",
    value: function checkIfStarted() {
      return this.started;
    }
  }, {
    key: "checkIfEmpty",
    value: function checkIfEmpty() {
      return this.players.length === 0;
    }
  }, {
    key: "checkCanStart",
    value: function checkCanStart() {
      return this.players.length >= 2;
    }
  }, {
    key: "addPlayer",
    value: function addPlayer(playerObject) {
      if (this.checkIfFull()) {
        return;
      }

      this.players.push(playerObject);
    }
  }, {
    key: "removePlayer",
    value: function removePlayer(playerObject) {
      var socketId = playerObject.socketId;
      var index = this.players.findIndex(function (player) {
        return player.socketId === socketId;
      });
      this.players.splice(index, 1);
    }
  }, {
    key: "getPlayers",
    value: function getPlayers() {
      return this.players;
    }
  }, {
    key: "getVersion",
    value: function getVersion() {
      return this.gameVersion;
    }
  }, {
    key: "startGame",
    value: function startGame() {
      this.started = true;
    }
  }]);
  return Room;
}();

var _default = Room;
exports["default"] = _default;