import PropTypes from 'prop-types';

import * as PIXI from 'pixi.js';
import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import * as Render from './Render';
import * as GameVariables from '../Game/GameVariables';
import search from '../../../server/modules/Helpers/Search';
import GameClient from '../../../server/modules/GameClient';
import Opponent from '../../../server/modules/Opponent';
import Card from '../../../server/modules/Card';

const APP_WIDTH = 800;
const APP_HEIGHT = 600;

let pixiApplication;
let resources;

let playerContainer;
let playerHandContainer;
let opponentOneContainer;
let opponentOneHandContainer;
let opponentTwoContainer;
let opponentTwoHandContainer;
let opponentThreeContainer;
let opponentThreeHandContainer;
const opponentContainers = {};
let playContainer;
let playerTurnContainer;
let opponentOneTurnContainer;
let opponentTwoTurnContainer;
let opponentThreeTurnContainer;
let opponentOnePassContainer;
let opponentTwoPassContainer;
let opponentThreePassContainer;
const turnContainers = [];

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
    url: 'play.png',
  });
  images.push({
    name: 'redBack',
    url: '/Cards/RED_BACK.svg',
  });
  images.push({
    name: 'turnIndicator',
    url: 'turn.png',
  });
  images.push({
    name: 'pass',
    url: 'pass.png',
  });
  images.push({
    name: 'playerPass',
    url: 'playerPass.png',
  });
};

/**
 * Resets the board to initial state.
 * No Cards.
 * No Turn Indicator.
 */
const resetBoard = () => {
  opponentOneTurnContainer.visible = false;
  opponentTwoTurnContainer.visible = false;
  opponentThreeTurnContainer.visible = false;
  playerTurnContainer.visible = false;

  opponentOneHandContainer.removeChildren(0, opponentOneHandContainer.children.length);
  opponentTwoHandContainer.removeChildren(0, opponentTwoHandContainer.children.length);
  opponentThreeHandContainer.removeChildren(0, opponentThreeHandContainer.children.length);
  playerHandContainer.removeChildren(0, playerHandContainer.children.length);
  playContainer.removeChildren(0, playContainer.children.length);

  while (turnContainers.length) {
    turnContainers.pop();
  }
};

/**
 * Sets up the game.
 * @param {*} game
 * @param {*} username
 */
const setUpBoard = (game, username) => {
  const nameOfFirstPlayer = game.getPlayerTurn();
  const numberOfPlayers = game.getNumberOfPlayers();
  const opponents = [];

  const containers = [
    opponentOneContainer, opponentTwoContainer, opponentThreeContainer,
  ];
  const handContainers = [
    opponentOneHandContainer, opponentTwoHandContainer, opponentThreeHandContainer,
  ];
  const tempTurnContainers = [
    opponentOneTurnContainer, opponentTwoTurnContainer, opponentThreeTurnContainer,
  ];
  const tempPassContainers = [
    opponentOnePassContainer, opponentTwoPassContainer, opponentThreePassContainer,
  ];
  playerTurnContainer.name = username;
  turnContainers.push(playerTurnContainer);
  const indexOfPlayer = game.getPlayers().findIndex((player) => player.username === username);
  let startPoint = indexOfPlayer + 1;

  if (nameOfFirstPlayer === username) {
    playerTurnContainer.visible = true;
  }

  for (let i = 0; i < numberOfPlayers - 1; i += 1) {
    if (startPoint >= numberOfPlayers) {
      startPoint = 0;
    }
    const { username: opponentUsername } = game.getPlayers()[startPoint];
    opponents.push(new Opponent(opponentUsername));
    const style = new PIXI.TextStyle({
      fontFamily: 'Arial',
      fontSize: 20,
      fill: '#ffffff',
    });
    const text = new PIXI.Text(opponentUsername, style);
    text.y = -30;
    containers[i].addChild(text);

    const opponentTurnContainer = tempTurnContainers[i];
    opponentTurnContainer.name = opponentUsername;
    turnContainers.push(opponentTurnContainer);
    Render.renderOpponentCards(handContainers[i], 13, resources);

    if (opponentUsername === nameOfFirstPlayer) {
      opponentTurnContainer.visible = true;
    }

    startPoint += 1;
    opponentContainers[opponentUsername] = {
      hand: handContainers[i],
      pass: tempPassContainers[i],
    };
  }
  game.addOpponents(opponents);
};

