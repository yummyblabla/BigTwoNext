import Card from './Card';

import {
  RANKS, SUITS_CHINESE,
} from './Helpers/Constants';

const generateDeck = () => {
  const deck = [];
  RANKS.forEach((rank) => {
    SUITS_CHINESE.forEach((suit) => {
      deck.push(new Card(rank, suit));
    });
  });
  return deck;
};

class Deck {
  constructor() {
    this.cards = generateDeck();
  }

  getCards() {
    return this.cards;
  }

  shuffle() {
    for (let i = 0; i < this.cards.length; i += 1) {
      // eslint-disable-next-line no-bitwise
      const rnd = Math.random() * i | 0;
      [this.cards[i], this.cards[rnd]] = [this.cards[rnd], this.cards[i]];
    }
    return this.cards;
  }

  distribute() {
    const shuffledDeck = this.shuffle();

    const pile1 = shuffledDeck.slice(0, 13);
    const pile2 = shuffledDeck.slice(13, 26);
    const pile3 = shuffledDeck.slice(26, 39);
    const pile4 = shuffledDeck.slice(39, 52);

    return [pile1, pile2, pile3, pile4];
  }
}

export default Deck;
