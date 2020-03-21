import Game from './game';
import DeckFactory from '../cards/deck';

class BigTwoGame extends Game {
  constructor({ roomName, users, gameVersion }) {
    super({ roomName, users });
    const deck = DeckFactory.createDeck();

    this.$gameVersion = gameVersion;
    this.$deck = deck;
  }
}

BigTwoGame.prototype = Object.create(Game.prototype);

/**
 * Getters
 */
BigTwoGame.prototype.gameVersion = function getGameVersion() {
  return this.$gameVersion;
};

/**
 * Factory responsible for creating BigTwo games.
 */
class BigTwoGameFactory {
  static createGame({ roomName, users, gameVersion }) {
    const bigTwoGame = new BigTwoGame({ roomName, users, gameVersion });
    return bigTwoGame;
  }
}

export default BigTwoGameFactory;
