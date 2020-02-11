import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { NUMBER_OF_PLAYERS, GAME_VERSIONS, CHINESE_VERSION } from '../../../socketio/modules/Helpers/Constants';
import LargeModalHOC from '../HOC/LargeModalHOC';

import variables from '../../styles.scss';

const CreateRoom = ({
  setModalOpen,
  createRoom,
  createRoomModal,
  setCreateRoomModal,
}) => {
  useEffect(() => {
    setModalOpen(createRoomModal);
  }, [createRoomModal]);

  const [roomName, setRoomName] = useState('');
  const [maxPlayers, setMaxPlayers] = useState(4);
  const [gameVersion, setGameVersion] = useState(CHINESE_VERSION);

  // const resetRoomState = () => {
  //   setRoomName('');
  //   setMaxPlayers(4);
  //   setGameVersion(CHINESE_VERSION);
  // };

  const handleClickRoom = (e) => {
    e.preventDefault();
    createRoom({
      roomName,
      maxPlayers,
      gameVersion,
    });
  };

  return (
    <div className="padding-20 padding-left-30 background-dark-four color-dark-one border-radius-20">
      <p className="font-size-2rem">Create Room</p>
      <button className="closeButton" type="button" onClick={() => setCreateRoomModal(false)}>Close</button>
      {/* <button type="button" onClick={resetRoomState}>Set Defaults</button> */}
      <form>
        <label htmlFor="roomName">
          <span className="margin-bottom-10">Room Name</span>
          <input value={roomName} onChange={(e) => setRoomName(e.target.value)} />
        </label>
        <label htmlFor="maxPlayers">
          <span className="margin-bottom-10">Number of Players:</span>
          <select value={maxPlayers} onChange={(e) => setMaxPlayers(e.target.value)}>
            {NUMBER_OF_PLAYERS.map((num) => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </label>
        <label htmlFor="bigTwoVersion">
          <span className="margin-bottom-10">Version:</span>
          <select value={gameVersion} onChange={(e) => setGameVersion(e.target.value)}>
            {GAME_VERSIONS.map((version) => (
              <option key={version} value={version}>{version}</option>
            ))}
          </select>
        </label>
        <input
          className={`button padding-10 border-radius-10 submitButton ${roomName.length > 0 && roomName.length < 8 ? '' : 'invalid'}`}
          type="submit"
          value="Create"
          onClick={handleClickRoom}
        />
      </form>
      <style jsx>
        {`
          label {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            margin-bottom: 20px;
          }
          .closeButton {
            position: absolute;
            z-index: 1;
            top: 10px;
            right: 20px;
            border: 1px solid black;
            padding: 0px 10px 5px 10px;
            font-size: 1.3rem;
            border-radius: 20px;
          }
          .submitButton {
            background-color: ${variables.green_color};
            width: 100px;
            font-size: 1.2rem;
          }

          .invalid {
            background-color: red;
          }
        `}
      </style>
    </div>
  );
};

CreateRoom.propTypes = {
  createRoom: PropTypes.func.isRequired,
  setModalOpen: PropTypes.func.isRequired,
  createRoomModal: PropTypes.bool.isRequired,
  setCreateRoomModal: PropTypes.func.isRequired,
};

export default LargeModalHOC(CreateRoom);
