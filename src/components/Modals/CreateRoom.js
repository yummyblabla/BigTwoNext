import { useState } from 'react';
import PropTypes from 'prop-types';

const CreateRoom = ({
  createRoom,
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
    <div>
      Something
      <button onClick={handleClickRoom}>CreateRoom</button>
      <style jsx>
        {`
          div {
            background-color: pink;
          }
        `}
      </style>
    </div>
  );
};

CreateRoom.propTypes = {
  createRoom: PropTypes.func.isRequired,
};

export default CreateRoom;
