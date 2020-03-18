/* eslint-disable max-classes-per-file */
import User from './user';

class Player extends User {
  constructor(username, socketId) {
    super(username, socketId);
    this.playerVariable = 'placeholder';
  }
}

Player.prototype = Object.create(User.prototype);

class PlayerFactory {
  static createUser(username, socketId) {
    const player = new Player(username, socketId);
    return player;
  }
}

export default PlayerFactory;
