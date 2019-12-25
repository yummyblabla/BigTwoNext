/* eslint-disable no-param-reassign */
import { selectedCards } from '../Game/GameVariables';

const removeFromSelection = (card) => {
  const index = selectedCards.indexOf(card);
  if (index > -1) {
    selectedCards.splice(index, 1);
  }
};

const addToSelection = (card) => {
  if (selectedCards.includes(card)) {
    removeFromSelection(card);
    return false;
  }
  selectedCards.push(card);
  return true;
};

const selectCard = (cardSprite) => {
  cardSprite.y -= 10;
};

const deselectCard = (cardSprite) => {
  cardSprite.y += 10;
};

export const addCardInteraction = (cardSprite) => {
  cardSprite.interactive = true;

  cardSprite.on('mousedown', (data) => {
    if (addToSelection(data.target.name)) {
      selectCard(cardSprite);
    } else {
      deselectCard(cardSprite);
    }
  });
};

export const addPlayButtonInteraction = (sprite, socket) => {
  sprite.interactive = true;
  sprite.on('mousedown', () => {
    socket.emit('sendCards', {
      cards: selectedCards,
    });
  });
};
