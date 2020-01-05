import Deck from './Deck';
import {
  RANKS, SUITS_CHINESE, SUITS_VIET, CHINESE_VERSION, VIET_VERSION,
} from './Helpers/Constants';

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
    this.playerTurn = 0;
    this.scores = {};
    this.lastWinner = null;
    this.passCounter = 0;

    players.forEach((player) => {
      this.scores[player.username] = [0];
    });
  }

  increasePassCounter() {
    this.passCounter += 1;
    if (this.passCounter >= this.players.length - 1) {
      this.currentPlay = null;
      this.passCounter = 0;
    }
  }

  setCurrentPlay(cards) {
    this.currentPlay = cards;
  }

  getCurrentPlay() {
    return this.currentPlay;
  }

  resetForNextRound() {
    this.updateScores();
    this.distributeCards();

    const indexOfFirst = this.players.findIndex(
      (player) => player.getUsername() === this.lastWinner,
    );
    this.playerTurn = indexOfFirst;
    this.passCounter = 0;
    this.currentPlay = null;
    this.started = false;
  }

  updateScores() {
    for (let i = 0; i < this.players.length; i += 1) {
      let number = this.cardPiles[i].getNumberOfCards();
      if (number >= 10 && number <= 12) {
        number *= 2;
      }
      if (number === 13) {
        number += 3;
      }
      const playerScore = this.scores[this.players[i].username];
      const previousScore = playerScore[playerScore.length - 1];
      playerScore.push(previousScore + number);
    }
  }

  getLastWinner() {
    return this.lastWinner;
  }

  setLastWinner(name) {
    this.lastWinner = name;
  }

  getScores() {
    return this.scores;
  }

  getCardPile(index) {
    return this.cardPiles[index];
  }

  getGameVersion() {
    return this.gameVersion;
  }

  getPlayers() {
    return this.players;
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
    return this.cardPiles[index].getCards();
  }

  startGame() {
    this.started = true;
  }

  distributeCards() {
    this.cardPiles = this.deck.distribute(this.gameVersion);
  }

  setPlayerTurn(index) {
    this.playerTurn = index;
  }

  getPlayerTurn() {
    return this.playerTurn;
  }

  goToNextTurn() {
    this.playerTurn += 1;
    if (this.playerTurn >= this.players.length) {
      this.playerTurn = 0;
    }
  }

  determineFirst() {
    let found = false;
    let rankPointer = 0;
    let suitPointer = 0;

    let SUITS;
    if (this.gameVersion === CHINESE_VERSION) {
      SUITS = SUITS_CHINESE;
    } else if (this.gameVersion === VIET_VERSION) {
      SUITS = SUITS_VIET;
    }

    while (!found) {
      for (let i = 0; i < this.players.length; i += 1) {
        const hand = this.cardPiles[i];
        if (hand.findCard(RANKS[rankPointer], SUITS[suitPointer], this.gameVersion) !== -1) {
          found = true;
          this.setPlayerTurn(i);
        }
      }
      suitPointer += 1;
      if (suitPointer > 4) {
        suitPointer = 0;
        rankPointer += 1;
      }
    }
    return found;
  }
}

export default Game;
