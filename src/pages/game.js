import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import withRedux from '../redux/redux';


const PixiComponent = dynamic(import('../components/Pixi/PixiComponent'), { ssr: false });

const Game = () => {
  const router = useRouter();
  const socket = useSelector((state) => state.socket);

  const leaveGame = () => {
    socket.emit('leaveGame', {
      
    });
    router.push('/lobby');
  }

  useEffect(() => {
  }, []);

  return (
    <div>
      in game
      <button onClick={leaveGame}>Leave Game</button>
      {/* <div ref={canvasRef} /> */}
      <PixiComponent
        socket={socket}
      />
    </div>
  );
};

export default withRedux(Game);
