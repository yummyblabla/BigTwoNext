import * as actions from '../actions';

export const setSocket = (socket) => ({
  type: actions.SET_SOCKET,
  payload: {
    socket,
  },
});

export const setUsername = (username) => ({
  type: actions.SET_USERNAME,
  payload: {
    username,
  },
});

export const updateCurrentRoom = (room) => ({
  type: actions.UPDATE_CURRENT_ROOM,
  payload: {
    room,
  },
});
