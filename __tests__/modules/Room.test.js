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
