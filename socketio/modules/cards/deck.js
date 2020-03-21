import CARD_CONSTANTS from './cardConstants';
import CardFactory from './card';

/**
 * Deck contains all 52 cards in standard deck.
 */
class Deck {
  /**
   * Initialize the deck.
   * @param {Array[Card]} cards array of Card instances
   */
  constructor({ cards }) {
    this.$cards = cards;
  }
}

/**
 * Getters
 */
Deck.prototype.cards = function getCards() {
  return this.$cards;
};

/**
 * Shuffle the cards in the deck in random order.
 * @return Array[Card]
 */
Deck.prototype.shuffle = function shuffle() {
  for (let i = 0; i < this.cards.length; i += 1) {
    // eslint-disable-next-line no-bitwise
    const rnd = Math.random() * (i + 1) | 0;
    [this.$cards[i], this.$cards[rnd]] = [this.$cards[rnd], this.$cards[i]];
  }
  return this.$cards;
};

Deck.prototype.distribute = function distribute() {
  // TODO
};

/**
 * Factory is responsible for creating a deck.
 */
export default class DeckFactory {
  static createDeck() {
    const cards = [];
    CARD_CONSTANTS.RANKS.forEach((rank) => {
      CARD_CONSTANTS.SUITS_CHINESE.forEach((suit) => {
        const card = CardFactory.createCard({ rank, suit });
        cards.push(card);
      });
    });
    const deck = new Deck({ cards });
    return deck;
  }
}
