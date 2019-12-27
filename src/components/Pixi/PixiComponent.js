import * as PIXI from 'pixi.js';
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import io from 'socket.io-client';

import {
  startGame, setGame,
} from '../../redux/actionCreators';

import gameListeners from '../../socketio/gameListeners';
import { startGameListen } from '../../socketio/gameListeners';
import * as Render from './Render';
import * as GameVariables from '../Game/GameVariables';

const APP_WIDTH = 800;
const APP_HEIGHT = 600;

let pixiApplication;
let socket;
let resources;

let playerContainer;
let opponentOneContainer;
let opponentTwoContainer;
let opponentThreeContainer;

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
  images.push({
    name: 'redBack',
    url: 'Cards/RED_BACK.svg',
  });
};

const setUpBoard = (game, username) => {
  const numberOfPlayers = game.getNumberOfPlayers();

  const containers = [opponentOneContainer, opponentTwoContainer, opponentThreeContainer];
  const indexOfPlayer = game.getPlayers().findIndex((player) => player.username === username);
  let startPoint = indexOfPlayer + 1;
  for (let i = 0; i < numberOfPlayers - 1; i += 1) {
    if (startPoint >= numberOfPlayers) {
      startPoint = 0;
    }
    const { username: playerUsername } = game.getPlayers()[startPoint];
    const style = new PIXI.TextStyle({
      fontFamily: 'Arial',
      fontSize: 20,
    });
    const text = new PIXI.Text(playerUsername, style);
    containers[i].addChild(text);
  }
};

class PixiComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      hello: 'what',
    };
  }

  componentDidMount() {
    socket = io();
    socket.emit('getGame', {
      roomname: 'hello',
      // roomName: room.roomName,
    });

    

    socket.on('setGame', ({ roomName }) => {
      console.log('hello');
      console.log(this.state);
    });
    this.setState({
      hello: 'hey',
    });
    socket.on('startGame', ({ roomName }) => {
      console.log(this.state);
    })
  }

  render() {
    return (
      <div>Hi</div>
    )
  }
}
// const PixiComponent = () => {
//   const dispatch = useDispatch();
//   const canvasRef = useRef(null);
//   const game = useSelector((state) => state.game);
//   const room = useSelector((state) => state.room);
//   const username = useSelector((state) => state.username);

//   const [cards, setCards] = useState([]);

//   // const socket = useSelector((state) => state.socket);
//   const handleSetGame = ($game) => {
//     dispatch(setGame($game));
//   };

//   const handleStartGame = () => {
//     console.log(game);
//     dispatch(startGame());
//   };

//   const testSomething = ({ roomName }) => {
//     console.log(roomName);
//     console.log(game);
//   };
//   console.log(game);

//   const handleReceiveCards = ($cards) => {
//     setCards($cards);
//     const sprites = Render.generateCards($cards, resources);
//     sprites.forEach((sprite) => {
//       playerContainer.addChild(sprite);
//     });
//   };

//   const setUpContainers = () => {
//     playerContainer = new PIXI.Container();
//     playerContainer.interactive = true;
//     playerContainer.x = 50;
//     playerContainer.y = APP_HEIGHT - 175;
//     pixiApplication.stage.addChild(playerContainer);

//     const play = Render.generatePlayButton(resources, socket);
//     playerContainer.addChild(play);

//     opponentOneContainer = new PIXI.Container();
//     opponentOneContainer.x = 50;
//     opponentOneContainer.y = 50;

//     const opponentOneCards = Render.generateOpponentCards(13, resources);
//     opponentOneCards.forEach((sprite) => {
//       opponentOneContainer.addChild(sprite);
//     });
//     pixiApplication.stage.addChild(opponentOneContainer);

//     opponentTwoContainer = new PIXI.Container();
//     opponentTwoContainer.x = 300;
//     opponentTwoContainer.y = 50;
//     const opponentTwoCards = Render.generateOpponentCards(13, resources);
//     opponentTwoCards.forEach((sprite) => {
//       opponentTwoContainer.addChild(sprite);
//     });
//     pixiApplication.stage.addChild(opponentTwoContainer);

//     opponentThreeContainer = new PIXI.Container();
//     opponentThreeContainer.x = 550;
//     opponentThreeContainer.y = 50;
//     const opponentThreeCards = Render.generateOpponentCards(13, resources);
//     opponentThreeCards.forEach((sprite) => {
//       opponentThreeContainer.addChild(sprite);
//     });
//     pixiApplication.stage.addChild(opponentThreeContainer);
//   };

//   const fn = {
//     handleSetGame,
//     handleStartGame,
//     handleReceiveCards,
//   };

//   useEffect(() => {
//     socket = io();
//     startGameListen(socket, handleStartGame);
//     // socket.on('startGame', ({ roomName }) => {
//     //   // setUpBoard(game, username);
//     //   fn.handleStartGame();
//     //   socket.emit('getCards', { roomName });
//     // });
//     socket.on('startGame', testSomething);

//     gameListeners(socket, fn);

//     pixiApplication = new PIXI.Application({
//       width: APP_WIDTH,
//       height: APP_HEIGHT,
//       transparent: false,
//     });
//     canvasRef.current.appendChild(pixiApplication.view);

//     function setup(loader, $resources) {
//       resources = $resources;

//       setUpContainers();

//       socket.emit('getGame', {
//         roomName: room.roomName,
//       });
//     }

//     pushToImages();
//     pixiApplication.loader
//       .add(images)
//       .load(setup);
//   }, []);

//   return (
//     <div ref={canvasRef} />
//   );
// };

export default PixiComponent;
