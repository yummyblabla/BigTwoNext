"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _Constants = require("./Helpers/Constants");

var Player =
/*#__PURE__*/
function () {
  function Player(username, socketId) {
    (0, _classCallCheck2["default"])(this, Player);
    this.username = username;
    this.socketId = socketId;
    this.state = _Constants.USER_LOBBY_STATE;
    this.currentRoom = null;
  }

  (0, _createClass2["default"])(Player, [{
    key: "getSocketId",
    value: function getSocketId() {
      return this.socketId;
    }
  }, {
    key: "getUsername",
    value: function getUsername() {
      return this.username;
    }
  }, {
    key: "getState",
    value: function getState() {
      return this.state;
    }
  }, {
    key: "getRoom",
    value: function getRoom() {
      return this.currentRoom;
    }
  }, {
    key: "leaveRoom",
    value: function leaveRoom() {
      this.state = _Constants.USER_LOBBY_STATE;
      this.currentRoom = null;
    }
  }, {
    key: "startedGame",
    value: function startedGame() {
      if (this.state === _Constants.USER_IN_ROOM_STATE) {
        this.state = _Constants.USER_IN_GAME_STATE;
      }
    }
  }, {
    key: "checkIfInRoom",
    value: function checkIfInRoom() {
      return (this.state === _Constants.USER_IN_ROOM_STATE || this.state === _Constants.USER_IN_GAME_STATE) && this.currentRoom !== null;
    }
  }, {
    key: "joinRoom",
    value: function joinRoom(roomName) {
      this.state = _Constants.USER_IN_ROOM_STATE;
      this.currentRoom = roomName;
    }
  }]);
  return Player;
}();

var _default = Player;
exports["default"] = _default;