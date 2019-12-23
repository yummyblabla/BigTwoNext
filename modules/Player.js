import {
  USER_LOBBY_STATE, USER_IN_ROOM_STATE, USER_IN_GAME_STATE,
} from './Helpers/Constants';

class PlayerLobby {
  constructor(username, socketId) {
    this.username = username;
    this.socketId = socketId;
    this.state = USER_LOBBY_STATE;
    this.currentRoom = null;
  }

  getState() {
    return this.state;
  }

  getRoom() {
    return this.currentRoom;
  }

  leaveRoom() {
    this.state = USER_LOBBY_STATE;
    this.currentRoom = null;
  }

  startedGame() {
    if (this.state === USER_IN_ROOM_STATE) {
      this.state = USER_IN_GAME_STATE;
    }
  }

  checkIfInRoom() {
    return (this.state === USER_IN_ROOM_STATE || this.state === USER_IN_GAME_STATE)
      && this.currentRoom !== null;
  }

  joinRoom(roomName) {
    this.state = USER_IN_ROOM_STATE;
    this.currentRoom = roomName;
  }
}

export default PlayerLobby;
