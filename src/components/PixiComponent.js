import * as PIXI from 'pixi.js';
import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import io from 'socket.io-client';

import {
  setGame,
} from '../redux/actionCreators';

import gameListeners from '../socketio/gameListeners';

let pixiApplication;
let socket;

const images = [];
const pushToImages = () => {
  for (let i = 0; i < 13; i += 1) {
    const ranks = 'A 2 3 4 5 6 7 8 9 10 J Q K'.split(' ');
    const suits = 'S H C D'.split(' ');

    for (let j = 0; j < 4; j += 1) {
      images.push({
        name: `${ranks[i]}${suits[j]}`,
        url: `/Cards/${ranks[i]}${suits[j]}.svg`,
      });
    }
  }
};

const PixiComponent = () => {
  const dispatch = useDispatch();
  const canvasRef = useRef(null);
  const game = useSelector((state) => state.game);
  console.log(game);
  // const socket = useSelector((state) => state.socket);

  const handleSetGame = (game) => {
    dispatch(setGame(game));
  };

  const fn = {
    handleSetGame,
  };

  useEffect(() => {
    socket = io();
    gameListeners(socket, fn);
    pixiApplication = new PIXI.Application({ width: 600, height: 600, transparent: false });
    canvasRef.current.appendChild(pixiApplication.view);

    // const style = new PIXI.TextStyle({
    //   fontFamily: 'Arial',
    //   fontSize: 36,
    //   fontStyle: 'italic',
    //   fontWeight: 'bold',
    //   fill: ['#ffffff', '#00ff99'], // gradient
    //   stroke: '#4a1850',
    //   strokeThickness: 5,
    //   dropShadow: true,
    //   dropShadowColor: '#000000',
    //   dropShadowBlur: 4,
    //   dropShadowAngle: Math.PI / 6,
    //   dropShadowDistance: 6,
    //   wordWrap: true,
    //   wordWrapWidth: 440,
    // });
    function setup(loader, resources) {
      // const sprite = new PIXI.Sprite(resources['2C'].texture);
      // pixiApplication.stage.addChild(sprite);

      socket.emit('getGame', {
        roomName: 'game',
      });
      socket.emit('getCards', {});
    }

    pushToImages();
    pixiApplication.loader
      .add(images)
      .load(setup);
  }, []);

  return (
    <div ref={canvasRef} />
  );
};

export default PixiComponent;
