"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _Sorting = _interopRequireDefault(require("./Helpers/Sorting"));

var _Search = _interopRequireDefault(require("./Helpers/Search"));

var _Constants = require("./Helpers/Constants");

var Hand =
/*#__PURE__*/
function () {
  /**
   * Constructor for Hand class.
   * @param {Array[Card]} cards array of Cards
   */
  function Hand(cards) {
    (0, _classCallCheck2["default"])(this, Hand);
    this.cards = cards;
    this.sorted = false;
  }

  (0, _createClass2["default"])(Hand, [{
    key: "checkIfHandEmpty",
    value: function checkIfHandEmpty() {
      return this.cards.length <= 0;
    }
  }, {
    key: "getCards",
    value: function getCards() {
      return this.cards;
    }
  }, {
    key: "setCards",
    value: function setCards(cards) {
      this.cards = cards;
      this.sorted = false;
    }
  }, {
    key: "getIsSorted",
    value: function getIsSorted() {
      return this.sorted;
    }
  }, {
    key: "getNumberOfCards",
    value: function getNumberOfCards() {
      return this.cards.length;
    }
  }, {
    key: "discardCard",
    value: function discardCard(index) {
      if (index > -1 && index < this.getNumberOfCards()) {
        this.cards.splice(index, 1);
        return true;
      }

      return false;
    }
  }, {
    key: "findCard",
    value: function findCard(rank, suit) {
      var version = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _Constants.CHINESE_VERSION;

      if (this.sorted) {
        return (0, _Search["default"])(this.cards, "".concat(rank).concat(suit), version);
      }

      var cardFound = -1;
      this.cards.forEach(function (card, index) {
        var cardProperties = card.getProperties();

        if (cardProperties.rank === rank && cardProperties.suit === suit) {
          cardFound = index;
        }
      });
      return cardFound;
    }
  }, {
    key: "sortCards",
    value: function sortCards(version) {
      this.setCards((0, _Sorting["default"])(this.cards, version));
      this.sorted = true;
    }
  }]);
  return Hand;
}();

var _default = Hand;
exports["default"] = _default;