import { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import withRedux from '../redux/redux';
import Scoreboard from '../components/Game/Scoreboard';

const PixiComponent = dynamic(import('../components/Pixi/PixiComponent'), { ssr: false });

const Game = () => {
  function useStateRef(state) {
    const stateRef = useRef(state);
    useEffect(() => {
      stateRef.current = state;
    }, [state]);
    return stateRef;
  }
  const router = useRouter();
  const socket = useSelector((state) => state.socket);

  const optionsRef = useRef(null);
  const [options, setOptions] = useState(false);
  const [game, setGame] = useState({});
  const gameRef = useStateRef(game);

  const [score, setScore] = useState({});

  const leaveGame = () => {
    socket.emit('leaveGame', {
      
    });
    router.push('/lobby');
  }

  const toggleOptions = () => {
    setOptions(!options);
  };

  useEffect(() => {
    if (socket === null) {
      router.push('/');
    }
  }, []);
  return (
    <div className="container">
      {/* <PixiComponent
        game={game}
        setGame={setGame}
        gameRef={gameRef}
        setScore={setScore}
        socket={socket}
      /> */}
      <Scoreboard
        score={score}
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

export default withRedux(Game);
