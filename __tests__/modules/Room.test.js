// import Room from '../../server/modules/Room';
// import Player from '../../server/modules/Player';
// import {
//   CHINESE_VERSION,
// } from '../../server/modules/Helpers/Constants';

// let room;

// beforeEach(() => {
//   room = new Room('NewRoom', 4, CHINESE_VERSION, new Player('NewPlayer', 'SOCKETIDASDF'));
// });

// test('Room: not full', () => {
//   expect(room.checkIfFull()).toBe(false);
// });

// test('Room: not started', () => {
//   expect(room.checkIfStarted()).toBe(false);
// });

// test('Room: not empty', () => {
//   expect(room.checkIfEmpty()).toBe(false);
// });

// test('Room: remove Player', () => {
//   room.removePlayer(new Player('NewPlayer', 'SOCKETIDASDF'));
//   expect(room.checkIfEmpty()).toBe(true);
// });

// test('Room: add Player', () => {
//   room.addPlayer(new Player('NewPlayer2', 'SOCKETIDASDF2'));
//   room.addPlayer(new Player('NewPlayer3', 'SOCKETIDASDF3'));
//   room.addPlayer(new Player('NewPlayer4', 'SOCKETIDASDF4'));
//   expect(room.checkIfFull()).toBe(true);
// });

// test('Room: get Version', () => {
//   expect(room.getVersion()).toBe(CHINESE_VERSION);
// });

// test('Room: start Game', () => {
//   room.startGame();
//   expect(room.checkIfStarted()).toBe(true);
// });

import BigTwoFactory from '../../socketio/modules/room/bigTwoRoom';
import PlayerFactory from '../../socketio/modules/users/player';
import BIGTWO_VERSIONS from '../../socketio/modules/room/bigTwoVersions';

const player = PlayerFactory.createUser('PlayerName', 'socketId');
const player2 = PlayerFactory.createUser('PlayerName2', 'socketId2');
let room;
const roomName = 'Room Name';
const maxUsers = 2;
const version = BIGTWO_VERSIONS.CHINESE;


beforeEach(() => {
  room = BigTwoFactory.createRoom(roomName, maxUsers, player, version);
});

test('Room: attributes', () => {
  expect(room.roomName()).toBe(roomName);
  expect(room.maxUsers()).toBe(maxUsers);
  expect(room.started()).toBeFalsy();
  expect(room.users()).toHaveLength(1);
});

test('Room: checkIfFull', () => {
  expect(room.checkIfFull()).toBeFalsy();
  room.addUser(player2);
  expect(room.checkIfFull()).toBeTruthy();
  room.removeUser(player2);
  expect(room.checkIfFull()).toBeFalsy();
});

test('Room: checkIfEmpty', () => {
  expect(room.checkIfEmpty()).toBeFalsy();
  room.addUser(player2);
  expect(room.checkIfEmpty()).toBeFalsy();
  room.removeUser(player);
  expect(room.checkIfEmpty()).toBeFalsy();
  room.removeUser(player2);
  expect(room.checkIfEmpty()).toBeTruthy();
});

test('Room: startRoom', () => {
  room.startRoom();
  expect(room.started()).toBeFalsy();
  expect(room.startRoom()).toBeFalsy();
  room.addUser(player2);
  expect(room.startRoom()).toBeTruthy();
  expect(room.started()).toBeTruthy();
});

test('Room: add user/remove user', () => {
  expect(room.addUser(player2)).toBeTruthy();
  expect(room.addUser(player2)).toBeFalsy();
  expect(room.addUser(player)).toBeFalsy();
  expect(room.removeUser(player2)).toBeTruthy();
  expect(room.removeUser(player2)).toBeFalsy();
  expect(room.removeUser(player)).toBeTruthy();
  expect(room.removeUser(player)).toBeFalsy();
});

test('BigTwoRoom: game version', () => {
  expect(room.gameVersion()).toBe(BIGTWO_VERSIONS.CHINESE);
});
