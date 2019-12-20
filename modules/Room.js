class Room {
  constructor(roomName, maxPlayers, gameVersion, hostName) {
    this.roomName = roomName;
    this.maxPlayers = maxPlayers;
    this.gameVersion = gameVersion;
    this.hostName = hostName;
    this.players = [hostName];
    this.started = false;
  }

  checkIfFull() {
    return this.players.length >= this.maxPlayers;
  }

  checkIfStarted() {
    return this.started;
  }

  addPlayer(playerName) {
    this.players.push(playerName);
  }
}

export default Room;
