"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = void 0;

var _keys = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/keys"));

var _Constants = require("./Helpers/Constants");

var evaluateValidSingle = function evaluateValidSingle(cards) {
  return cards.length === 1;
};

var evaluateSingle = function evaluateSingle(cards, currentPlay, version) {
  if (!evaluateValidSingle(cards)) {
    return false;
  }

  var currentPlayRank = _Constants.RANKS.indexOf(currentPlay[0].getRank());

  var cardRank = _Constants.RANKS.indexOf(cards[0].getRank());

  if (cardRank > currentPlayRank) {
    return true;
  }

  if (cardRank < currentPlayRank) {
    return false;
  }

  var currentPlaySuit;
  var cardSuit;

  if (version === _Constants.CHINESE_VERSION) {
    currentPlaySuit = _Constants.SUITS_CHINESE.indexOf(currentPlay[0].getSuit());
    cardSuit = _Constants.SUITS_CHINESE.indexOf(cards[0].getSuit());
  } else if (version === _Constants.VIET_VERSION) {
    currentPlaySuit = _Constants.SUITS_VIET.indexOf(currentPlay[0].getSuit());
    cardSuit = _Constants.SUITS_VIET.indexOf(cards[0].getSuit());
  }

  return cardSuit > currentPlaySuit;
};

var evaluateValidDouble = function evaluateValidDouble(cards) {
  if (cards.length !== 2) {
    return false;
  }

  if (cards[0].getRank() !== cards[1].getRank()) {
    return false;
  }

  return true;
};

var evaluateDouble = function evaluateDouble(cards, currentPlay, version) {
  if (!evaluateValidDouble(cards)) {
    return false;
  }

  var currentPlayRank = _Constants.RANKS.indexOf(currentPlay[1].getRank());

  var cardRank = _Constants.RANKS.indexOf(cards[1].getRank());

  if (cardRank > currentPlayRank) {
    return true;
  }

  if (cardRank < currentPlayRank) {
    return false;
  }

  var currentPlaySuit;
  var cardSuit;

  if (version === _Constants.CHINESE_VERSION) {
    currentPlaySuit = _Constants.SUITS_CHINESE.indexOf(currentPlay[1].getSuit());
    cardSuit = _Constants.SUITS_CHINESE.indexOf(cards[1].getSuit());
  } else if (version === _Constants.VIET_VERSION) {
    currentPlaySuit = _Constants.SUITS_VIET.indexOf(currentPlay[1].getSuit());
    cardSuit = _Constants.SUITS_VIET.indexOf(cards[1].getSuit());
  }

  return cardSuit < currentPlaySuit;
};

var evaluateValidTriple = function evaluateValidTriple(cards) {
  if (cards.length !== 3) {
    return false;
  }

  if (cards[0].getRank() !== cards[1].getRank() && cards[0].getRank() !== cards[2].getRank()) {
    return false;
  }

  return true;
};

var evaluateTriple = function evaluateTriple(cards, currentPlay) {
  if (!evaluateValidTriple(cards)) {
    return false;
  }

  var currentPlayRank = _Constants.RANKS.indexOf(currentPlay[0].getRank());

  var cardRank = _Constants.RANKS.indexOf(cards[0].getRank());

  return cardRank > currentPlayRank;
};

var isStraight = function isStraight(cards) {
  // TODO: need to incorporate A 2 3 4 5 and 2 3 4 5 straight
  // need to block out J Q K A 2 straight
  var valid = {
    validStraight: false,
    topStraight: null
  };

  var firstRank = _Constants.RANKS.indexOf(cards[0].getRank());

  for (var i = 1; i < cards.length; i += 1) {
    var nextRank = _Constants.RANKS.indexOf(cards[i].getRank());

    if (nextRank !== firstRank + i) {
      return valid;
    }
  }

  valid.validStraight = true;
  valid.topStraight = cards[cards.length - 1];
  return valid;
};

var isFlush = function isFlush(cards) {
  var firstSuit = cards[0].getSuit();
  var valid = {
    validFlush: false,
    topFlush: null
  };

  for (var i = 1; i < cards.length; i += 1) {
    var nextCardSuit = cards[i].getSuit();

    if (nextCardSuit !== firstSuit) {
      return valid;
    }
  }

  valid.validFlush = true;
  valid.topFlush = cards[cards.length - 1];
  return valid;
};

