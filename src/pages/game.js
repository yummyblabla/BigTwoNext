import { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';

import {
  updateCurrentRoom,
} from '../redux/actionCreators';

import withStateRef from '../components/HOC/withStateRef';
import withRedux from '../redux/redux';
import Scoreboard from '../components/Game/Scoreboard';
import GameModal from '../components/Modals/GameModal';

const PixiComponent = dynamic(import('../components/Pixi/PixiComponent'), { ssr: false });

const Game = ({ useStateRef }) => {
  const router = useRouter();
  const socket = useSelector((state) => state.socket);
  const room = useSelector((state) => state.room);
  const username = useSelector((state) => state.username);

  const dispatch = useDispatch();

  const optionsRef = useRef(null);
  const [options, setOptions] = useState(false);
  const [game, setGame] = useState({});
  const gameRef = useStateRef(game);

  const [score, setScore] = useState({});
  const [gameModal, setGameModal] = useState(false);
  const [gameMessage, setGameMessage] = useState('');

  const leaveGame = () => {
    socket.emit('leaveGame', { roomName: room.roomName });
    router.push('/lobby');
  };

  const toggleOptions = () => {
    setOptions(!options);
  };

  useEffect(() => {
    if (socket === null) {
      router.push('/');
    }
    
    return function cleanup() {
      dispatch(updateCurrentRoom({}));
    }
  }, []);
  return (
    <div className="container">
      <PixiComponent
        game={game}
        setGame={setGame}
        gameRef={gameRef}
        setScore={setScore}
        socket={socket}
        setGameModal={setGameModal}
        setGameMessage={setGameMessage}
        room={room}
        username={username}
      />
      <Scoreboard
        score={score}
      />
      <GameModal
        gameModal={gameModal}
        setGameModal={setGameModal}
        gameMessage={gameMessage}
        setGameMessage={setGameMessage}
      />
      <div className="options">
        <button className="optionsButton" onClick={toggleOptions}>Options</button>
        <div className={`optionsDropdown ${options ? 'show' : ''}`} ref={optionsRef}>
          <button onClick={leaveGame}>Leave Game</button>
        </div>
      </div>
      <style jsx global>
        {`
          body {
            margin: 0;
            padding: 0;
          }
          .container {
            display: flex;
            flex-direction: row;
          }
          .options {
            position: absolute;
            top: 0;
            right: 0;
            cursor: pointer;
            display: inline-block;
          }
          .optionsDropdown {
            display: none;
            position: absolute;
            background-color: #f1f1f1;
          }
          
          .show {
            display: block;
            right: 0;
          }
        `}
      </style>
    </div>
  );
};

export default withStateRef(withRedux(Game));
