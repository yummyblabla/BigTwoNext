import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import withRedux from '../redux/redux';
import {
  updateCurrentRoom,
} from '../redux/actionCreators';
import {
  USER_LOBBY_STATE, USER_IN_ROOM_STATE, USER_IN_GAME_STATE,
} from '../../server/modules/Helpers/Constants';
import withStateRef from '../components/HOC/withStateRef';

import CreateRoomModal from '../components/Modals/CreateRoom';
import LobbyErrorModal from '../components/Modals/LobbyErrorModal';
import PlayerList from '../components/Lobby/PlayerList';
import RoomList from '../components/Lobby/RoomList';
import RoomLobby from '../components/RoomLobby/RoomLobby';

/**
 * Lobby Page.
 */
const Lobby = ({ useStateRef }) => {
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

  const [errorMessage, setErrorMessage] = useState('');
  const [errorModal, setErrorModal] = useState(false);

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
  const handleUpdateRoomStatus = ({ room }) => {
    const newRooms = { ...roomsRef.current };
    const { roomName } = room;
    newRooms[roomName] = room;
    setRooms(newRooms);
  };

  /**
   * Sets the rooms list in redux state.
   * @param {Object} newRooms room list
   */
  const handleSetRooms = ({ rooms: newRooms }) => {
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
  const handleUpdateCurrentRoom = ({ room }) => {
    dispatch(updateCurrentRoom(room));
  };

  /**
   * Join room Success Handler.
   * @param {Object} room room object
   */
  const handleJoinRoomSuccess = ({ room }) => {
    setCreateRoomModal(false);
    dispatch(updateCurrentRoom(room));
    setPlayerState(USER_IN_ROOM_STATE);
  };

  /**
   * Updates player status Handler.
   * @param {string} socketId socket id of user.
   * @param {string} state state of the user.
   */
  const handleUpdatePlayerState = ({ socketId, state }) => {
    const newPlayers = { ...playersRef.current };
    newPlayers[socketId].state = state;
    setPlayers(newPlayers);
  };

  /**
   * Sets list of players in redux state Handler.
   * @param {Object[]} newPlayers list of players logged in
   */
  const handleSetPlayers = ({ clients }) => {
    const newPlayers = { ...clients };
    setPlayers(newPlayers);
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

  const handleLobbyError = ({ message }) => {
    setErrorMessage(message);
    setErrorModal(true);
  }

  /**
   * Disconnects user from user and redirect to Index.
   */
  const disconnect = () => {
    socket.disconnect();
    router.push('/');
  };

  useEffect(() => {
    if (socket === null) {
      router.push('/');
    } else {
      socket.on('getLobbyList', handleSetPlayers);
      socket.on('getRoomList', handleSetRooms);
      socket.on('updatePlayerStatus', handleUpdatePlayerState);
      socket.on('lobbyError', handleLobbyError);
      socket.on('joinRoomSuccess', handleJoinRoomSuccess);
      socket.on('leaveRoomSuccess', handleLeaveRoomSuccess);
      socket.on('updateRoomStatus', handleUpdateRoomStatus);
      socket.on('updateCurrentRoom', handleUpdateCurrentRoom);
      socket.on('startGameSuccess', handleStartGameSuccess);

      socket.emit('userJoinLobby', {
        username,
      });
    }


    return function cleanup() {
      if (socket !== null) {
        socket.off('getLobbyList');
        socket.off('getRoomList');
        socket.off('updatePlayerStatus');
        socket.off('lobbyError');
        socket.off('joinRoomSuccess');
        socket.off('leaveRoomSuccess');
        socket.off('updateRoomStatus');
        socket.off('updateCurrentRoom');
        socket.off('startGameSuccess');
      }
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

      <LobbyErrorModal
        errorModal={errorModal}
        setErrorModal={setErrorModal}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
      <style jsx global>
        {`
          body {
            margin: 0;
            padding: 0;
          }
        `}
      </style>
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

Lobby.propTypes = {
  useStateRef: PropTypes.func.isRequired,
};

export default withRedux(withStateRef(Lobby));
