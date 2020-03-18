// import Hand from '../../server/modules/Hand';
// import Card from '../../server/modules/Card';
// import {
//   CHINESE_VERSION, VIET_VERSION,
// } from '../../server/modules/Helpers/Constants';

// let hand;
// let hand2;
// const cards = [
//   new Card('A', 'C'),
//   new Card('2', 'D'),
//   new Card('K', 'S'),
//   new Card('10', 'D'),
//   new Card('4', 'H'),
//   new Card('8', 'S'),
//   new Card('7', 'S'),
//   new Card('7', 'D'),
//   new Card('2', 'S'),
//   new Card('3', 'S'),
//   new Card('3', 'D'),
//   new Card('7', 'C'),
//   new Card('7', 'H'),
// ];

// const cards2 = [
//   new Card('3', 'C'),
//   new Card('4', 'D'),
//   new Card('4', 'H'),
//   new Card('J', 'D'),
//   new Card('10', 'H'),
//   new Card('2', 'S'),
//   new Card('10', 'S'),
//   new Card('8', 'D'),
//   new Card('4', 'S'),
//   new Card('9', 'S'),
//   new Card('K', 'D'),
//   new Card('Q', 'C'),
//   new Card('J', 'C'),
// ];

// beforeEach(() => {
//   hand = new Hand(cards);
//   hand2 = new Hand(cards2);
// });

// test('Equivalent Hand', () => {
//   expect(hand).toEqual(new Hand(cards));
// });

// test('Hand - getCards()', () => {
//   expect(hand.getCards()).toBe(cards);
// });

// test('Hand - setCards()', () => {
//   hand.setCards(cards2);
//   expect(hand.getCards()).toBe(cards2);
// });

// test('Hand - getIsSorted()', () => {
//   expect(hand.getIsSorted()).toBe(false);
// });

// test('Hand - getNumberOfCards() (13)', () => {
//   expect(hand.getNumberOfCards()).toBe(13);
// });

// test('Hand - getNumberOfCards() (0)', () => {
//   hand.setCards([]);
//   expect(hand.getNumberOfCards()).toBe(0);
// });

// test('Hand - sortCards(Chinese)', () => {
//   hand2.sortCards(CHINESE_VERSION);
//   expect(hand2.getCards()).toEqual([
//     new Card('3', 'C'),
//     new Card('4', 'D'),
//     new Card('4', 'H'),
//     new Card('4', 'S'),
//     new Card('8', 'D'),
//     new Card('9', 'S'),
//     new Card('10', 'H'),
//     new Card('10', 'S'),
//     new Card('J', 'D'),
//     new Card('J', 'C'),
//     new Card('Q', 'C'),
//     new Card('K', 'D'),
//     new Card('2', 'S'),
//   ]);
// });

// test('Hand - sortCards(Chinese)', () => {
//   hand.sortCards(CHINESE_VERSION);
//   expect(hand.getCards()).toEqual([
//     new Card('3', 'D'),
//     new Card('3', 'S'),
//     new Card('4', 'H'),
//     new Card('7', 'D'),
//     new Card('7', 'C'),
//     new Card('7', 'H'),
//     new Card('7', 'S'),
//     new Card('8', 'S'),
//     new Card('10', 'D'),
//     new Card('K', 'S'),
//     new Card('A', 'C'),
//     new Card('2', 'D'),
//     new Card('2', 'S'),
//   ]);
// });

// test('Hand - sortCards(Viet)', () => {
//   hand.sortCards(VIET_VERSION);
//   expect(hand.getCards()).toEqual([
//     new Card('3', 'S'),
//     new Card('3', 'D'),
//     new Card('4', 'H'),
//     new Card('7', 'S'),
//     new Card('7', 'C'),
//     new Card('7', 'D'),
//     new Card('7', 'H'),
//     new Card('8', 'S'),
//     new Card('10', 'D'),
//     new Card('K', 'S'),
//     new Card('A', 'C'),
//     new Card('2', 'S'),
//     new Card('2', 'D'),
//   ]);
// });

// test('Hand - isSorted after sort', () => {
//   hand.sortCards(CHINESE_VERSION);
//   expect(hand.getIsSorted()).toBe(true);
// });

// test('Hand - findCard() - not sorted', () => {
//   expect(hand.findCard('3', 'D')).toBe(10);
// });

// test('Hand - findCard() - sorted/chinese', () => {
//   hand.sortCards(CHINESE_VERSION);
//   expect(hand.findCard('3', 'D', CHINESE_VERSION)).toBe(0);
// });

// test('Hand - findCard() - sorted/viet', () => {
//   hand.sortCards(VIET_VERSION);
//   expect(hand.findCard('3', 'D', VIET_VERSION)).toBe(1);
// });

// test('Hand - discardCard(12)', () => {
//   expect(hand.discardCard(12)).toBe(true);
// });

// test('Hand - discardCard(0)', () => {
//   expect(hand.discardCard(0)).toBe(true);
// });

// test('Hand - discardCard(13)', () => {
//   expect(hand.discardCard(13)).toBe(false);
// });

// test('Hand - discardCard(-1)', () => {
//   expect(hand.discardCard(-1)).toBe(false);
// });
