import {
  RANKS, SUITS_CHINESE, SUITS_VIET, VIET_VERSION, CHINESE_VERSION,
} from './Constants';

const merge = (arr1, arr2, version) => {
  const results = [];
  let i = 0;
  let j = 0;

  while (i < arr1.length && j < arr2.length) {
    const card1 = arr1[i].getProperties();
    const card2 = arr2[j].getProperties();

    const card1Rank = RANKS.indexOf(card1.rank);
    const card2Rank = RANKS.indexOf(card2.rank);

    if (card1Rank < card2Rank) {
      results.push(arr1[i]);
      i += 1;
    } else if (card2Rank < card1Rank) {
      results.push(arr2[j]);
      j += 1;
    } else {
      let card1Suit;
      let card2Suit;

      if (version === VIET_VERSION) {
        card1Suit = SUITS_VIET.indexOf(card1.suit);
        card2Suit = SUITS_VIET.indexOf(card2.suit);
      } else if (version === CHINESE_VERSION) {
        card1Suit = SUITS_CHINESE.indexOf(card1.suit);
        card2Suit = SUITS_CHINESE.indexOf(card2.suit);
      }
      if (card1Suit < card2Suit) {
        results.push(arr1[i]);
        i += 1;
      } else {
        results.push(arr2[j]);
        j += 1;
      }
    }
  }

  while (i < arr1.length) {
    results.push(arr1[i]);
    i += 1;
  }
  while (j < arr2.length) {
    results.push(arr2[j]);
    j += 1;
  }
  return results;
};

const mergeSort = (cards, version) => {
  if (cards.length <= 1) {
    return cards;
  }
  const middle = Math.floor(cards.length / 2);
  const left = mergeSort(cards.slice(0, middle), version);
  const right = mergeSort(cards.slice(middle), version);
  return merge(left, right, version);
};

export default mergeSort;
