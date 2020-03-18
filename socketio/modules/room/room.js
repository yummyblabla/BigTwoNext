class Room {
  constructor(roomName, maxUsers) {
    this.$roomName = roomName;
    this.$maxUsers = maxUsers;
  }
}

Room.prototype.roomName = function getRoomName() {
  return this.$roomName;
};


export default Room;
