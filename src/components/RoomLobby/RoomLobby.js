import PropTypes from 'prop-types';

const RoomLobby = ({
  currentRoom, leaveRoom, startGame,
}) => {
  const {
    roomName, maxPlayers, gameVersion, players,
  } = currentRoom;
  return (
    <div>
      <h1>Room Lobby</h1>
      <button type="button" onClick={() => leaveRoom(roomName)}>Leave</button>
      <p>{roomName}</p>
      <p>{maxPlayers}</p>
      <p>{gameVersion}</p>
      {players.map((player) => (
        <p key={player.username}>
          {player.username}
        </p>
      ))}
      <button type="button" onClick={() => startGame(roomName)}>Start Game</button>
    </div>
  );
};

RoomLobby.propTypes = {
  currentRoom: PropTypes.shape({
    roomName: PropTypes.string,
    maxPlayers: PropTypes.number,
    gameVersion: PropTypes.string,
    players: PropTypes.arrayOf(
      PropTypes.shape({}),
    ),
  }).isRequired,
  leaveRoom: PropTypes.func.isRequired,
  startGame: PropTypes.func.isRequired,
};

export default RoomLobby;
