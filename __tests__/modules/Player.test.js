import PlayerFactory from '../../socketio/modules/users/player';
import BigTwoFactory from '../../socketio/modules/room/bigTwoRoom';
import UserStateEnum from '../../socketio/modules/users/userStates';

let player;
const roomName = 'Room Name';
const maxUsers = 4;
const room = BigTwoFactory.createRoom(roomName, maxUsers);
const playerName = 'PlayerName';
const socketId = 'socketId';
const playerInfo = {
  username: playerName,
  socketId,
};

beforeEach(() => {
  player = PlayerFactory.createUser(playerInfo);
});

test('Player: attributes', () => {
  expect(player.username()).toBe(playerName);
  expect(player.socketId()).toBe(socketId);
  expect(player.state()).toBe(UserStateEnum.LOBBY_STATE);
  expect(player.currentRoom()).toBe(null);
});

test('Player: joinRoom', () => {
  player.joinRoom(room);
  expect(player.currentRoom()).toBe(room);
  expect(player.state()).toBe(UserStateEnum.ROOM_STATE);
});

test('Player: joinRoom -> leaveRoom', () => {
  player.joinRoom(room);
  player.leaveRoom();
  expect(player.currentRoom()).toBe(null);
  expect(player.state()).toBe(UserStateEnum.LOBBY_STATE);
});

test('Player: joinRoom -> startGame', () => {
  player.joinRoom(room);
  player.startGame();
  expect(player.currentRoom()).toBe(room);
  expect(player.state()).toBe(UserStateEnum.GAME_STATE);
});

test('Player: joinRoom -> startGame -> leaveRoom', () => {
  player.joinRoom(room);
  player.startGame();
  player.leaveRoom();
  expect(player.currentRoom()).toBe(null);
  expect(player.state()).toBe(UserStateEnum.LOBBY_STATE);
});
