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
    this.playerTurn = null;
    this.scores = {};
    this.lastPlayed = null;
    this.lastWinner = null;

    players.forEach((player) => {
      this.scores[player.username] = [0];
    });
  }

  checkIfEmpty() {
    return this.players.length === 0;
  }

  removePlayer(playerObject) {
    const { socketId } = playerObject;
    const index = this.players.findIndex((player) => player.socketId === socketId);
    if (index !== -1) {
      this.players.splice(index, 1);
    }
  }

  isValidPlayer(username) {
    const index = this.players.findIndex((player) => player.getUsername() === username);
    if (index !== -1) {
      return true;
    }
    return false;
  }

  setLastPlayed(username) {
    this.lastPlayed = username;
  }

  getLastPlayed() {
    return this.lastPlayed;
  }

  distributeCards() {
    const cards = this.deck.distribute(this.gameVersion);
    const cardPileContainer = {};
    this.players.forEach((player, index) => {
      cardPileContainer[player.getUsername()] = cards[index];
    });
    this.cardPiles = cardPileContainer;
  }

  setCurrentPlay(cards) {
    this.currentPlay = cards;
  }

  getCurrentPlay() {
    return this.currentPlay;
  }

  goToNextTurn() {
    const currentTurn = this.playerTurn;
    const index = this.players.findIndex((player) => player.getUsername() === currentTurn);
    let nextIndex;
    if (index >= this.players.length - 1) {
      nextIndex = 0;
    } else {
      nextIndex = index + 1;
    }
    const nextPlayerName = this.players[nextIndex].getUsername();
    this.playerTurn = nextPlayerName;
  }

  resetForNextRound() {
    this.updateScores();
    this.distributeCards();
    this.playerTurn = this.lastWinner;
    this.lastPlayed = null;
    this.currentPlay = null;
    this.started = false;
  }

  updateScores() {
    const playerHandKeys = Object.keys(this.cardPiles);
    playerHandKeys.forEach((player) => {
      let number = this.cardPiles[player].getNumberOfCards();
      if (number >= 10 && number <= 12) {
        number *= 2;
      }
      if (number === 13) {
        number *= 3;
      }
      const playerScore = this.scores[player];
      const previousScore = playerScore[playerScore.length - 1];
      playerScore.push(previousScore + number);
    });
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

  getCards(username) {
    return this.cardPiles[username].getCards();
  }

  startGame() {
    this.started = true;
  }

  setPlayerTurn(username) {
    this.playerTurn = username;
  }

  getPlayerTurn() {
    return this.playerTurn;
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
      const playerHandKeys = Object.keys(this.cardPiles);
      for (let i = 0; i < playerHandKeys.length; i += 1) {
        const hand = this.cardPiles[playerHandKeys[i]];
        if (hand.findCard(RANKS[rankPointer], SUITS[suitPointer], this.gameVersion) !== -1) {
          found = true;
          this.setPlayerTurn(playerHandKeys[i]);
          break;
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
