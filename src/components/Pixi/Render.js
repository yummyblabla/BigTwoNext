import * as PIXI from 'pixi.js';

import * as Interactions from './Interactions';

const CARD_SEPARATION_OPPONENT = 10;
const CARD_SEPARATION = 30;
const CARD_SCALE = 0.5;

export const generateCards = (cards, resources) => {
  const sprites = [];

  cards.forEach((card, index) => {
    const cardName = `${card.rank}${card.suit}`;
    const sprite = new PIXI.Sprite(resources[cardName].texture);
    sprite.x = 0 + index * CARD_SEPARATION;
    sprite.y = 0;
    sprite.scale.x = CARD_SCALE;
    sprite.scale.y = CARD_SCALE;
    sprite.name = cardName;
    Interactions.addCardInteraction(sprite);
    sprites.push(sprite);
  });

  return sprites;
};

export const generatePlayButton = (resources, socket) => {
  const sprite = new PIXI.Sprite(resources.play.texture);
  sprite.x += 500;
  Interactions.addPlayButtonInteraction(sprite, socket);
  return sprite;
};

export const generateOpponentCards = (number, resources) => {
  const sprites = [];

  for (let i = 0; i < number; i += 1) {
    const sprite = new PIXI.Sprite(resources.redBack.texture);
    sprite.x = 0 + i * CARD_SEPARATION_OPPONENT;
    sprite.scale.x = 0.25;
    sprite.scale.y = 0.25;
    sprite.name = 'cardBack';
    sprites.push(sprite);
  }

  return sprites;
};
