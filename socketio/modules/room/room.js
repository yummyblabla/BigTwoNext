/**
 * A Room is an interface that is used to collect
 * a certain number of users in a container to start a game.
 */
export default class Room {
  /**
   * Initializes the Room.
   * @param {string} roomName a string
   * @param {int} maxUsers an int
   * @param {User} host a User instance
   */
  constructor({ roomName, maxUsers, host }) {
    this.$roomName = roomName;
    this.$maxUsers = maxUsers;
    this.$started = false;
    this.$host = host;
    this.$users = [host];
  }
}

/**
 * Getters
 */
Room.prototype.roomName = function getRoomName() {
  return this.$roomName;
};

Room.prototype.maxUsers = function getMaxUsers() {
  return this.$maxUsers;
};

Room.prototype.started = function getStarted() {
  return this.$started;
};

Room.prototype.users = function getUsers() {
  return this.$users;
};

/**
 * Check if the room is full.
 * @return a boolean
 */
Room.prototype.checkIfFull = function checkIfFull() {
  return this.$users.length >= this.$maxUsers;
};

/**
 * Check if the room is empty.
 * @return a boolean
 */
Room.prototype.checkIfEmpty = function checkIfEmpty() {
  return this.$users.length === 0;
};

/**
 * Change the state of the room to started.
 * @return a boolean whether the game has been started
 */
Room.prototype.startRoom = function startRoom() {
  if (this.$users.length <= 1) {
    return false;
  }
  this.$started = true;
  return true;
};

/**
 * Add user to the room.
 * @param user a User instance
 * @return a boolean whether the user was added to the room
 */
Room.prototype.addUser = function addUser(user) {
  if (this.$users.length >= this.$maxUsers) {
    return false;
  }
  const socketId = user.socketId();
  const index = this.$users.findIndex(($user) => $user.socketId() === socketId);
  if (index !== -1) {
    return false;
  }
  this.$users.push(user);
  return true;
};

/**
 * Remove user from the room.
 * @param user a User instance
 * @return a boolean whether the user was removed from the room
 */
Room.prototype.removeUser = function removeUser(user) {
  const socketId = user.socketId();
  const index = this.$users.findIndex(($user) => $user.socketId() === socketId);
  if (index === -1) {
    return false;
  }
  this.$users.splice(index, 1);
  return true;
};
