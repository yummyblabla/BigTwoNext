import { useState } from 'react';
import PropTypes from 'prop-types';

const CreateRoom = ({
  createRoom,
  modalOpen,
}) => {
  const [roomName, setRoomName] = useState('');
  const [numberOfPlayers, setNumberOfPlayers] = useState(2);
  const [gameVersion, setGameVersion] = useState('Chin');

  const handleClickRoom = () => {
    createRoom({
      roomName,
      numberOfPlayers,
      gameVersion,
    });
  };

  return (
    <div className={`modal ${modalOpen ? 'modal-open' : ''}`}>
      <div className="modal-content">
        Something
        <button onClick={handleClickRoom}>CreateRoom</button>
      </div>

      <style jsx>
        {`
          .modal {
            display: none; /* Hidden by default */
            position: fixed; /* Stay in place */
            z-index: 1; /* Sit on top */
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
          }
        `}
      </style>
    </div>
  );
};

CreateRoom.propTypes = {
  createRoom: PropTypes.func.isRequired,
  modalOpen: PropTypes.func.isRequired,
};

export default CreateRoom;
