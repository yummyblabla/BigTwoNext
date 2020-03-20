/* eslint-disable max-classes-per-file */
import Room from './room';

class BigTwoRoom extends Room {
  constructor(roomName, maxUsers, host, version) {
    super(roomName, maxUsers, host);
    this.$gameVersion = version;
  }
}

BigTwoRoom.prototype = Object.create(Room.prototype);

BigTwoRoom.prototype.gameVersion = function getGameVersion() {
  return this.$gameVersion;
};

class BigTwoFactory {
  static createRoom(roomName, maxUsers, host, version) {
    const bigTwoRoom = new BigTwoRoom(roomName, maxUsers, host, version);
    return bigTwoRoom;
  }
}

export default BigTwoFactory;