const setUpContainers = (room, socket) => {
  playerContainer = new PIXI.Container();
  playerContainer.x = 50;
  playerContainer.y = APP_HEIGHT - 175;
  pixiApplication.stage.addChild(playerContainer);
  playerHandContainer = new PIXI.Container();
  playerContainer.addChild(playerHandContainer);
  playerTurnContainer = new PIXI.Container();
  playerTurnContainer.x = -30;
  playerContainer.addChild(playerTurnContainer);
  Render.renderTurnIndicator(playerTurnContainer, resources);
  playerTurnContainer.visible = false;

  Render.renderPlayButton(playerContainer, resources, socket, room);
  Render.renderPassButton(playerContainer, resources, socket, room);

  opponentOneContainer = new PIXI.Container();
  opponentOneContainer.x = 50;
  opponentOneContainer.y = 50;
  pixiApplication.stage.addChild(opponentOneContainer);
  opponentOneHandContainer = new PIXI.Container();
  opponentOneContainer.addChild(opponentOneHandContainer);
  opponentOneTurnContainer = new PIXI.Container();
  opponentOneTurnContainer.x = -30;
  opponentOneContainer.addChild(opponentOneTurnContainer);
  Render.renderTurnIndicator(opponentOneTurnContainer, resources);
  opponentOneTurnContainer.visible = false;
  opponentOnePassContainer = new PIXI.Container();
  opponentOnePassContainer.y = 80;
  opponentOneContainer.addChild(opponentOnePassContainer);
  Render.renderPlayerPass(opponentOnePassContainer, resources);
  opponentOnePassContainer.visible = false;

  opponentTwoContainer = new PIXI.Container();
  opponentTwoContainer.x = 300;
  opponentTwoContainer.y = 50;
  pixiApplication.stage.addChild(opponentTwoContainer);
  opponentTwoHandContainer = new PIXI.Container();
  opponentTwoContainer.addChild(opponentTwoHandContainer);
  opponentTwoTurnContainer = new PIXI.Container();
  opponentTwoTurnContainer.x = -30;
  opponentTwoContainer.addChild(opponentTwoTurnContainer);
  Render.renderTurnIndicator(opponentTwoTurnContainer, resources);
  opponentTwoTurnContainer.visible = false;
  opponentTwoPassContainer = new PIXI.Container();
  opponentTwoPassContainer.y = 80;
  opponentTwoContainer.addChild(opponentTwoPassContainer);
  Render.renderPlayerPass(opponentTwoPassContainer, resources);
  opponentTwoPassContainer.visible = false;

  opponentThreeContainer = new PIXI.Container();
  opponentThreeContainer.x = 550;
  opponentThreeContainer.y = 50;
  pixiApplication.stage.addChild(opponentThreeContainer);
  opponentThreeHandContainer = new PIXI.Container();
  opponentThreeContainer.addChild(opponentThreeHandContainer);
  opponentThreeTurnContainer = new PIXI.Container();
  opponentThreeTurnContainer.x = -30;
  opponentThreeContainer.addChild(opponentThreeTurnContainer);
  Render.renderTurnIndicator(opponentThreeTurnContainer, resources);
  opponentThreeTurnContainer.visible = false;
  opponentThreePassContainer = new PIXI.Container();
  opponentThreePassContainer.y = 80;
  opponentThreeContainer.addChild(opponentThreePassContainer);
  Render.renderPlayerPass(opponentThreePassContainer, resources);
  opponentThreePassContainer.visible = false;

  playContainer = new PIXI.Container();
  playContainer.x = 300;
  playContainer.y = 200;
  pixiApplication.stage.addChild(playContainer);
};

/**
 * Pixi Component.
 */
