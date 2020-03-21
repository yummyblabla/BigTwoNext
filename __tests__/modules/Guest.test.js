import GuestFactory from '../../socketio/modules/users/guest';
import BigTwoFactory from '../../socketio/modules/room/bigTwoRoom';
import UserStateEnum from '../../socketio/modules/users/userStates';

let guest;
const roomName = 'Room Name';
const maxUsers = 4;
const room = BigTwoFactory.createRoom(roomName, maxUsers);
const socketId = 'socketId';

beforeEach(() => {
  guest = GuestFactory.createUser(socketId);
});

test('Guest: attributes', () => {
  const nameArray = guest.username().split('_');

  expect(nameArray[0]).toBe('Guest');
  expect(parseInt(nameArray[1], 10) <= 9999).toBeTruthy();
  expect(parseInt(nameArray[1], 10) >= 0).toBeTruthy();
  expect(guest.socketId()).toBe(socketId);
  expect(guest.state()).toBe(UserStateEnum.LOBBY_STATE);
  expect(guest.currentRoom()).toBe(null);
});

test('Guest: joinRoom', () => {
  guest.joinRoom(room);
  expect(guest.currentRoom()).toBe(room);
  expect(guest.state()).toBe(UserStateEnum.ROOM_STATE);
});

test('Guest: joinRoom -> leaveRoom', () => {
  guest.joinRoom(room);
  guest.leaveRoom();
  expect(guest.currentRoom()).toBe(null);
  expect(guest.state()).toBe(UserStateEnum.LOBBY_STATE);
});

test('Guest: joinRoom -> startGame', () => {
  guest.joinRoom(room);
  guest.startGame();
  expect(guest.currentRoom()).toBe(room);
  expect(guest.state()).toBe(UserStateEnum.GAME_STATE);
});

test('Guest: joinRoom -> startGame -> leaveRoom', () => {
  guest.joinRoom(room);
  guest.startGame();
  guest.leaveRoom();
  expect(guest.currentRoom()).toBe(null);
  expect(guest.state()).toBe(UserStateEnum.LOBBY_STATE);
});
