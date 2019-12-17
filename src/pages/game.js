import { useEffect, useRef } from 'react';
import io from 'socket.io-client';
import * as PIXI from 'pixi.js';
import { useSelector } from 'react-redux';


import withRedux from '../redux/redux';

const Game = () => {
  const canvasRef = useRef(null);
  let socket = null;
  let app = null;
  const asdf = useSelector((state) => state);
  console.log(asdf);

  useEffect(() => {
    socket = io();
    socket.on('test', (data) => {
      console.log(data);
    });
    app = new PIXI.Application({ width: 600, height: 600, transparent: false });

    canvasRef.current.appendChild(app.view);
  }, []);

  const testSocket = () => {
    socket.emit('play', { data: 'hi' });
  };
  
  return (
    <div>
      in game
      <button onClick={testSocket}>Click me</button>
      <div ref={canvasRef} />
    </div>
  );
};

export default withRedux(Game);
