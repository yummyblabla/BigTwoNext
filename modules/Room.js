class Room {
  constructor(roomName, maxPlayers, gameVersion, playerHostObject) {
    this.roomName = roomName;
    this.maxPlayers = maxPlayers;
    this.gameVersion = gameVersion;
    this.hostName = playerHostObject.username;
    this.players = [playerHostObject];
    this.started = false;
  }

  checkIfFull() {
    return this.players.length >= this.maxPlayers;
  }

  checkIfStarted() {
    return this.started;
  }

  checkIfEmpty() {
    return this.players.length === 0;
  }

  checkCanStart() {
    return this.players.length >= 2;
  }

  addPlayer(playerObject) {
    if (this.checkIfFull()) {
      return;
    }
    this.players.push(playerObject);
  }

  removePlayer(playerObject) {
    const { socketId } = playerObject;
    const index = this.players.findIndex((player) => player.socketId === socketId);
    this.players.splice(index, 1);
  }

  getPlayers() {
    return this.players;
  }

  getVersion() {
    return this.gameVersion;
  }

  startGame() {
    this.started = true;
  }
}

export default Room;
