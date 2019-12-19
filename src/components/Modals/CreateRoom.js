import { useState } from 'react';
import PropTypes from 'prop-types';

import { NUMBER_OF_PLAYERS, GAME_VERSIONS, CHINESE_VERSION } from '../../../modules/Helpers/Constants';

const CreateRoom = ({
  createRoom,
  modalOpen,
  onClose,
}) => {
  const [roomName, setRoomName] = useState('');
  const [numberOfPlayers, setNumberOfPlayers] = useState(2);
  const [gameVersion, setGameVersion] = useState(CHINESE_VERSION);

  const resetRoomState = () => {
    setRoomName('');
    setNumberOfPlayers(2);
    setGameVersion(CHINESE_VERSION);
  };

  const handleClickRoom = (e) => {
    e.preventDefault();
    createRoom({
      roomName,
      numberOfPlayers,
      gameVersion,
    });
  };

  return (
    <div className={`modal ${modalOpen ? 'modal-open' : ''}`}>
      <div className="modal-content">
        <button onClick={onClose}>Close</button>
        <button onClick={resetRoomState}>Reset</button>
        Create Room
        <form>
          <label htmlFor="roomName">
            Room Name:
            <input value={roomName} onChange={(e) => setRoomName(e.target.value)} />
          </label>
          <br />
          <label htmlFor="numberOfPlayers">
            Number of Players:
            <select value={numberOfPlayers} onChange={(e) => setNumberOfPlayers(e.target.value)}>
              {NUMBER_OF_PLAYERS.map((num) => (
                <option value={num}>{num}</option>
              ))}
            </select>
          </label>
          <label htmlFor="bigTwoVersion">
            Version:
            <select value={gameVersion} onChange={(e) => setGameVersion(e.target.value)}>
              {GAME_VERSIONS.map((version) => (
                <option value={version}>{version}</option>
              ))}
            </select>
          </label>
          <br />
          <input type="submit" value="Submit" onClick={handleClickRoom} />
        </form>
      </div>

      <style jsx>
        {`
          .modal {
            display: none; /* Hidden by default */
            position: fixed; /* Stay in place */
            left: 0;
            top: 0;
            width: 100%; /* Full width */
            height: 100%; /* Full height */
            overflow: auto; /* Enable scroll if needed */
            background-color: rgb(0,0,0); /* Fallback color */
            background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
          }
          .modal-open {
            display: block;
          }
          .modal-content {
            background-color: #fefefe;
            margin: 15% auto; /* 15% from the top and centered */
            padding: 20px;
            border: 1px solid #888;
            width: 80%; /* Could be more or less, depending on screen size */
            z-index: 10;
          }
        `}
      </style>
    </div>
  );
};

CreateRoom.propTypes = {
  createRoom: PropTypes.func.isRequired,
  modalOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CreateRoom;
