import Deck from './Deck';

class Game {
  constructor(players) {
    // this.players = players;
    this.players = ['player', 'player1', 'player2', 'player3'];
    this.deck = new Deck();
    this.readyStateCounter = 0;
    this.started = false;
    this.cardPiles = [];
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
