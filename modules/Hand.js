import mergeSort from './Helpers/Sorting';
import binarySearch from './Helpers/Search';
import { CHINESE_VERSION } from './Helpers/Constants';

class Hand {
  /**
   * Constructor for Hand class.
   * @param {Array[Card]} cards array of Cards
   */
  constructor(cards) {
    this.cards = cards;
    this.sorted = false;
  }

  getCards() {
    return this.cards;
  }

  setCards(cards) {
    this.cards = cards;
    this.sorted = false;
  }

  getIsSorted() {
    return this.sorted;
  }

  getNumberOfCards() {
    return this.cards.length;
  }

  discardCard(index) {
    if (index > -1 && index < this.getNumberOfCards()) {
      this.cards.splice(index, 1);
      return true;
    }
    return false;
  }

  findCard(rank, suit, version = CHINESE_VERSION) {
    if (this.sorted) {
      return binarySearch(this.cards, `${rank}${suit}`, version);
    }
    let cardFound = -1;
    this.cards.forEach((card, index) => {
      const cardProperties = card.getProperties();
      if (cardProperties.rank === rank && cardProperties.suit === suit) {
        cardFound = index;
      }
    });
    return cardFound;
  }

  sortCards(version) {
    this.setCards(mergeSort(this.cards, version));
    this.sorted = true;
  }
}

export default Hand;
