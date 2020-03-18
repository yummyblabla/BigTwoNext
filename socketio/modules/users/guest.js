/* eslint-disable max-classes-per-file */
import User from './user';

class Guest extends User {
  constructor(username, socketId) {
    super(username, socketId);
    this.guestVariable = 'placeholder';
  }
}

Guest.prototype = Object.create(User.prototype);

class GuestFactory {
  static createUser(socketId) {
    const randomInteger = Math.floor(Math.random() * 9999);
    const username = `Guest_${randomInteger}`;
    const player = new Guest(username, socketId);
    return player;
  }
}

export default GuestFactory;
