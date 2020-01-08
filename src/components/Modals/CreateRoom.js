import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { NUMBER_OF_PLAYERS, GAME_VERSIONS, CHINESE_VERSION } from '../../../server/modules/Helpers/Constants';
import LargeModalHOC from '../HOC/LargeModalHOC';

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
    <div className="content">
      <h1>Create Room</h1>
      <button className="closeButton" type="button" onClick={() => setCreateRoomModal(false)}>Close</button>
      {/* <button type="button" onClick={resetRoomState}>Set Defaults</button> */}
      <form>
        <label htmlFor="roomName">
          <span className="labelTitle">Room Name</span>
          <input value={roomName} onChange={(e) => setRoomName(e.target.value)} />
        </label>
        <label htmlFor="maxPlayers">
          <span className="labelTitle">Number of Players:</span>
          <select value={maxPlayers} onChange={(e) => setMaxPlayers(e.target.value)}>
            {NUMBER_OF_PLAYERS.map((num) => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </label>
        <label htmlFor="bigTwoVersion">
          <span className="labelTitle">Version:</span>
          <select value={gameVersion} onChange={(e) => setGameVersion(e.target.value)}>
            {GAME_VERSIONS.map((version) => (
              <option key={version} value={version}>{version}</option>
            ))}
          </select>
        </label>
        <input className={`submitButton ${roomName.length > 0 && roomName.length < 8 ? 'valid' : 'invalid'}`} type="submit" value="Create" onClick={handleClickRoom} />
      </form>
      <style jsx>
        {`
          .content {
            padding: 20px 30px;
          }
          label {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            margin-bottom: 20px;
          }
          .labelTitle {
            margin-bottom: 10px;
          }
          .closeButton {
            position: absolute;
            z-index: 1;
            top: 10px;
            right: 20px;
            border: 1px solid black;
            padding: 0px 10px 5px 10px;
            font-size: 1.3rem;
          }
          .submitButton {
            cursor: pointer;
            background-color: #20d420;
            border: 0;
            border-radius: 10px;
            padding: 10px;
            width: 100px;
            font-size: 1.2rem;
          }

          .valid {
            background-color: #20d420;
            cursor: pointer;
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
};

export default LargeModalHOC(CreateRoom);
