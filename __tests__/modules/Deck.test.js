import Deck from '../../server/modules/Deck';

const deck = new Deck();

test('New Deck', () => {
  expect(deck).toEqual(new Deck());
});

test('Deck - getDeck()', () => {
  expect(deck.getCards()).toEqual(new Deck().getCards());
});

test('Deck - distribute()', () => {
  expect(deck.distribute()).toHaveLength(4);
});
