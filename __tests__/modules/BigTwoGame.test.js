import BigTwoGameFactory from '../../socketio/modules/game/bigTwoGame';
import PlayerFactory from '../../socketio/modules/users/player';
import BigTwoRoomFactory from '../../socketio/modules/room/bigTwoRoom';
import BigTwoVersionEnum from '../../socketio/modules/room/bigTwoVersions';

const playerName = 'PlayerName';
const socketId = 'socketId';
const playerName2 = 'PlayerName2';
const socketId2 = 'socketId2';
const player = PlayerFactory.createUser({ username: playerName, socketId });
const player2 = PlayerFactory.createUser({ username: playerName2, socketId: socketId2 });
const roomName = 'Room Name';
const maxUsers = 3;
const gameVersion = BigTwoVersionEnum.CHINESE;
const room = BigTwoRoomFactory.createRoom({
  roomName, maxUsers, host: player, gameVersion,
});
room.addUser(player2);
let game;

beforeEach(() => {
  const roomInfo = room.extractInfoForGame();
  game = BigTwoGameFactory.createGame(roomInfo);
});

test('Game: attributes', () => {
  expect(game.users()).toStrictEqual([player, player2]);
  expect(game.roomName()).toBe(roomName);
  expect(game.readyStateCounter()).toBe(0);
  expect(game.started()).toBeFalsy();
  expect(game.currentPlayerTurn()).toBe(null);
  expect(game.gameVersion()).toBe(gameVersion);
});

test('Game: checkIfEmpty', () => {

});

test('Game: goToNextPlayerTurn', () => {

});

test('Game: removeUser', () => {

});

test('Game: checkUserExists', () => {

});
