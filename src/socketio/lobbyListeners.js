export default function lobbyListeners(socket, fn) {
  /**
   * Gets room list from socket.
   */
  socket.on('getRoomList', ({ rooms }) => {
    fn.handleSetRooms(rooms);
  });

  /**
   * Gets lobby (player) list from socket.
   */
  socket.on('getLobbyList', ({ clients }) => {
    fn.handleSetPlayers({ ...clients });
  });

  /**
   * Updates player status in lobby list.
   */
  socket.on('updatePlayerStatus', ({ socketId, state }) => {
    fn.handleUpdatePlayerState(socketId, state);
  });

  /**
   * Error handler for duplicate room name.
   */
  socket.on('duplicateRoomExists', ({ message }) => {
    alert(message);
  });

  /**
   * Success handler for room creation.
   */
  socket.on('createRoomSuccess', () => {
    fn.handleCreateRoomSuccess();
  });

  /**
   * Error handler for join room error.
   */
  socket.on('joinRoomError', ({ message }) => {
    alert(message);
  });

  socket.on('joinRoomSuccess', ({ room }) => {
    fn.handleJoinRoomSuccess(room);
  });

  socket.on('leaveRoomSuccess', () => {
    fn.handleLeaveRoomSuccess();
  });

  socket.on('updateRoomStatus', ({ room }) => {
    fn.handleUpdateRoomStatus(room);
  });

  socket.on('updateCurrentRoom', ({ room }) => {
    fn.handleUpdateCurrentRoom(room);
  });

  socket.on('startGameSuccess', ({}) => {
    fn.handleStartGameSuccess();
  });

  socket.on('startGameError', ({ message }) => {
    alert(message);
  })
}
