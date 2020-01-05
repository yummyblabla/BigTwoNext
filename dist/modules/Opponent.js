"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var Opponent =
/*#__PURE__*/
function () {
  function Opponent(name) {
    (0, _classCallCheck2["default"])(this, Opponent);
    this.name = name;
    this.numberOfCards = 13;
    this.passed = false;
  }

  (0, _createClass2["default"])(Opponent, [{
    key: "getUsername",
    value: function getUsername() {
      return this.name;
    }
  }, {
    key: "decreaseCards",
    value: function decreaseCards(number) {
      this.numberOfCards -= number;
    }
  }, {
    key: "getNumberOfCards",
    value: function getNumberOfCards() {
      return this.numberOfCards;
    }
  }]);
  return Opponent;
}();

var _default = Opponent;
exports["default"] = _default;