var isFullHouse = function isFullHouse(cards) {
  var counter = {};
  cards.forEach(function (card, index) {
    counter[cards[index].getRank()] = (counter[cards[index].getRank()] || 0) + 1;
  });
  var _double = false;
  var triple = false;
  var tripleRank = null;
  (0, _keys["default"])(counter).forEach(function (rank) {
    if (counter[rank] === 2) {
      _double = true;
    }

    if (counter[rank] === 3) {
      triple = true;
      tripleRank = rank;
    }
  });
  return {
    validFullHouse: _double && triple,
    tripleRank: tripleRank
  };
};

var isFourOfAKind = function isFourOfAKind(cards) {
  var counter = {};
  cards.forEach(function (card, index) {
    counter[cards[index].getRank()] = (counter[cards[index].getRank()] || 0) + 1;
  });
  var fours = false;
  var foursRank = null;
  (0, _keys["default"])(counter).forEach(function (rank) {
    if (counter[rank] === 4) {
      fours = true;
      foursRank = rank;
    }
  });
  return {
    validFours: fours,
    foursRank: foursRank
  };
};

var evaluateFiveCardHandStrength = function evaluateFiveCardHandStrength(cards) {
  if (cards.length !== 5) {
    return 0;
  }

  var _isStraight = isStraight(cards),
      validStraight = _isStraight.validStraight,
      topStraight = _isStraight.topStraight;

  var _isFlush = isFlush(cards),
      validFlush = _isFlush.validFlush,
      topFlush = _isFlush.topFlush;

  var _isFullHouse = isFullHouse(cards),
      validFullHouse = _isFullHouse.validFullHouse,
      tripleRank = _isFullHouse.tripleRank;

  var _isFourOfAKind = isFourOfAKind(cards),
      validFours = _isFourOfAKind.validFours,
      foursRank = _isFourOfAKind.foursRank;

  if (validStraight && validFlush) {
    return _Constants.STRAIGHT_FLUSH_VALUE;
  }

  if (validFours) {
    return {
      value: _Constants.FOUR_OF_A_KIND_VALUE,
      toCompare: foursRank
    };
  }

  if (validFullHouse) {
    return {
      value: _Constants.FULL_HOUSE_VALUE,
      toCompare: tripleRank
    };
  }

  if (validFlush) {
    return {
      value: _Constants.FLUSH_VALUE,
      toCompare: topFlush
    };
  }

  if (validStraight) {
    return {
      value: _Constants.STRAIGHT_VALUE,
      toCompare: topStraight
    };
  }

  return {
    value: 0
  };
};

var compareCard = function compareCard(cardToCompare, currentPlayToCompare, version) {
  if (typeof cardToCompare === 'number') {
    return cardToCompare > currentPlayToCompare;
  }

  var cardRank = _Constants.RANKS.indexOf(cardToCompare.getRank());

  var playRank = _Constants.RANKS.indexOf(currentPlayToCompare.getRank());

  if (cardRank > playRank) {
    return true;
  }

  if (cardRank < playRank) {
    return false;
  }

  var cardSuit;
  var playSuit;

  if (version === _Constants.CHINESE_VERSION) {
    cardSuit = _Constants.SUITS_CHINESE.indexOf(cardToCompare.getSuit());
    playSuit = _Constants.SUITS_CHINESE.indexOf(currentPlayToCompare.getSuit());
  } else if (version === _Constants.VIET_VERSION) {
    cardSuit = _Constants.SUITS_VIET.indexOf(cardToCompare.getSuit());
    playSuit = _Constants.SUITS_VIET.indexOf(currentPlayToCompare.getSuit());
    return cardSuit > playSuit;
  }
};

var evaluateFiveCardHand = function evaluateFiveCardHand(cards, currentPlay, version) {
  var _evaluateFiveCardHand = evaluateFiveCardHandStrength(cards),
      cardsValue = _evaluateFiveCardHand.value,
      cardsToCompare = _evaluateFiveCardHand.toCompare;

  if (cardsValue === 0) {
    return false;
  }

  var _evaluateFiveCardHand2 = evaluateFiveCardHandStrength(currentPlay),
      currentPlayValue = _evaluateFiveCardHand2.value,
      currentPlayToCompare = _evaluateFiveCardHand2.toCompare;

  if (cardsValue > currentPlayValue) {
    return true;
  }

  if (cardsValue < currentPlayValue) {
    return false;
  }

  if (cardsValue === currentPlayValue) {
    return compareCard(cardsToCompare, currentPlayToCompare, version);
  } // TODO: evaluation of same hands


  return true;
};

var evaluateCards = function evaluateCards(cards, currentPlay, version) {
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

  return true;
};

var _default = evaluateCards;
exports["default"] = _default;