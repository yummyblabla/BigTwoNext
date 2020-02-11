import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Head from 'next/head';
import withRedux from '../redux/redux';

import {
  updateCurrentRoom,
} from '../redux/actionCreators';
import {
  USER_LOBBY_STATE, USER_IN_ROOM_STATE, USER_IN_GAME_STATE,
} from '../../socketio/modules/Helpers/Constants';
import withStateRef from '../components/HOC/withStateRef';

import CreateRoomModal from '../components/Modals/CreateRoom';
import ErrorModal from '../components/Modals/ErrorModal';
import PlayerList from '../components/Lobby/PlayerList';
import RoomList from '../components/Lobby/RoomList';
import RoomLobby from '../components/Modals/RoomLobby';
import LobbyHeader from '../components/Lobby/LobbyHeader';
import NeedConnectModal from '../components/Modals/NeedConnectModal';

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

  const [noConnectModal, setNoConnectModal] = useState(false);

  const handleStartGameSuccess = () => {
    router.push('/game');
  };

  const handleStartGame = (roomName) => {
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
  };

  /**
   * Disconnects user from user and redirect to Index.
   */
  const disconnect = () => {
    socket.disconnect();
    router.push('/');
  };

  useEffect(() => {
    if (socket === null) {
      setNoConnectModal(true);
      // router.push('/');
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
    <div className="flex-column">
      <Head>
        <title>Big Two.io | Lobby</title>
        <meta charSet="UTF-8" />
        <meta name="description" content="BigTwo.io Lobby. Create and join rooms, invite your friends to play a game of BigTwo with up to 4 people!" />
        <meta name="keywords" content="BigTwo,Big2,Big Two,IO,Cards,Game,Canvas,WebGL,PixiJS,HTML5,Socket.io,PlayBigTwo,Play BigTwo,Play Big Two,Multiplayer,Card Game,Asian,Chinese,Vietnamese" />
        <meta name="author" content="Derrick Lee" />
        <meta name="language" content="en" />
        <link rel="icon" type="image/png" href="favicon.ico" />
        <link rel="apple-touch-icon" href="favicon.ico" />
        <link rel="canonical" href="https://bigtwo.io/lobby" />
      </Head>
      <LobbyHeader
        username={username}
        disconnect={disconnect}
      />
      <div className="flex-column align-center">
        <div className="flex-row button-container">
          <button
            type="button"
            className="background-green border-radius-10 font-size-1rem width-200px"
            onClick={handleOpenCreateRoomModal}
          >
            Create room
          </button>
        </div>

        <div className="flex-row">
          <RoomList
            rooms={rooms}
            joinRoom={handleJoinRoom}
          />
          <div style={{ width: '100px' }}/>
          <PlayerList players={players} />
        </div>
      </div>

      <CreateRoomModal
        createRoom={handleCreateRoom}
        createRoomModal={createRoomModal}
        setCreateRoomModal={setCreateRoomModal}
      />

      <RoomLobby
        inRoomLobby={playerState === USER_IN_ROOM_STATE}
        currentRoom={currentRoom}
        leaveRoom={handleLeaveRoom}
        startGame={handleStartGame}
        username={username}
      />
      {/* {playerState === USER_IN_ROOM_STATE && (
        <RoomLobby
          currentRoom={currentRoom}
          leaveRoom={handleLeaveRoom}
          startGame={handleStartGame}
          username={username}
        />
      )} */}
      <ErrorModal
        errorModal={errorModal}
        setErrorModal={setErrorModal}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
      <NeedConnectModal
        modal={noConnectModal}
        setModal={setNoConnectModal}
        router={router}
      />

      <style jsx>
        {`
          .button-container {
            height: 50px;
            margin: 10px 0;
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
