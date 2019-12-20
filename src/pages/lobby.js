import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import lobbyListeners from '../socketio/lobbyListeners';
import withRedux from '../redux/redux';
import {
  setPlayers, updatePlayerStatus, changePlayerState, updateCurrentRoom, setRooms, updateRoomStatus,
} from '../redux/actionCreators';
import {
  USER_LOBBY_STATE, USER_IN_ROOM_STATE,
} from '../../modules/Helpers/Constants';

import CreateRoomModal from '../components/Modals/CreateRoom';
import PlayerList from '../components/Lobby/PlayerList';
import RoomList from '../components/Lobby/RoomList';
import RoomLobby from '../components/RoomLobby/RoomLobby';


let socket = null;

/**
 * Lobby Page.
 */
const Lobby = () => {
  const router = useRouter();
  const dispatch = useDispatch();


  /**
   * States.
   */
  const username = useSelector((state) => state.username);
  const playerState = useSelector((state) => state.playerState);
  const players = useSelector((state) => state.players);
  const currentRoom = useSelector((state) => state.room);
  const rooms = useSelector((state) => state.rooms);
  const [createRoomModal, setCreateRoomModal] = useState(false);


  const handleUpdateRoomStatus = (room) => {
    dispatch(updateRoomStatus(room));
  };

  const handleSetRooms = (newRooms) => {
    dispatch(setRooms(newRooms));
  };

  const handleLeaveRoom = (roomName) => {
    socket.emit('userLeaveRoom', {
      roomName,
    });
  };

  const handleLeaveRoomSuccess = () => {
    dispatch(changePlayerState(USER_LOBBY_STATE));
    dispatch(updateCurrentRoom({}));
  };

  /**
   * Attempts to join room Handler.
   * @param {string} roomName name of room
   */
  const handleJoinRoom = (roomName) => {
    socket.emit('userJoinRoom', {
      roomName,
    });
  };

  /**
   * Join room Success Handler.
   * @param {Object} room room object
   */
  const handleJoinRoomSuccess = (room) => {
    dispatch(updateCurrentRoom(room));
    dispatch(changePlayerState(USER_IN_ROOM_STATE));
  };

  /**
   * Updates player status Handler.
   * @param {string} socketId socket id of user.
   * @param {string} state state of the user.
   */
  const handleUpdatePlayerState = (socketId, state) => {
    dispatch(updatePlayerStatus(socketId, state));
  };

  /**
   * Sets list of players in redux state Handler.
   * @param {Object[]} newPlayers list of players logged in
   */
  const handleSetPlayers = (newPlayers) => {
    dispatch(setPlayers(newPlayers));
  };

  /**
   * Create Room Success Handler.
   */
  const handleCreateRoomSuccess = () => {
    setCreateRoomModal(false);
  };

  /**
   * Close Create Room Modal Handler.
   */
  const handleCloseCreateRoomModal = () => {
    setCreateRoomModal(false);
  };

  /**
   * Open Create Room Modal Handler.
   */
  const handleOpenCreateRoomModal = () => {
    setCreateRoomModal(true);
  };

  /**
   * Create Room via Socket Emit Handler.
   * @param {Object} roomDetails room information
   */
  const handleCreateRoom = (roomDetails) => {
    socket.emit('userCreateRoom', roomDetails);
  };

  /**
   * Disconnects user from user and redirect to Index.
   */
  const disconnect = () => {
    socket.disconnect();
    router.push('/');
  };

  const fn = {
    players,
    handleSetPlayers,
    handleSetRooms,
    handleCreateRoomSuccess,
    handleUpdatePlayerState,
    handleJoinRoomSuccess,
    handleLeaveRoomSuccess,
    handleUpdateRoomStatus,
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

  return (
    <div>
      <h1>Lobby</h1>

      <button type="button" onClick={disconnect}>Disconnect</button>
      <button type="button" onClick={handleOpenCreateRoomModal}>Create room</button>

      <RoomList
        rooms={rooms}
        joinRoom={handleJoinRoom}
      />
      <PlayerList players={players} />

      <CreateRoomModal
        createRoom={handleCreateRoom}
        modalOpen={createRoomModal}
        onClose={handleCloseCreateRoomModal}
      />

      {playerState === USER_IN_ROOM_STATE && (
        <RoomLobby
          currentRoom={currentRoom}
          leaveRoom={handleLeaveRoom}
        />
      )}
    </div>
  );
};

export default withRedux(Lobby);
