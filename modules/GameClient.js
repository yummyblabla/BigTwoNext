class GameClient {
  constructor(roomName, players) {
    this.roomName = roomName;
    this.players = players;
    this.started = false;
  }

  startGame() {
    this.started = true;
  }

  getNumberOfPlayers() {
    return this.players.length;
  }

  getPlayers() {
    return this.players;
  }
}

export default GameClient;
