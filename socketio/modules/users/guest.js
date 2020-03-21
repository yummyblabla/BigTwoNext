import User from './user';

/**
 * Guest uses the User Interface and
 * does not contain additional information.
 */
class Guest extends User {
  /**
   * Initialize a Guest
   * @param {string} username a string
   * @param {string} socketId a string
   */
  constructor({ username, socketId }) {
    super({ username, socketId });
    this.guestVariable = 'placeholder';
  }
}

Guest.prototype = Object.create(User.prototype);


/**
 * Factory responsible for creating Guest instances.
 */
export default class GuestFactory {
  static createUser(socketId) {
    const randomInteger = Math.floor(Math.random() * 9999);
    const username = `Guest_${randomInteger}`;
    const player = new Guest({ username, socketId });
    return player;
  }
}
