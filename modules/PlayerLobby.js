import {
  USER_LOBBY_STATE, USER_IN_ROOM_STATE, USER_IN_GAME_STATE,
} from './Helpers/Constants';

class PlayerLobby {
  constructor(username, socketId) {
    this.username = username;
    this.socketId = socketId;
    this.state = USER_LOBBY_STATE;
  }

  joinRoom() {
    this.state = USER_IN_ROOM_STATE;
  }

  startedGame() {
    this.state = USER_IN_GAME_STATE;
  }
}

export default PlayerLobby;
