"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _Constants = require("./Helpers/Constants");

var Card =
/*#__PURE__*/
function () {
  /**
   * Constructor for Card class.
   * @param {string} rank rank of card '3 4 5 6 7 8 9 10 J Q K A 2'
   * @param {*string} suit suit of card 'D C H S'
   */
  function Card(rank, suit) {
    (0, _classCallCheck2["default"])(this, Card);

    if (typeof rank === 'string' && _Constants.RANKS.indexOf(rank) !== -1 && typeof suit === 'string' && _Constants.SUITS_CHINESE.indexOf(suit) !== -1) {
      this.rank = rank;
      this.suit = suit;
    } else {
      throw RangeError('Invalid card generated.');
    }
  }

  (0, _createClass2["default"])(Card, [{
    key: "getRank",
    value: function getRank() {
      return this.rank;
    }
  }, {
    key: "getSuit",
    value: function getSuit() {
      return this.suit;
    }
  }, {
    key: "getProperties",
    value: function getProperties() {
      return {
        rank: this.getRank(),
        suit: this.getSuit()
      };
    }
  }, {
    key: "convertToString",
    value: function convertToString() {
      return this.getRank() + this.getSuit();
    }
  }]);
  return Card;
}();

var _default = Card;
exports["default"] = _default;