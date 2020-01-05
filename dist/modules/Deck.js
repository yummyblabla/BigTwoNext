"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _Card = _interopRequireDefault(require("./Card"));

var _Constants = require("./Helpers/Constants");

var _Hand = _interopRequireDefault(require("./Hand"));

var generateDeck = function generateDeck() {
  var deck = [];

  _Constants.RANKS.forEach(function (rank) {
    _Constants.SUITS_CHINESE.forEach(function (suit) {
      deck.push(new _Card["default"](rank, suit));
    });
  });

  return deck;
};

var Deck =
/*#__PURE__*/
function () {
  function Deck() {
    (0, _classCallCheck2["default"])(this, Deck);
    this.cards = generateDeck();
  }

  (0, _createClass2["default"])(Deck, [{
    key: "getCards",
    value: function getCards() {
      return this.cards;
    }
  }, {
    key: "shuffle",
    value: function shuffle() {
      for (var i = 0; i < this.cards.length; i += 1) {
        // eslint-disable-next-line no-bitwise
        var rnd = Math.random() * i | 0;
        var _ref = [this.cards[rnd], this.cards[i]];
        this.cards[i] = _ref[0];
        this.cards[rnd] = _ref[1];
      }

      return this.cards;
    }
  }, {
    key: "distribute",
    value: function distribute(version) {
      var shuffledDeck = this.shuffle();
      var pile1 = new _Hand["default"](shuffledDeck.slice(0, 13));
      pile1.sortCards(version);
      var pile2 = new _Hand["default"](shuffledDeck.slice(13, 26));
      pile2.sortCards(version);
      var pile3 = new _Hand["default"](shuffledDeck.slice(26, 39));
      pile3.sortCards(version);
      var pile4 = new _Hand["default"](shuffledDeck.slice(39, 52));
      pile4.sortCards(version);
      return [pile1, pile2, pile3, pile4];
    }
  }]);
  return Deck;
}();

var _default = Deck;
exports["default"] = _default;