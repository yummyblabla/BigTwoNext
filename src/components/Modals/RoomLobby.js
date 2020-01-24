import { useEffect } from 'react';
import PropTypes from 'prop-types';

import LargeModalHOC from '../HOC/LargeModalHOC';

import * as Color from '../../constants/colors';


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
    <div className="roomLobby">
      <h3>{`Room Name: ${roomName}`}</h3>
      {playerHolders.map((holder) => (
        <div key={holder} className="holder">
          <span>{`${holder + 1}.`}</span>
          {players[holder] && (
            <span className="playerName">{players[holder].username}</span>
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
            padding: 20px 30px;
            border: 1px solid black;
            margin-top: 30px;
            height: 400px;
            background-color: ${Color.DARK_FOUR};
            color: ${Color.DARK_ONE};
            border-radius: 20px;
          }
          .holder {
            margin: 5px 0px;
          }
          .playerName {
            margin-left: 10px;
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
