class Room {
  constructor(roomName, maxUsers, host) {
    this.$roomName = roomName;
    this.$maxUsers = maxUsers;
    this.$started = false;
    this.$host = host;
    this.$users = [host];
  }
}

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

Room.prototype.checkIfFull = function checkIfFull() {
  return this.$users.length >= this.$maxUsers;
};

Room.prototype.checkIfEmpty = function checkIfEmpty() {
  return this.$users.length === 0;
};

Room.prototype.startRoom = function startRoom() {
  if (this.$users.length <= 1) {
    return false;
  }
  this.$started = true;
  return true;
};

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

Room.prototype.removeUser = function removeUser(user) {
  const socketId = user.socketId();
  const index = this.$users.findIndex(($user) => $user.socketId() === socketId);
  if (index === -1) {
    return false;
  }
  this.$users.splice(index, 1);
  return true;
};

export default Room;
