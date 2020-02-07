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
  const playerHolders = [...Array(maxPlayers).keys()];

  return (
    <div className="background-dark-four color-dark-one border-radius-20 padding-20 padding-left-30 roomLobby">
      <p className="font-size-2rem">{`Room Name: ${roomName}`}</p>
      {playerHolders.map((holder) => (
        <div key={holder} className="margin-bottom-5 margin-top-5">
          <span>{`${holder + 1}.`}</span>
          {players[holder] && (
            <span className="padding-left-10">{players[holder].username}</span>
          )}
        </div>
      ))}
      <p>{`Game Version: ${gameVersion}`}</p>
      <div>
        <button type="button" onClick={() => leaveRoom(roomName)} className="leaveButton">Leave</button>
        {hostName === username && (<button type="button" onClick={() => startGame(roomName)} className="startButton">Start Game</button>)}
      </div>

      <style jsx>
        {`
          .roomLobby {
            height: 400px;
          }
          .leaveButton {

          }
          .startButton {
            
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
      PropTypes.shape({
        username: PropTypes.string,
      }),
    ),
    hostName: PropTypes.string,
  }).isRequired,
  username: PropTypes.string.isRequired,
  leaveRoom: PropTypes.func.isRequired,
  startGame: PropTypes.func.isRequired,
  inRoomLobby: PropTypes.bool.isRequired,
  setModalOpen: PropTypes.func.isRequired,
};

export default LargeModalHOC(RoomLobby);
