import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';

import lobbyListeners from '../socketio/lobbyListeners';
import withRedux from '../redux/redux';

import CreateRoomModal from '../components/Modals/CreateRoom';

let socket = null;

const Lobby = () => {
  const username = useSelector((state) => state.username);

  const [players, setPlayers] = useState([]);
  const [rooms, setRooms] = useState([]);

  const fn = {
    setPlayers,
    setRooms,
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

  return (
    <div>
      <h1>Lobby</h1>
      <Link href="/">
        <a>To Index</a>
      </Link>
      <CreateRoomModal
        createRoom={createRoom}
      />
      
      <button onClick={createRoom}>Create room</button>
      <button onClick={disconnect}>Disconnect</button>
      <h3>Rooms</h3>
      {Object.keys(rooms).map((room) => {
        return (
          <div>
            {rooms[room].roomName}
          </div>
        );
      })}
      <h3>Players</h3>
      {Object.keys(players).map((player) => {
        return (
          <div key={players[player].id}>
            {players[player].username}
          </div>
        );
      })}
    </div>
  );
};

export default withRedux(Lobby);