const PixiComponent = ({
  game, setGame, gameRef, setScore, socket, setGameMessage, setGameModal, room, username,
}) => {
  function useStateRef(state) {
    const stateRef = useRef(state);
    useEffect(() => {
      stateRef.current = state;
    }, [state]);
    return stateRef;
  }

  const dispatch = useDispatch();
  const canvasRef = useRef(null);
  

  const [cards, setCards] = useState([]);
  const cardsRef = useStateRef(cards);

  /**
   * Handler for setting the game.
   */
  const handleSetGame = ({ game: $game }) => {
    const {
      roomName, players, gameVersion, scores,
    } = $game;
    setGame(new GameClient(roomName, players, gameVersion));
    setScore(scores);
  };

  /**
   * Handler for starting the game/round.
   */
  const handleStartGame = ({ roomName, nameOfFirstPlayer }) => {
    resetBoard();
    setGame((currentGame) => {
      currentGame.setPlayerTurn(nameOfFirstPlayer);
      setUpBoard(currentGame, username);
      return currentGame;
    });
    socket.emit('getCards', { roomName });
  };

  /**
   * Handler for receiving your initial cards.
   */
  const handleReceiveCards = ({ cards: $cards }) => {
    const newCards = [];
    $cards.forEach((card) => {
      newCards.push(new Card(card.rank, card.suit));
    });
    setCards(newCards);
    Render.renderPlayerHandCards(playerHandContainer, newCards, resources);
  };

  /**
   * Helper function that toggles/renders turn indicator it's another player's turn.
   */
  const goToNextTurn = (nextPlayerName) => {
    const index = turnContainers.findIndex((container) => container.visible);
    turnContainers[index].visible = false;

    if (nextPlayerName !== username) {
      opponentContainers[nextPlayerName].pass.visible = false;
    }

    const nextIndex = turnContainers.findIndex((container) => container.name === nextPlayerName);
    turnContainers[nextIndex].visible = true;
    setGame((currentGame) => {
      currentGame.setPlayerTurn(nextPlayerName);
      return currentGame;
    });
  };

  /**
   * Handler for validating player's play when it is their turn.
   */
  const handleValidPlay = ({ cards: $cards, passed }) => {
    if (passed) {
      return;
    }

    if ($cards.length) {
      while (GameVariables.selectedCards.length > 0) {
        GameVariables.selectedCards.pop();
      }
      const newCards = [...cardsRef.current];
      $cards.forEach((card) => {
        const index = search(newCards, card, gameRef.current.getGameVersion());
        if (index !== -1) {
          newCards.splice(index, 1);
        }
      });
      setCards(newCards);
      Render.renderPlayerHandCards(playerHandContainer, newCards, resources);
    } else {
      alert('Invalid play');
    }
  };

  /**
   * Handler for round ending.
   */
  const handleEndRound = ({ winner, scores }) => {
    setScore(scores);
    setGameMessage(`${winner} has won the round.`);
    setGameModal(true);
    setTimeout(() => {
      setGameModal(false);
      setGameMessage('');
    }, 4000);
  };

  /**
   * Handler for when cards are played.
   */
  const handleCardsPlayed = (
    {
      cards: $cards, passed, username: $username, nextPlayer,
    },
  ) => {
    if ($username !== username) {
      opponentContainers[$username].pass.visible = false;
      if (passed) {
        opponentContainers[$username].pass.visible = true;
        goToNextTurn(nextPlayer);
        return;
      }
      setGame((currentGame) => {
        const opponent = currentGame.findOpponent($username);
        opponent.decreaseCards($cards.length);

        Render.renderOpponentCards(
          opponentContainers[opponent.getUsername()].hand, opponent.getNumberOfCards(), resources,
        );
        return currentGame;
      });
    }
    if (passed) {
      goToNextTurn(nextPlayer);
      return;
    }

    Render.renderPlayedCards(playContainer, $cards, resources);
    goToNextTurn(nextPlayer);
  };

  /**
   * Handler for receiving and updating score.
   */
  const handleUpdateScores = ({ scores }) => {
    setScore(scores);
  };

  useEffect(() => {
    socket.on('setGame', handleSetGame);
    socket.on('startGame', handleStartGame);
    socket.on('receiveCards', handleReceiveCards);
    socket.on('validPlay', handleValidPlay);
    socket.on('cardsPlayed', handleCardsPlayed);
    socket.on('endRound', handleEndRound);
    socket.on('updateScore', handleUpdateScores);

    pixiApplication = new PIXI.Application({
      width: APP_WIDTH,
      height: APP_HEIGHT,
      transparent: false,
    });
    canvasRef.current.appendChild(pixiApplication.view);

    function setup(loader, $resources) {
      resources = $resources;
      setUpContainers(room, socket);

      socket.emit('getGame', {
        roomName: room.roomName,
      });
    }

    pushToImages();
    pixiApplication.loader
      .add(images)
      .load(setup);

    return function cleanup() {
      socket.off('setGame');
      socket.off('startGame');
      socket.off('receiveCards');
      socket.off('validPlay');
      socket.off('cardsPlayed');
      socket.off('endRound');
      socket.off('updateScore');
    };
  }, []);

  return (
    <div ref={canvasRef} />
  );
};


PixiComponent.propTypes = {
  game: PropTypes.shape({}).isRequired,
  setGame: PropTypes.func.isRequired,
  gameRef: PropTypes.shape({}).isRequired,
  setScore: PropTypes.func.isRequired,
  room: PropTypes.shape({}).isRequired,
  username: PropTypes.string.isRequired,
  socket: PropTypes.shape({
    off: PropTypes.func,
    emit: PropTypes.func,
    on: PropTypes.func,
  }).isRequired,
  setGameMessage: PropTypes.func.isRequired,
  setGameModal: PropTypes.func.isRequired,
};

export default PixiComponent;
