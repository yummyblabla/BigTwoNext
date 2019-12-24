import * as actions from '../actions';

export const setSocket = (socket, fn, lobbyListeners) => ({
  type: actions.SET_SOCKET,
  payload: {
    socket,
    fn,
    lobbyListeners,
  },
});

export const setUsername = (username) => ({
  type: actions.SET_USERNAME,
  payload: {
    username,
  },
});

export const setPlayers = (players) => ({
  type: actions.SET_PLAYERS,
  payload: {
    players,
  },
});

export const changePlayerState = (playerState) => ({
  type: actions.CHANGE_PLAYER_STATE,
  payload: {
    playerState,
  },
});

export const updatePlayerStatus = (socketId, playerState) => ({
  type: actions.UPDATE_PLAYER_STATUS,
  payload: {
    socketId,
    playerState,
  },
});

export const updateCurrentRoom = (room) => ({
  type: actions.UPDATE_CURRENT_ROOM,
  payload: {
    room,
  },
});

export const updateRoomStatus = (room) => ({
  type: actions.UPDATE_ROOM_STATUS,
  payload: {
    room,
  },
});

export const setRooms = (rooms) => ({
  type: actions.SET_ROOMS,
  payload: {
    rooms,
  },
});

export const setGame = (game) => ({
  type: actions.SET_GAME,
  payload: {
    game,
  },
});
