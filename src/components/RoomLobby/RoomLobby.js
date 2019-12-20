import PropTypes from 'prop-types';

const RoomLobby = ({
  currentRoom, leaveRoom,
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
        <p key={player}>
          {player}
        </p>
      ))}
    </div>
  );
};

RoomLobby.propTypes = {
  currentRoom: PropTypes.shape({
    roomName: PropTypes.string,
    maxPlayers: PropTypes.number,
    gameVersion: PropTypes.string,
    players: PropTypes.arrayOf(
      PropTypes.string,
    ),
  }).isRequired,
  leaveRoom: PropTypes.func.isRequired,
};

export default RoomLobby;
