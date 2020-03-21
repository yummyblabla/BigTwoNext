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
   * @param {BigTwoVersionEnum} gameVersion a BigTwoVersionEnum
   */
  constructor({
    roomName, maxUsers, host, gameVersion,
  }) {
    super({ roomName, maxUsers, host });
    this.$gameVersion = gameVersion;
  }
}

BigTwoRoom.prototype = Object.create(Room.prototype);

/**
 * Getters
 */
BigTwoRoom.prototype.gameVersion = function getGameVersion() {
  return this.$gameVersion;
};

BigTwoRoom.prototype.extractInfoForGame = function extractInfoForGame() {
  return {
    roomName: this.$roomName,
    users: this.$users,
    gameVersion: this.$gameVersion,
  };
};

/**
 * Factory that is responsible for creating BigTwo rooms.
 */
class BigTwoRoomFactory {
  static createRoom({
    roomName, maxUsers, host, gameVersion,
  }) {
    const bigTwoRoom = new BigTwoRoom({
      roomName, maxUsers, host, gameVersion,
    });
    return bigTwoRoom;
  }
}

export default BigTwoRoomFactory;
