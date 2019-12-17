import {
  RANKS, SUITS_CHINESE,
} from './Helpers/Constants';

class Card {
  /**
   * Constructor for Card class.
   * @param {string} rank rank of card '3 4 5 6 7 8 9 10 J Q K A 2'
   * @param {*string} suit suit of card 'D C H S'
   */
  constructor(rank, suit) {
    if (typeof rank === 'string' && RANKS.indexOf(rank) !== -1 && typeof suit === 'string' && SUITS_CHINESE.indexOf(suit) !== -1) {
      this.rank = rank;
      this.suit = suit;
    } else {
      throw RangeError('Invalid card generated.');
    }
  }

  getRank() {
    return this.rank;
  }

  getSuit() {
    return this.suit;
  }

  getProperties() {
    return {
      rank: this.getRank(),
      suit: this.getSuit(),
    };
  }

  convertToString() {
    return this.getRank() + this.getSuit();
  }
}

export default Card;
