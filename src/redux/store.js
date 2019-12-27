import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import * as actions from './actions';

import {
  USER_LOBBY_STATE,
} from '../../modules/Helpers/Constants';
import GameClient from '../../modules/GameClient';

const initialState = {
  username: 'Guest',
  playerState: USER_LOBBY_STATE,
  players: {},
  rooms: {},
  room: {},
  game: null,
  cards: [],
};

const setCards = (state, { cards }) => {
  return {
    ...state,
    cards,
  };
};

const startGame = (state) => {
  state.game.startGame();
  return {
    ...state,
    game: state.game,
  };
};

const setGame = (state, { roomName, players }) => {
  return {
    ...state,
    game: new GameClient(roomName, players),
  };
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

const updatePlayerStatus = (state, { socketId, playerState }) => {
  const newPlayers = { ...state.players };
  newPlayers[socketId].state = playerState;
  return {
    ...state,
    players: newPlayers,
  };
};

const updateCurrentRoom = (state, { room }) => ({
  ...state,
  room,
});

const updateRoomStatus = (state, { room }) => {
  const newRooms = { ...state.rooms };
  const { roomName } = room;
  newRooms[roomName] = room;
  return {
    ...state,
    rooms: newRooms,
  };
};

const setRooms = (state, { rooms }) => ({
  ...state,
  rooms,
});

const actionHandlers = {
  [actions.SET_SOCKET]: setSocket,
  [actions.SET_USERNAME]: setUsername,
  [actions.SET_PLAYERS]: setPlayers,
  [actions.CHANGE_PLAYER_STATE]: changePlayerState,
  [actions.UPDATE_PLAYER_STATUS]: updatePlayerStatus,
  [actions.UPDATE_CURRENT_ROOM]: updateCurrentRoom,
  [actions.UPDATE_ROOM_STATUS]: updateRoomStatus,
  [actions.SET_ROOMS]: setRooms,
  [actions.SET_GAME]: setGame,
  [actions.START_GAME]: startGame,
  [actions.SET_CARDS]: setCards,
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
