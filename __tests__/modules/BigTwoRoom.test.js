import BigTwoRoomFactory from '../../socketio/modules/room/bigTwoRoom';
import PlayerFactory from '../../socketio/modules/users/player';
import BigTwoVersionEnum from '../../socketio/modules/room/bigTwoVersions';

const host = PlayerFactory.createUser({ username: 'PlayerName', socketId: 'socketId' });
const player2 = PlayerFactory.createUser({ username: 'PlayerName2', socketId: 'socketId2' });
let room;
const roomName = 'Room Name';
const maxUsers = 2;
const gameVersion = BigTwoVersionEnum.CHINESE;


beforeEach(() => {
  room = BigTwoRoomFactory.createRoom({
    roomName, maxUsers, host, gameVersion,
  });
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
  room.removeUser(host);
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
  expect(room.addUser(host)).toBeFalsy();
  expect(room.removeUser(player2)).toBeTruthy();
  expect(room.removeUser(player2)).toBeFalsy();
  expect(room.removeUser(host)).toBeTruthy();
  expect(room.removeUser(host)).toBeFalsy();
});

test('BigTwoRoom: game version', () => {
  expect(room.gameVersion()).toBe(BigTwoVersionEnum.CHINESE);
});

test('BigTwoRoom: extractInfoForGame', () => {
  room.addUser(player2);
  expect(room.extractInfoForGame()).toStrictEqual({
    roomName,
    users: [host, player2],
    gameVersion,
  });
});
