import * as PIXI from 'pixi.js';

import * as Interactions from './Interactions';

const CARD_SEPARATION_OPPONENT = 10;
const CARD_SEPARATION = 30;
const CARD_SCALE = 0.5;
const PLAYED_CARD_SCALE = 0.4;

export const renderPlayerHandCards = (container, cards, resources) => {
  container.removeChildren(0, container.children.length);

  cards.forEach((card, index) => {
    const cardName = `${card.rank}${card.suit}`;
    const sprite = new PIXI.Sprite(resources[cardName].texture);
    sprite.x = 0 + index * CARD_SEPARATION;
    sprite.y = 0;
    sprite.scale.x = CARD_SCALE;
    sprite.scale.y = CARD_SCALE;
    sprite.name = cardName;
    Interactions.addCardInteraction(sprite);

    container.addChild(sprite);
  });
};

export const renderPlayButton = (container, resources, socket, room) => {
  const sprite = new PIXI.Sprite(resources.play.texture);
  sprite.x += 500;
  Interactions.addPlayButtonInteraction(sprite, socket, room);
  container.addChild(sprite);
};

export const renderPassButton = (container, resources, socket, room) => {
  const sprite = new PIXI.Sprite(resources.pass.texture);
  sprite.x += 500;
  sprite.y += 100;
  sprite.scale.x = 0.1;
  sprite.scale.y = 0.1;
  Interactions.addPassButtonInteraction(sprite, socket, room);
  container.addChild(sprite);
};

export const renderOpponentCards = (container, number, resources) => {
  for (let i = 0; i < number; i += 1) {
    const sprite = new PIXI.Sprite(resources.redBack.texture);
    sprite.x = 0 + i * CARD_SEPARATION_OPPONENT;
    sprite.scale.x = 0.25;
    sprite.scale.y = 0.25;
    sprite.name = 'cardBack';
    container.addChild(sprite);
  }
};

export const renderTurnIndicator = (container, resources) => {
  const sprite = new PIXI.Sprite(resources.turnIndicator.texture);
  sprite.scale.x = 0.025;
  sprite.scale.y = 0.025;
  sprite.name = 'turnIndicator';
  container.addChild(sprite);
};

export const renderPlayedCards = (container, cards, resources) => {
  cards.forEach((card) => {
    const sprite = new PIXI.Sprite(resources[card].texture);
    sprite.x = Math.random() * 100;
    sprite.y = Math.random() * 50;
    sprite.scale.x = PLAYED_CARD_SCALE;
    sprite.scale.y = PLAYED_CARD_SCALE;
    sprite.name = card;
    sprite.anchor.set(0);
    sprite.rotation = Math.random() * 2;

    container.addChild(sprite);
  });
};

export const renderPlayerPass = (container, resources) => {
  const sprite = new PIXI.Sprite(resources.playerPass.texture);
  sprite.scale.x = 0.25;
  sprite.scale.y = 0.25;
  container.addChild(sprite);
}