class GameClient {
  constructor(roomName, players, gameVersion) {
    this.roomName = roomName;
    this.players = players;
    this.started = false;
    this.gameVersion = gameVersion;
    this.playerTurn = -1;
    this.opponents = [];
  }

  findOpponent(username) {
    return this.opponents.find((opponent) => opponent.getUsername() === username);
  }

  addOpponents(opponents) {
    this.opponents = opponents;
  }

  getGameVersion() {
    return this.gameVersion;
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

  setPlayerTurn(index) {
    this.playerTurn = index;
  }

  goToNextTurn() {
    if (this.playerTurn === this.players.length - 1) {
      this.playerTurn = 0;
    } else {
      this.playerTurn += 1;
    }
    return this.playerTurn;
  }

  getPlayerTurn() {
    return this.playerTurn;
  }
}

export default GameClient;
