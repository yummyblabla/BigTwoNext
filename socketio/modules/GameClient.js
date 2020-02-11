class GameClient {
  constructor(roomName, players, gameVersion) {
    this.roomName = roomName;
    this.players = players;
    this.started = false;
    this.gameVersion = gameVersion;
    this.playerTurn = null;
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

  setPlayerTurn(username) {
    this.playerTurn = username;
  }

  getPlayerTurn() {
    return this.playerTurn;
  }
}

export default GameClient;
