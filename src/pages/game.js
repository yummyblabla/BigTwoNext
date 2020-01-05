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

  const [game, setGame] = useState({});
  const gameRef = useStateRef(game);

  const [score, setScore] = useState({});

  const leaveGame = () => {
    socket.emit('leaveGame', {
      
    });
    router.push('/lobby');
  }

  useEffect(() => {
    if (socket === null) {
      router.push('/');
    }
  }, []);
  return (
    <div>
      in game
      <button onClick={leaveGame}>Leave Game</button>
      {/* <div ref={canvasRef} /> */}
      <PixiComponent
        game={game}
        setGame={setGame}
        gameRef={gameRef}
        setScore={setScore}
        socket={socket}
      />
      <Scoreboard
        score={score}
      />
    </div>
  );
};

export default withRedux(Game);
