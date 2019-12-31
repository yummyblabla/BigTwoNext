import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import lobbyListeners from '../socketio/lobbyListeners';
import withRedux from '../redux/redux';
import {
  updateCurrentRoom,
} from '../redux/actionCreators';
import {
  USER_LOBBY_STATE, USER_IN_ROOM_STATE, USER_IN_GAME_STATE,
} from '../../modules/Helpers/Constants';

import CreateRoomModal from '../components/Modals/CreateRoom';
import PlayerList from '../components/Lobby/PlayerList';
import RoomList from '../components/Lobby/RoomList';
import RoomLobby from '../components/RoomLobby/RoomLobby';

/**
 * Lobby Page.
 */
const Lobby = () => {
  function useStateRef(state) {
    const stateRef = useRef(state);
    useEffect(() => {
      stateRef.current = state;
    });
    return stateRef;
  }
  const router = useRouter();
  const dispatch = useDispatch();

  /**
   * States.
   */
  const socket = useSelector((state) => state.socket);
  const username = useSelector((state) => state.username);

  const currentRoom = useSelector((state) => state.room);
  const [createRoomModal, setCreateRoomModal] = useState(false);

  const [players, setPlayers] = useState({});
  const playersRef = useStateRef(players);

  const [rooms, setRooms] = useState({});
  const roomsRef = useStateRef(rooms);

  const [playerState, setPlayerState] = useState(USER_LOBBY_STATE);

  const handleStartGameSuccess = () => {
    router.push('/game');
  };

  const handleStartGame = (roomName) => {
    if (playerState !== USER_IN_ROOM_STATE) {
      return;
    }
    socket.emit('startGame', {
      roomName,
    });
  };

  /**
   * Updates the room in Room List Handler.
   * @param {Object} room new room object.
   */
  const handleUpdateRoomStatus = (room) => {
    const newRooms = { ...roomsRef.current };
    const { roomName } = room;
    newRooms[roomName] = room;
    setRooms(newRooms);
  };

  /**
   * Sets the rooms list in redux state.
   * @param {Object} newRooms room list
   */
  const handleSetRooms = (newRooms) => {
    setRooms(newRooms);
  };

  /**
   * Attempts to leave room Handler.
   * @param {string} roomName name of room
   */
  const handleLeaveRoom = (roomName) => {
    socket.emit('userLeaveRoom', {
      roomName,
    });
  };

  /**
   * Leave Room Success Handler.
   */
  const handleLeaveRoomSuccess = () => {
    setPlayerState(USER_LOBBY_STATE);
    // dispatch(changePlayerState(USER_LOBBY_STATE));
    dispatch(updateCurrentRoom({}));
  };

  /**
   * Attempts to join room Handler.
   * @param {string} roomName name of room
   */
  const handleJoinRoom = (roomName) => {
    if (playerState === USER_IN_ROOM_STATE || playerState === USER_IN_GAME_STATE) {
      return;
    }
    socket.emit('userJoinRoom', {
      roomName,
    });
  };

  /**
   * Updates the current room object Handler.
   * @param {Object} room new room object
   */
  const handleUpdateCurrentRoom = (room) => {
    dispatch(updateCurrentRoom(room));
  };

  /**
   * Join room Success Handler.
   * @param {Object} room room object
   */
  const handleJoinRoomSuccess = (room) => {
    dispatch(updateCurrentRoom(room));
    setPlayerState(USER_IN_ROOM_STATE);
    // dispatch(changePlayerState(USER_IN_ROOM_STATE));
  };

  /**
   * Updates player status Handler.
   * @param {string} socketId socket id of user.
   * @param {string} state state of the user.
   */
  const handleUpdatePlayerState = (socketId, $playerState) => {
    const newPlayers = { ...playersRef.current };
    newPlayers[socketId].state = $playerState;
    setPlayers(newPlayers);
  };

  /**
   * Sets list of players in redux state Handler.
   * @param {Object[]} newPlayers list of players logged in
   */
  const handleSetPlayers = (newPlayers) => {
    setPlayers(newPlayers);
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
    if (playerState === USER_IN_ROOM_STATE || playerState === USER_IN_GAME_STATE) {
      return;
    }
    setCreateRoomModal(true);
  };

  /**
   * Create Room via Socket Emit Handler.
   * @param {Object} roomDetails room information
   */
  const handleCreateRoom = (roomDetails) => {
    if (playerState === USER_IN_ROOM_STATE || playerState === USER_IN_GAME_STATE) {
      return;
    }
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
    handleSetPlayers,
    handleSetRooms,
    handleCreateRoomSuccess,
    handleUpdatePlayerState,
    handleJoinRoomSuccess,
    handleLeaveRoomSuccess,
    handleUpdateRoomStatus,
    handleUpdateCurrentRoom,
    handleStartGameSuccess,
  };

  useEffect(() => {
    if (socket === null) {
      router.push('/');
    } else {
      lobbyListeners(socket, fn);
      socket.emit('userJoinLobby', {
        username,
      });
    }

    return function cleanup() {
      // remove socket on listeners
    };
  }, []);

  return (
    <div className="container">
      <p>Lobby</p>
      <span>{username}</span>

      <div className="buttonContainer">
        <button type="button" onClick={disconnect}>Disconnect</button>
        <button type="button" onClick={handleOpenCreateRoomModal}>Create room</button>
      </div>

      <div className="mainContainer">
        <PlayerList players={players} />
        <RoomList
          rooms={rooms}
          joinRoom={handleJoinRoom}
        />
      </div>

      <CreateRoomModal
        createRoom={handleCreateRoom}
        modalOpen={createRoomModal}
        onClose={handleCloseCreateRoomModal}
      />

      {playerState === USER_IN_ROOM_STATE && (
        <RoomLobby
          currentRoom={currentRoom}
          leaveRoom={handleLeaveRoom}
          startGame={handleStartGame}
          username={username}
        />
      )}
      <style jsx>
        {`
          .container {
            display: flex;
            flex-direction: column;
          }
          .buttonContainer {
            display: flex;
          }
          .mainContainer {
            display: flex;
          }
          p {
            font-size: 2rem;
          }
        `}
      </style>
    </div>
  );
};

export default withRedux(Lobby);
