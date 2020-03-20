/* eslint-disable max-classes-per-file */
import Room from './room';

/**
 * A BigTwoRoom is a child of Room that is
 * specifically used to start BigTwo games.
 */
class BigTwoRoom extends Room {
  /**
   * Initialize the BigTwoRoom.
   * @param {string} roomName a string
   * @param {int} maxUsers an int
   * @param {User} host a User instance
   * @param {BigTwoVersion} version BigTwoVersion enumeration
   */
  constructor(roomName, maxUsers, host, version) {
    super(roomName, maxUsers, host);
    this.$gameVersion = version;
  }
}

BigTwoRoom.prototype = Object.create(Room.prototype);

/**
 * Getters
 */
BigTwoRoom.prototype.gameVersion = function getGameVersion() {
  return this.$gameVersion;
};

/**
 * Factory that is responsible for creating BigTwo rooms.
 */
class BigTwoFactory {
  static createRoom(roomName, maxUsers, host, version) {
    const bigTwoRoom = new BigTwoRoom(roomName, maxUsers, host, version);
    return bigTwoRoom;
  }
}

export default BigTwoFactory;
