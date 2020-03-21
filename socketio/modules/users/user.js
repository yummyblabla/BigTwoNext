import UserStateEnum from './userStates';

/**
 * User is an interface that is used to
 * hold information of a client's session and state.
 */
export default class User {
  /**
   * Initialize a User.
   * @param {string} username a string
   * @param {string} socketId a string
   */
  constructor({ username, socketId }) {
    this.$username = username;
    this.$socketId = socketId;
    this.$state = UserStateEnum.LOBBY_STATE;
    this.$currentRoom = null;
  }
}

/**
 * Getters
 */
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

/**
 * Change state of player when they leave a room.
 */
User.prototype.leaveRoom = function leaveRoom() {
  this.$currentRoom = null;
  this.$state = UserStateEnum.LOBBY_STATE;
};

/**
 * Change state of player when they join a room.
 * @param room a Room instance
 */
User.prototype.joinRoom = function joinRoom(room) {
  this.$state = UserStateEnum.ROOM_STATE;
  this.$currentRoom = room;
};

/**
 * Change state of player when they start a game.
 * @return a boolean whether their state was changed
 */
User.prototype.startGame = function startGame() {
  if (this.$currentRoom !== null && this.$state === UserStateEnum.ROOM_STATE) {
    this.$state = UserStateEnum.GAME_STATE;
    return true;
  }
  return false;
};
