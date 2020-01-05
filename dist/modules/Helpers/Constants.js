"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.STRAIGHT_VALUE = exports.FLUSH_VALUE = exports.FULL_HOUSE_VALUE = exports.FOUR_OF_A_KIND_VALUE = exports.STRAIGHT_FLUSH_VALUE = exports.USER_IN_GAME_STATE = exports.USER_IN_ROOM_STATE = exports.USER_LOBBY_STATE = exports.GAME_VERSIONS = exports.NUMBER_OF_PLAYERS = exports.SUITS_VIET = exports.SUITS_CHINESE = exports.RANKS = exports.VIET_VERSION = exports.CHINESE_VERSION = void 0;
var CHINESE_VERSION = 'Chinese';
exports.CHINESE_VERSION = CHINESE_VERSION;
var VIET_VERSION = 'Viet';
exports.VIET_VERSION = VIET_VERSION;
var RANKS = '3 4 5 6 7 8 9 10 J Q K A 2'.split(' ');
exports.RANKS = RANKS;
var SUITS_CHINESE = 'D C H S'.split(' ');
exports.SUITS_CHINESE = SUITS_CHINESE;
var SUITS_VIET = 'S C D H'.split(' ');
exports.SUITS_VIET = SUITS_VIET;
var NUMBER_OF_PLAYERS = [2, 3, 4];
exports.NUMBER_OF_PLAYERS = NUMBER_OF_PLAYERS;
var GAME_VERSIONS = [CHINESE_VERSION, VIET_VERSION];
exports.GAME_VERSIONS = GAME_VERSIONS;
var USER_LOBBY_STATE = 'In Lobby';
exports.USER_LOBBY_STATE = USER_LOBBY_STATE;
var USER_IN_ROOM_STATE = 'In Room';
exports.USER_IN_ROOM_STATE = USER_IN_ROOM_STATE;
var USER_IN_GAME_STATE = 'In Game';
exports.USER_IN_GAME_STATE = USER_IN_GAME_STATE;
var STRAIGHT_FLUSH_VALUE = 100;
exports.STRAIGHT_FLUSH_VALUE = STRAIGHT_FLUSH_VALUE;
var FOUR_OF_A_KIND_VALUE = 90;
exports.FOUR_OF_A_KIND_VALUE = FOUR_OF_A_KIND_VALUE;
var FULL_HOUSE_VALUE = 80;
exports.FULL_HOUSE_VALUE = FULL_HOUSE_VALUE;
var FLUSH_VALUE = 70;
exports.FLUSH_VALUE = FLUSH_VALUE;
var STRAIGHT_VALUE = 60;
exports.STRAIGHT_VALUE = STRAIGHT_VALUE;