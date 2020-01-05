"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = void 0;

var _Constants = require("./Constants");

/**
 * Finds card in sorted array and returns index.
 * @param {Array[Card]} arrayOfCards array of Card class
 * @param {string} card card in string format (e.g. '3C')
 * @param {string} version version of BigTwo game
 */
var binarySearch = function binarySearch(arrayOfCards, card, version) {
  var start = 0;
  var end = arrayOfCards.length - 1;
  var middle = Math.floor((start + end) / 2);

  while (start <= end && arrayOfCards[middle].convertToString() !== card) {
    var cardFromArrayRank = _Constants.RANKS.indexOf(arrayOfCards[middle].getRank());

    var cardToFindRank = _Constants.RANKS.indexOf(card.substr(0, card.length - 1));

    if (cardToFindRank < cardFromArrayRank) {
      end = middle - 1;
    } else if (cardToFindRank > cardFromArrayRank) {
      start = middle + 1;
    } else {
      var cardFromArraySuit = void 0;
      var cardToFindSuit = void 0;

      if (version === _Constants.VIET_VERSION) {
        cardFromArraySuit = _Constants.SUITS_VIET.indexOf(arrayOfCards[middle].getSuit());
        cardToFindSuit = _Constants.SUITS_VIET.indexOf(card.substr(card.length - 1));
      } else if (version === _Constants.CHINESE_VERSION) {
        cardFromArraySuit = _Constants.SUITS_CHINESE.indexOf(arrayOfCards[middle].getSuit());
        cardToFindSuit = _Constants.SUITS_CHINESE.indexOf(card.substr(card.length - 1));
      }

      if (cardToFindSuit < cardFromArraySuit) {
        end = middle - 1;
      } else {
        start = middle + 1;
      }
    }

    middle = Math.floor((start + end) / 2);
  }

  if (middle >= 0 && arrayOfCards[middle].convertToString() === card) {
    return middle;
  }

  return -1;
};

var _default = binarySearch;
exports["default"] = _default;