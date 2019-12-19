import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';

import lobbyListeners from '../socketio/lobbyListeners';
import withRedux from '../redux/redux';

import CreateRoomModal from '../components/Modals/CreateRoom';
import PlayerList from '../components/Lobby/PlayerList';
import RoomList from '../components/Lobby/RoomList';

let socket = null;

const Lobby = () => {
  const username = useSelector((state) => state.username);

  const [players, setPlayers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [openCreateRoomModal, setOpenCreateRoomModal] = useState(false);

  const handleCreateRoomSuccess = () => {
    setOpenCreateRoomModal(false);
  };

  const fn = {
    setPlayers,
    setRooms,
    handleCreateRoomSuccess,
  };

  useEffect(() => {
    socket = io('/lobby');
    socket.emit('userJoinLobby', {
      username,
    });

    lobbyListeners(socket, fn);

    return function cleanup() {
      socket.disconnect();
    };
  }, []);

  const disconnect = () => {
    console.log('trigger disc');
    socket.disconnect();
  };

  const createRoom = (roomDetails) => {
    socket.emit('userCreateRoom', roomDetails);
  };

  const handleOpenCreateRoomModal = () => {
    setOpenCreateRoomModal(!openCreateRoomModal);
  };

  return (
    <div>
      <h1>Lobby</h1>
      <Link href="/">
        <a>To Index</a>
      </Link>
      <button onClick={disconnect}>Disconnect</button>
      <button onClick={handleOpenCreateRoomModal}>Create room</button>

      <RoomList rooms={rooms} />
      <PlayerList players={players} />


      <CreateRoomModal
        createRoom={createRoom}
        modalOpen={openCreateRoomModal}
        onClose={handleOpenCreateRoomModal}
      />

    </div>
  );
};

export default withRedux(Lobby);
