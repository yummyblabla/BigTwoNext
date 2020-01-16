import { useEffect } from 'react';
import PropTypes from 'prop-types';

import LargeModalHOC from '../HOC/LargeModalHOC';


const RoomLobby = ({
  currentRoom, leaveRoom, startGame, username, inRoomLobby, setModalOpen,
}) => {
  useEffect(() => {
    setModalOpen(inRoomLobby);
  }, [inRoomLobby]);

  if (!Object.keys(currentRoom).length) {
    return (
      <div />
    );
  }
  const {
    roomName, maxPlayers, gameVersion, players, hostName,
  } = currentRoom;
  console.log(currentRoom);
  return (
    <div className="roomLobby">
      <h1>Room Lobby</h1>
      <p>{`Room Name: ${roomName}`}</p>
      <p>{maxPlayers}</p>
      <p>{`Game Version: ${gameVersion}`}</p>
      {players.map((player) => (
        <p key={player.username}>
          {player.username}
        </p>
      ))}
      <div>
        <button type="button" onClick={() => leaveRoom(roomName)}>Leave</button>
        {hostName === username && (<button type="button" onClick={() => startGame(roomName)}>Start Game</button>)}
      </div>

      <style jsx>
        {`
          .roomLobby {
            border: 1px solid black;
            max-width: 600px;
            margin-top: 30px;
          }
        `}
      </style>
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
    hostName: PropTypes.string,
  }).isRequired,
  username: PropTypes.string.isRequired,
  leaveRoom: PropTypes.func.isRequired,
  startGame: PropTypes.func.isRequired,
};

export default LargeModalHOC(RoomLobby);
