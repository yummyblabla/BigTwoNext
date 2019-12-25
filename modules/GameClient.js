class GameClient {
  constructor(roomName, players) {
    this.roomName = roomName;
    this.players = players;
    this.started = false;
  }

  startGame() {
    this.started = true;
  }
}

export default GameClient;
