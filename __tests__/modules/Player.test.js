import Player from '../../modules/Player';
import {
  USER_LOBBY_STATE, USER_IN_ROOM_STATE, USER_IN_GAME_STATE,
} from '../../modules/Helpers/Constants';

let player;

beforeEach(() => {
  player = new Player('New Player', 'SOCKETID1234');
});

test('Player: get Room', () => {
  expect(player.getRoom()).toBe(null);
});

test('Player: join Room', () => {
  const roomName = 'New Room';
  player.joinRoom(roomName);

  expect(player.getRoom()).toBe(roomName);
});

test('Player: leave Room', () => {
  const roomName = 'New Room';
  player.joinRoom(roomName);
  player.leaveRoom();
  expect(player.getRoom()).toBe(null);
});

test('Player: check Lobby State', () => {
  expect(player.getState()).toBe(USER_LOBBY_STATE);
});

test('Player: check Lobby State 2', () => {
  const roomName = 'New Room';
  player.joinRoom(roomName);
  player.leaveRoom();
  expect(player.getState()).toBe(USER_LOBBY_STATE);
});

test('Player: check room state', () => {
  const roomName = 'New Room';
  player.joinRoom(roomName);
  expect(player.checkIfInRoom()).toBe(true);
});

test('Player: check room state 2', () => {
  const roomName = 'New Room';
  player.joinRoom(roomName);
  expect(player.getState()).toBe(USER_IN_ROOM_STATE);
});

test('Player: check game state', () => {
  const roomName = 'New Room';
  player.joinRoom(roomName);
  player.startedGame();
  expect(player.checkIfInRoom()).toBe(true);
});

test('Player: check game state 2', () => {
  const roomName = 'New Room';
  player.joinRoom(roomName);
  player.startedGame();
  expect(player.getState()).toBe(USER_IN_GAME_STATE);
});