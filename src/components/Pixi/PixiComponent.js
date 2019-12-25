import * as PIXI from 'pixi.js';
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import io from 'socket.io-client';

import {
  startGame, setGame,
} from '../../redux/actionCreators';

import gameListeners from '../../socketio/gameListeners';
import * as Render from './Render';
import * as GameVariables from '../Game/GameVariables';

const APP_WIDTH = 600;
const APP_HEIGHT = 600;

let pixiApplication;
let socket;
let resources;

let playerContainer;


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
  images.push({
    name: 'play',
    url: '/Cards/play.png',
  });
};

const PixiComponent = () => {
  const dispatch = useDispatch();
  const canvasRef = useRef(null);
  const game = useSelector((state) => state.game);
  const room = useSelector((state) => state.room);

  const [cards, setCards] = useState([]);

  // const socket = useSelector((state) => state.socket);
  const handleSetGame = ($game) => {
    dispatch(setGame($game));
  };

  const handleStartGame = () => {
    dispatch(startGame());
  };

  const handleReceiveCards = ($cards) => {
    setCards($cards);
    const sprites = Render.generateCards($cards, resources);
    sprites.forEach((sprite) => {
      playerContainer.addChild(sprite);
    });
  };

  const setUpContainers = () => {
    playerContainer = new PIXI.Container();
    playerContainer.interactive = true;
    playerContainer.x = 50;
    playerContainer.y = APP_HEIGHT - 175;
    pixiApplication.stage.addChild(playerContainer);

    const play = Render.generatePlayButton(resources, socket);
    playerContainer.addChild(play);
  };

  const fn = {
    handleSetGame,
    handleStartGame,
    handleReceiveCards,
  };

  useEffect(() => {
    socket = io();
    gameListeners(socket, fn);
    pixiApplication = new PIXI.Application({
      width: APP_WIDTH,
      height: APP_HEIGHT,
      transparent: false,
    });
    canvasRef.current.appendChild(pixiApplication.view);

    function setup(loader, $resources) {
      resources = $resources;
      // const sprite = new PIXI.Sprite(resources['2C'].texture);
      // pixiApplication.stage.addChild(sprite);

      setUpContainers();

      socket.emit('getGame', {
        roomName: room.roomName,
      });
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
