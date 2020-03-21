import DeckFactory from '../../socketio/modules/cards/deck';

const deck = DeckFactory.createDeck();

test('Deck: cards', () => {
  expect(deck.cards()).toHaveLength(52);
});

test('Deck: shuffle', () => {
  expect(deck.shuffle()).toHaveLength(52);
});
