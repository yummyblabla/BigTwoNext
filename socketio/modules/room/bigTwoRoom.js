/* eslint-disable max-classes-per-file */
import Room from './room';

class BigTwoRoom extends Room {
  constructor(roomName, maxUsers) {
    super(roomName, maxUsers);
    this.gameVersion = 'chinese';
  }
}

class BigTwoFactory {
  static createRoom(roomName, maxUsers) {
    const bigTwoRoom = new BigTwoRoom(roomName, maxUsers);
    return bigTwoRoom;
  }
}

export default BigTwoFactory;
