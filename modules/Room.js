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
    this.players.push(playerObject);
  }

  removePlayer(playerObject) {
    const { socketId } = playerObject;
    const index = this.players.findIndex((player) => player.socketId === socketId);
    this.players.splice(index, 1);
  }
}

export default Room;
