import Card from './Card';

import {
  RANKS, SUITS_CHINESE,
} from './Helpers/Constants';
import Hand from './Hand';

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
      const rnd = Math.random() * (i + 1) | 0;
      [this.cards[i], this.cards[rnd]] = [this.cards[rnd], this.cards[i]];
    }
    return this.cards;
  }

  distribute(version) {
    const shuffledDeck = this.shuffle();

    const pile1 = new Hand(shuffledDeck.slice(0, 13));
    pile1.sortCards(version);
    const pile2 = new Hand(shuffledDeck.slice(13, 26));
    pile2.sortCards(version);
    const pile3 = new Hand(shuffledDeck.slice(26, 39));
    pile3.sortCards(version);
    const pile4 = new Hand(shuffledDeck.slice(39, 52));
    pile4.sortCards(version);

    return [pile1, pile2, pile3, pile4];
  }
}

export default Deck;
