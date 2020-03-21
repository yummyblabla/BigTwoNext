// import Card from '../../server/modules/Card';

// let card;
// const rank = 'A';
// const suit = 'S';

// beforeEach(() => {
//   card = new Card(rank, suit);
// });

// test('Equivalent Card', () => {
//   expect(card).toEqual(new Card(rank, suit));
// });

// test('Valid Card - getRank()', () => {
//   expect(card.getRank()).toBe(rank);
// });

// test('Valid Card - getSuit()', () => {
//   expect(card.getSuit()).toBe(suit);
// });

// test('Valid Card - getProperties()', () => {
//   expect(card.getProperties()).toEqual(({ rank, suit }));
// });

// test('Valid Card - convertToString()', () => {
//   expect(card.convertToString()).toBe(rank + suit);
// });

// test('Invalid card - emptyString', () => {
//   expect(() => {
//     const invalidCard = new Card(' ', ' ');
//     console.log(invalidCard);
//   }).toThrow(RangeError);
// });

// test('Invalid card - invalid rank', () => {
//   expect(() => {
//     const invalidCard = new Card('L', 'S');
//     console.log(invalidCard);
//   }).toThrow(RangeError);
// });

// test('Invalid card - invalid suit', () => {
//   expect(() => {
//     const invalidCard = new Card('9', 'M');
//     console.log(invalidCard);
//   }).toThrow(RangeError);
// });

// test('Invalid card - invalid type', () => {
//   expect(() => {
//     const invalidCard = new Card(9, 'D');
//     console.log(invalidCard);
//   }).toThrow(RangeError);
// });

import CardFactory from '../../socketio/modules/cards/card';

const rank = '10';
const suit = 'S';
const card = CardFactory.createCard({ rank, suit });

test('Card: attributes', () => {
  expect(card.rank()).toBe(rank);
  expect(card.suit()).toBe(suit);
});
