import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import * as actions from './actions';

const initialState = {
  username: 'Guest',
  room: {},
  socket: null,
};

const setSocket = (state, { socket }) => {
  return {
    ...state,
    socket,
  };
};

const setUsername = (state, { username }) => ({
  ...state,
  username,
});

const updateCurrentRoom = (state, { room }) => ({
  ...state,
  room,
});

const actionHandlers = {
  [actions.SET_SOCKET]: setSocket,
  [actions.SET_USERNAME]: setUsername,
  [actions.UPDATE_CURRENT_ROOM]: updateCurrentRoom,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  const actionHandler = actionHandlers[type];
  if (actionHandler) {
    return actionHandler(state, payload);
  }
  return state;
};

const initializeStore = (preloadedState = initialState) => createStore(
  reducer,
  preloadedState,
  composeWithDevTools(applyMiddleware()),
);

export default initializeStore;
