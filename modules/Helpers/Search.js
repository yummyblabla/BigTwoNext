import {
  RANKS, CHINESE_VERSION, VIET_VERSION, SUITS_CHINESE, SUITS_VIET,
} from './Constants';

/**
 * Finds card in sorted array and returns index.
 * @param {Array[Card]} arrayOfCards array of Card class
 * @param {string} card card in string format (e.g. '3C')
 * @param {string} version version of BigTwo game
 */
const binarySearch = (arrayOfCards, card, version) => {
  let start = 0;
  let end = arrayOfCards.length - 1;
  let middle = Math.floor((start + end) / 2);

  while (arrayOfCards[middle].convertToString() !== card && start <= end) {
    const cardFromArrayRank = RANKS.indexOf(arrayOfCards[middle].getRank());
    const cardToFindRank = RANKS.indexOf(card.substr(0, card.length - 1));

    if (cardToFindRank < cardFromArrayRank) {
      end = middle - 1;
    } else if (cardToFindRank > cardFromArrayRank) {
      start = middle + 1;
    } else {
      let cardFromArraySuit;
      let cardToFindSuit;

      if (version === VIET_VERSION) {
        cardFromArraySuit = SUITS_VIET.indexOf(arrayOfCards[middle].getSuit());
        cardToFindSuit = SUITS_VIET.indexOf(card.substr(card.length - 1));
      } else if (version === CHINESE_VERSION) {
        cardFromArraySuit = SUITS_CHINESE.indexOf(arrayOfCards[middle].getSuit());
        cardToFindSuit = SUITS_CHINESE.indexOf(card.substr(card.length - 1));
      }
      if (cardToFindSuit < cardFromArraySuit) {
        end = middle - 1;
      } else {
        start = middle + 1;
      }
    }
    middle = Math.floor((start + end) / 2);
  }
  if (arrayOfCards[middle].convertToString() === card) {
    return middle;
  }
  return -1;
};

export default binarySearch;
