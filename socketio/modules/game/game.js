export default class Game {
  constructor({ roomName, users }) {
    this.$roomName = roomName;
    this.$users = users;
    this.$readyStateCounter = 0;
    this.$started = false;
    this.$currentPlayerTurn = null;
  }
}

/**
 * Getters
 */

Game.prototype.users = function getUsers() {
  return this.$users;
};

Game.prototype.roomName = function getRoomName() {
  return this.$roomName;
};

Game.prototype.readyStateCounter = function getReadyStateCounter() {
  return this.$readyStateCounter;
};

Game.prototype.started = function getStartedState() {
  return this.$started;
};

Game.prototype.currentPlayerTurn = function getCurrentPlayerTurn() {
  return this.$currentPlayerTurn;
};


/**
 * Check if the game has no users left in it.
 * @return a boolean
 */
Game.prototype.checkIfEmpty = function checkIfEmpty() {
  return this.$users.length === 0;
};

/**
 * Assigns the next user in Array as their turn.
 * @return a User instance
 */
Game.prototype.goToNextPlayerTurn = function goToNextPlayerTurn() {
  const currentPlayer = this.$currentPlayerTurn;
  const index = this.players.findIndex((player) => player.getUsername() === currentPlayer);
  let nextIndex;
  if (index >= this.players.length - 1) {
    nextIndex = 0;
  } else {
    nextIndex = index + 1;
  }
  this.$currentPlayerTurn = this.$users[nextIndex];
  return this.$currentPlayerTurn;
};

/**
 * Remove user from the game.
 * @param user a User instance
 * @return a boolean whether or not the user was removed.
 */
Game.prototype.removeUser = function removeUser(user) {
  const socketId = user.socketId();
  const index = this.$users.findIndex(($user) => $user.socketId() === socketId);
  if (index === -1) {
    return false;
  }
  this.$users.splice(index, 1);
  return true;
};

/**
 * Check if the user exists in the current game.
 * @param user a User instance
 * @return a boolean whether the user exists in the game
 */
Game.prototype.checkUserExists = function checkUserExists(user) {
  const socketId = user.socketId();
  const index = this.$users.findIndex(($user) => $user.socketId() === socketId);
  return index !== -1;
};
