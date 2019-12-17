import Deck from '../../modules/Deck';

const deck = new Deck();

test('New Deck', () => {
  expect(deck).toEqual(new Deck());
});

test('Deck - getDeck()', () => {
  expect(deck.getDeck()).toEqual(new Deck().getDeck());
});

test('Deck - distribute()', () => {
  expect(deck.distribute()).toHaveLength(4);
});
