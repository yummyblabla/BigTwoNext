/**
 * Card holds information regarding its rank and suit
 */
class Card {
  /**
   * Initialize the card.
   * @param {string} rank rank of the card
   * @param {string} suit suit of the card
   */
  constructor({ rank, suit }) {
    this.$rank = rank;
    this.$suit = suit;
  }
}

/**
 * Getters
 */
Card.prototype.rank = function getRank() {
  return this.$rank;
};

Card.prototype.suit = function getSuit() {
  return this.$suit;
};

/**
 * Factory is responsible for creating Card instances.
 */
export default class CardFactory {
  static createCard({ rank, suit }) {
    const card = new Card({ rank, suit });
    return card;
  }
}
