import User from './user';

/**
 * Player uses the User interface and can hold
 * additional information to the database.
 */
class Player extends User {
  /**
   * Initialize a Player.
   * @param {string} username a string
   * @param {string} socketId a string
   */
  constructor({ username, socketId }) {
    super({ username, socketId });
    this.playerVariable = 'placeholder';
  }
}

Player.prototype = Object.create(User.prototype);

/**
 * Factory responsible for creating Player instances.
 */
export default class PlayerFactory {
  static createUser(username, socketId) {
    const player = new Player(username, socketId);
    return player;
  }
}
