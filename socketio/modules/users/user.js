/* eslint-disable func-names */
import USER_STATES from './userStates';

export default class User {
  constructor(username, socketId) {
    this.$username = username;
    this.$socketId = socketId;
    this.$state = USER_STATES.LOBBY_STATE;
    this.$currentRoom = null;
  }
}

User.prototype.username = function getUsername() {
  return this.$username;
};

User.prototype.socketId = function getSocketId() {
  return this.$socketId;
};

User.prototype.state = function getState() {
  return this.$state;
};

User.prototype.currentRoom = function getCurrentRoom() {
  return this.$currentRoom;
};

User.prototype.leaveRoom = function leaveRoom() {
  this.$currentRoom = null;
  this.$state = USER_STATES.LOBBY_STATE;
};

User.prototype.joinRoom = function joinRoom(room) {
  this.$state = USER_STATES.ROOM_STATE;
  this.$currentRoom = room;
};

User.prototype.startGame = function startGame() {
  if (this.$currentRoom !== null && this.$state === USER_STATES.ROOM_STATE) {
    this.$state = USER_STATES.GAME_STATE;
    return true;
  }
  return false;
};
