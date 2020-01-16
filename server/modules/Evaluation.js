import {
  CHINESE_VERSION,
  VIET_VERSION,
  RANKS,
  SUITS_CHINESE,
  SUITS_VIET,
  STRAIGHT_FLUSH_VALUE, FOUR_OF_A_KIND_VALUE, FULL_HOUSE_VALUE, FLUSH_VALUE, STRAIGHT_VALUE,
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
  return cardSuit > currentPlaySuit;
};

const evaluateValidTriple = (cards) => {
  if (cards.length !== 3) {
    return false;
  }
  if (cards[0].getRank() !== cards[1].getRank() || cards[0].getRank() !== cards[2].getRank()) {
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
  const valid = {
    validStraight: false,
    topStraight: null,
  };

  const firstRank = RANKS.indexOf(cards[0].getRank());

  for (let i = 1; i < cards.length; i += 1) {
    const nextRank = RANKS.indexOf(cards[i].getRank());

    if (nextRank !== firstRank + i) {
      return valid;
    }
  }
  valid.validStraight = true;
  valid.topStraight = cards[cards.length - 1];
  return valid;
};

const isFlush = (cards) => {
  const firstSuit = cards[0].getSuit();

  const valid = {
    validFlush: false,
    topFlush: null,
  };
  for (let i = 1; i < cards.length; i += 1) {
    const nextCardSuit = cards[i].getSuit();

    if (nextCardSuit !== firstSuit) {
      return valid;
    }
  }
  valid.validFlush = true;
  valid.topFlush = cards[cards.length - 1];
  return valid;
};

const isFullHouse = (cards) => {
  const counter = {};

  cards.forEach((card, index) => {
    counter[cards[index].getRank()] = (counter[cards[index].getRank()] || 0) + 1;
  });
  let double = false;
  let triple = false;
  let tripleRank = null;
  Object.keys(counter).forEach((rank) => {
    if (counter[rank] === 2) {
      double = true;
    }
    if (counter[rank] === 3) {
      triple = true;
      tripleRank = rank;
    }
  });
  return { validFullHouse: double && triple, tripleRank };
};

const isFourOfAKind = (cards) => {
  const counter = {};

  cards.forEach((card, index) => {
    counter[cards[index].getRank()] = (counter[cards[index].getRank()] || 0) + 1;
  });
  let fours = false;
  let foursRank = null;
  Object.keys(counter).forEach((rank) => {
    if (counter[rank] === 4) {
      fours = true;
      foursRank = rank;
    }
  });
  return { validFours: fours, foursRank };
};

const evaluateFiveCardHandStrength = (cards) => {
  if (cards.length !== 5) {
    return { value: 0 };
  }

  const { validStraight, topStraight } = isStraight(cards);
  const { validFlush, topFlush } = isFlush(cards);
  const { validFullHouse, tripleRank } = isFullHouse(cards);
  const { validFours, foursRank } = isFourOfAKind(cards);

  if (validStraight && validFlush) {
    return { value: STRAIGHT_FLUSH_VALUE, toCompare: cards[4] };
  }
  if (validFours) {
    return { value: FOUR_OF_A_KIND_VALUE, toCompare: foursRank };
  }
  if (validFullHouse) {
    return { value: FULL_HOUSE_VALUE, toCompare: tripleRank };
  }
  if (validFlush) {
    return { value: FLUSH_VALUE, toCompare: topFlush };
  }
  if (validStraight) {
    return { value: STRAIGHT_VALUE, toCompare: topStraight };
  }
  return { value: 0 };
};

const compareCard = (cardToCompare, currentPlayToCompare, version) => {
  if (typeof cardToCompare === 'number') {
    return cardToCompare > currentPlayToCompare;
  }
  const cardRank = RANKS.indexOf(cardToCompare.getRank());
  const playRank = RANKS.indexOf(currentPlayToCompare.getRank());

  if (cardRank > playRank) {
    return true;
  }
  if (cardRank < playRank) {
    return false;
  }

  let cardSuit;
  let playSuit;

  if (version === CHINESE_VERSION) {
    cardSuit = SUITS_CHINESE.indexOf(cardToCompare.getSuit());
    playSuit = SUITS_CHINESE.indexOf(currentPlayToCompare.getSuit());
  } else if (version === VIET_VERSION) {
    cardSuit = SUITS_VIET.indexOf(cardToCompare.getSuit());
    playSuit = SUITS_VIET.indexOf(currentPlayToCompare.getSuit());
  }
  return cardSuit > playSuit;
};

const evaluateFiveCardHand = (cards, currentPlay, version) => {
  const { value: cardsValue, toCompare: cardsToCompare } = evaluateFiveCardHandStrength(cards);
  if (cardsValue === 0) {
    return false;
  }
  const {
    value: currentPlayValue,
    toCompare: currentPlayToCompare,
  } = evaluateFiveCardHandStrength(currentPlay);

  if (cardsValue > currentPlayValue) {
    return true;
  }
  if (cardsValue < currentPlayValue) {
    return false;
  }
  if (cardsValue === currentPlayValue) {
    return compareCard(cardsToCompare, currentPlayToCompare, version);
  }

  return false;
};

const evaluateCards = (cards, currentPlay, version) => {
  if (currentPlay === null) {
    if (cards.length === 1) {
      return evaluateValidSingle(cards);
    }
    if (cards.length === 2) {
      return evaluateValidDouble(cards);
    }
    if (cards.length === 3) {
      return evaluateValidTriple(cards);
    }
    if (cards.length === 5) {
      const { value } = evaluateFiveCardHandStrength(cards);
      return value > 0;
    }
    return false;
  }

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
    return evaluateFiveCardHand(cards, currentPlay, version);
  }

  return false;
};

export default evaluateCards;
