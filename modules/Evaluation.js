import {
  CHINESE_VERSION, VIET_VERSION, RANKS, SUITS_CHINESE, SUITS_VIET,
} from './Helpers/Constants';

const evaluateValidSingle = (cards) => {
  return cards.length === 1;
};

const evaluateSingle = (cards, currentPlay, version) => {
  if (!evaluateValidSingle(cards)) {
    return false;
  }

  const currentPlayRank = RANKS.indexOf(currentPlay[0].getRank());
  const cardRank = RANKS.indexOf(cards[0].getRank());

  if (cardRank > currentPlayRank) {
    return true;
  }
  if (cardRank < currentPlayRank) {
    return false;
  }
  let currentPlaySuit;
  let cardSuit;

  if (version === CHINESE_VERSION) {
    currentPlaySuit = SUITS_CHINESE.indexOf(currentPlay[0].getSuit());
    cardSuit = SUITS_CHINESE.indexOf(cards[0].getSuit());
  } else if (version === VIET_VERSION) {
    currentPlaySuit = SUITS_VIET.indexOf(currentPlay[0].getSuit());
    cardSuit = SUITS_VIET.indexOf(cards[0].getSuit());
  }

  return cardSuit > currentPlaySuit;
};

const evaluateValidDouble = (cards) => {
  if (cards.length !== 2) {
    return false;
  }
  if (cards[0].getRank() !== cards[1].getRank()) {
    return false;
  }
  return true;
};

const evaluateDouble = (cards, currentPlay, version) => {
  if (!evaluateValidDouble(cards)) {
    return false;
  }
  const currentPlayRank = RANKS.indexOf(currentPlay[1].getRank());
  const cardRank = RANKS.indexOf(cards[1].getRank());

  if (cardRank > currentPlayRank) {
    return true;
  }
  if (cardRank < currentPlayRank) {
    return false;
  }

  let currentPlaySuit;
  let cardSuit;

  if (version === CHINESE_VERSION) {
    currentPlaySuit = SUITS_CHINESE.indexOf(currentPlay[1].getSuit());
    cardSuit = SUITS_CHINESE.indexOf(cards[1].getSuit());
  } else if (version === VIET_VERSION) {
    currentPlaySuit = SUITS_VIET.indexOf(currentPlay[1].getSuit());
    cardSuit = SUITS_VIET.indexOf(cards[1].getSuit());
  }
  return cardSuit < currentPlaySuit;
};

const evaluateValidTriple = (cards) => {
  if (cards.length !== 3) {
    return false;
  }
  if (cards[0].getRank() !== cards[1].getRank() && cards[0].getRank() !== cards[2].getRank()) {
    return false;
  }
  return true;
};

const evaluateTriple = (cards, currentPlay) => {
  if (!evaluateValidTriple(cards)) {
    return false;
  }
  const currentPlayRank = RANKS.indexOf(currentPlay[0].getRank());
  const cardRank = RANKS.indexOf(cards[0].getRank());

  return cardRank > currentPlayRank;
};

const isStraight = (cards) => {
  // TODO: need to incorporate A 2 3 4 5 and 2 3 4 5 straight
	// need to block out J Q K A 2 straight
  const firstRank = RANKS.indexOf(cards[0].getRank());

  for (let i = 1; i < cards.length; i += 1) {
    const nextRank = RANKS.indexOf(cards[i].getRank());

    if (nextRank !== firstRank + i) {
      return false;
    }
  }
  return true;
};

const isFlush = (cards) => {
  const firstSuit = cards[0].getSuit();

  for (let i = 1; i < cards.length; i += 1) {
    const nextCardSuit = cards[i].getSuit();

    if (nextCardSuit !== firstSuit) {
      return false;
    }
  }
  return true;
};

const isFullHouse = (cards) => {
  const counter = {};

  cards.forEach((card, index) => {
    counter[cards[index].getRank()] = (counter[cards[i].getRank()] || 0) + 1;
  });
  let double = false;
  let triple = false;
  Object.keys(counter).forEach((rank) => {
    if (counter[rank] === 2) {
      double = true;
    }
    if (counter[rank] === 3) {
      triple = true;
    }
  });
  return double && triple;
};

const isFourOfAKind = (cards) => {
  const counter = {};

  cards.forEach((card, index) => {
    counter[cards[index].getRank()] = (counter[cards[i].getRank()] || 0) + 1;
  });
  let fours = false;
  Object.keys(counter).forEach((rank) => {
    if (counter[rank] === 4) {
      fours = true;
    }
  });
  return fours;
};

const evaluateFiveCardHandStrength = (cards) => {
  if (cards.length !== 5) {
    return 0;
  }

  const straight = isStraight(cards);
  const flush = isFlush(cards);
  const fullhouse = isFullHouse(cards);
  const fours = isFourOfAKind(cards);

  if (straight && flush) {
    return 6;
  }
  if (fours) {
    return 5;
  }
  if (fullhouse) {
    return 4;
  }
  if (flush) {
    return 3;
  }
  if (straight) {
    return 2;
  }
  return 0;
};

const evaluateFiveCardHand = (cards, currentPlay, version) => {
  
  const cardsStrength = evaluateFiveCardHandStrength(cards);
  if (cardsStrength === 0) {
    return false;
  }
  const currentPlayStrength = evaluateFiveCardHandStrength(currentPlay);

  if (cardsStrength > currentPlayStrength) {
    return true;
  }
  if (cardsStrength < currentPlayStrength) {
    return false;
  }
  // TODO: evaluation of same hands
  return false;
};

const evaluateCards = (cards, currentPlay, version) => {
  if (currentPlay.length === 1) {
    return evaluateSingle(cards, currentPlay, version);
  }
  if (currentPlay.length === 2) {
    return evaluateDouble(cards, currentPlay, version);
  }
  if (currentPlay.length === 3) {
    return evaluateTriple(cards, currentPlay);
  }
  if (currentPlay.length === 5) {
    evaluateFiveCardHand(cards, currentPlay, version);
  }
  return true;
};

export default evaluateCards;
