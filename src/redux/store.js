import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import * as actions from './actions';

import {
  USER_LOBBY_STATE,
} from '../../modules/Helpers/Constants';

const initialState = {
  username: 'Guest',
  playerState: USER_LOBBY_STATE,
  room: {},
};

const setSocket = (state, { socket, fn, lobbyListeners }) => {
  lobbyListeners(socket, fn);
  socket.emit('userJoinLobby', {
    username: state.username,
  });
  return {
    ...state,
    socket,
  };
};

const setUsername = (state, { username }) => ({
  ...state,
  username,
});

const setPlayers = (state, { players }) => ({
  ...state,
  players,
});

const changePlayerState = (state, { playerState }) => ({
  ...state,
  playerState,
});


const updateCurrentRoom = (state, { room }) => ({
  ...state,
  room,
});

const actionHandlers = {
  [actions.SET_SOCKET]: setSocket,
  [actions.SET_USERNAME]: setUsername,
  [actions.SET_PLAYERS]: setPlayers,
  [actions.CHANGE_PLAYER_STATE]: changePlayerState,
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
