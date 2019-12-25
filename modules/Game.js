import Deck from './Deck';

class Game {
  constructor(roomName, players, gameVersion) {
    this.players = players;
    this.roomName = roomName;
    this.gameVersion = gameVersion;
    this.deck = new Deck();
    this.readyStateCounter = 0;
    this.started = false;
    this.cardPiles = [];
    this.currentPlay = null;
  }

  readyCounterIncrease() {
    this.readyStateCounter += 1;
  }

  getNumberOfPlayers() {
    return this.players.length;
  }

  getReadyCounter() {
    return this.readyStateCounter;
  }

  getCards(index) {
    return this.cardPiles[index];
  }

  startGame() {
    this.started = true;
    this.cardPiles = this.deck.distribute();
  }
}

export default Game;
