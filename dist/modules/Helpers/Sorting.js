"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = void 0;

var _Constants = require("./Constants");

var merge = function merge(arr1, arr2, version) {
  var results = [];
  var i = 0;
  var j = 0;

  while (i < arr1.length && j < arr2.length) {
    var card1 = arr1[i].getProperties();
    var card2 = arr2[j].getProperties();

    var card1Rank = _Constants.RANKS.indexOf(card1.rank);

    var card2Rank = _Constants.RANKS.indexOf(card2.rank);

    if (card1Rank < card2Rank) {
      results.push(arr1[i]);
      i += 1;
    } else if (card2Rank < card1Rank) {
      results.push(arr2[j]);
      j += 1;
    } else {
      var card1Suit = void 0;
      var card2Suit = void 0;

      if (version === _Constants.VIET_VERSION) {
        card1Suit = _Constants.SUITS_VIET.indexOf(card1.suit);
        card2Suit = _Constants.SUITS_VIET.indexOf(card2.suit);
      } else if (version === _Constants.CHINESE_VERSION) {
        card1Suit = _Constants.SUITS_CHINESE.indexOf(card1.suit);
        card2Suit = _Constants.SUITS_CHINESE.indexOf(card2.suit);
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

var mergeSort = function mergeSort(cards, version) {
  if (cards.length <= 1) {
    return cards;
  }

  var middle = Math.floor(cards.length / 2);
  var left = mergeSort(cards.slice(0, middle), version);
  var right = mergeSort(cards.slice(middle), version);
  return merge(left, right, version);
};

var _default = mergeSort;
exports["default"] = _default;