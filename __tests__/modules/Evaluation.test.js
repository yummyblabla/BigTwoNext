import evaluateCards from '../../server/modules/Evaluation';
import Card from '../../server/modules/Card';
import {
  CHINESE_VERSION, VIET_VERSION,
} from '../../server/modules/Helpers/Constants';

test('Evaluate: Singles (null)', () => {
  const cards = [new Card('3', 'D')];
  const currentPlay = null;
  expect(evaluateCards(cards, currentPlay, CHINESE_VERSION)).toBeTruthy();
});

test('Evaluate: Singles #1', () => {
  const cards = [new Card('9', 'D')];
  const currentPlay = [new Card('5', 'S')];
  expect(evaluateCards(cards, currentPlay, CHINESE_VERSION)).toBeTruthy();
});

test('Evaluate: Singles #2 (False)', () => {
  const cards = [new Card('9', 'D')];
  const currentPlay = [new Card('K', 'S')];
  expect(evaluateCards(cards, currentPlay, CHINESE_VERSION)).toBeFalsy();
});

test('Evaluate: Singles #3 (False)', () => {
  const cards = [new Card('9', 'D'), new Card('9', 'C')];
  const currentPlay = [new Card('K', 'S')];
  expect(evaluateCards(cards, currentPlay, CHINESE_VERSION)).toBeFalsy();
});

test('Evaluate: Doubles (null)', () => {
  const cards = [new Card('9', 'D'), new Card('9', 'H')];
  const currentPlay = null;
  expect(evaluateCards(cards, currentPlay, CHINESE_VERSION)).toBeTruthy();
});

test('Evaluate: Doubles (null) - (False)', () => {
  const cards = [new Card('9', 'D'), new Card('A', 'H')];
  const currentPlay = null;
  expect(evaluateCards(cards, currentPlay, CHINESE_VERSION)).toBeFalsy();
});

test('Evaluate: Doubles #1', () => {
  const cards = [new Card('9', 'D'), new Card('9', 'H')];
  const currentPlay = [new Card('8', 'H'), new Card('8', 'S')];
  expect(evaluateCards(cards, currentPlay, CHINESE_VERSION)).toBeTruthy();
});

test('Evaluate: Doubles #2', () => {
  const cards = [new Card('9', 'D'), new Card('9', 'S')];
  const currentPlay = [new Card('9', 'C'), new Card('9', 'H')];
  expect(evaluateCards(cards, currentPlay, CHINESE_VERSION)).toBeTruthy();
});

test('Evaluate: Doubles #3 (False)', () => {
  const cards = [new Card('9', 'D'), new Card('9', 'S')];
  const currentPlay = [new Card('9', 'C'), new Card('9', 'H')];
  expect(evaluateCards(cards, currentPlay, CHINESE_VERSION)).toBeTruthy();
});

test('Evaluate: Doubles #4 (False)', () => {
  const cards = [new Card('9', 'D'), new Card('J', 'S')];
  const currentPlay = [new Card('9', 'C'), new Card('9', 'H')];
  expect(evaluateCards(cards, currentPlay, CHINESE_VERSION)).toBeFalsy();
});

test('Evaluate: Doubles #5 (False) - (Too Many Cards)', () => {
  const cards = [new Card('10', 'D'), new Card('10', 'H'), new Card('10', 'S')];
  const currentPlay = [new Card('9', 'C'), new Card('9', 'H')];
  expect(evaluateCards(cards, currentPlay, CHINESE_VERSION)).toBeFalsy();
});

test('Evaluate: Doubles #5 (False) - (Too Few Cards)', () => {
  const cards = [new Card('10', 'D')];
  const currentPlay = [new Card('9', 'C'), new Card('9', 'H')];
  expect(evaluateCards(cards, currentPlay, CHINESE_VERSION)).toBeFalsy();
});

test('Evaluate: Triples (null)', () => {
  const cards = [new Card('10', 'D'), new Card('10', 'C'), new Card('10', 'H')];
  const currentPlay = null;
  expect(evaluateCards(cards, currentPlay, CHINESE_VERSION)).toBeTruthy();
});

test('Evaluate: Triples (null) (False)', () => {
  const cards = [new Card('10', 'D'), new Card('10', 'C'), new Card('K', 'H')];
  const currentPlay = null;
  expect(evaluateCards(cards, currentPlay, CHINESE_VERSION)).toBeFalsy();
});

test('Evaluate: Triples #1', () => {
  const cards = [new Card('10', 'D'), new Card('10', 'C'), new Card('10', 'H')];
  const currentPlay = [new Card('4', 'D'), new Card('4', 'C'), new Card('4', 'H')];
  expect(evaluateCards(cards, currentPlay, CHINESE_VERSION)).toBeTruthy();
});

test('Evaluate: Triples #2 (False)', () => {
  const cards = [new Card('10', 'D'), new Card('10', 'C'), new Card('10', 'H')];
  const currentPlay = [new Card('Q', 'D'), new Card('Q', 'C'), new Card('Q', 'H')];
  expect(evaluateCards(cards, currentPlay, CHINESE_VERSION)).toBeFalsy();
});

test('Evaluate: Triples #3 (False)', () => {
  const cards = [new Card('10', 'D'), new Card('Q', 'C'), new Card('K', 'H')];
  const currentPlay = [new Card('4', 'D'), new Card('4', 'C'), new Card('4', 'H')];
  expect(evaluateCards(cards, currentPlay, CHINESE_VERSION)).toBeFalsy();
});

test('Evaluate: Triples #4 (False) - (Too Many Cards)', () => {
  const cards = [new Card('10', 'D'), new Card('Q', 'C'), new Card('K', 'H'), new Card('2', 'S')];
  const currentPlay = [new Card('4', 'D'), new Card('4', 'C'), new Card('4', 'H')];
  expect(evaluateCards(cards, currentPlay, CHINESE_VERSION)).toBeFalsy();
});

test('Evaluate: Triples #5 (False) - (Too Few Cards)', () => {
  const cards = [new Card('10', 'D'), new Card('Q', 'C')];
  const currentPlay = [new Card('4', 'D'), new Card('4', 'C'), new Card('4', 'H')];
  expect(evaluateCards(cards, currentPlay, CHINESE_VERSION)).toBeFalsy();
});

test('Evaluate: Five Card Hand (null) - (Straight)', () => {
  const cards = [new Card('5', 'C'), new Card('6', 'H'), new Card('7', 'D'), new Card('8', 'S'), new Card('9', 'C')];
  const currentPlay = null;
  expect(evaluateCards(cards, currentPlay, CHINESE_VERSION)).toBeTruthy();
});

test('Evaluate: Five Card Hand (null) - (Flush)', () => {
  const cards = [new Card('5', 'C'), new Card('7', 'C'), new Card('9', 'C'), new Card('10', 'C'), new Card('Q', 'C')];
  const currentPlay = null;
  expect(evaluateCards(cards, currentPlay, CHINESE_VERSION)).toBeTruthy();
});

test('Evaluate: Five Card Hand (null) - (Full House)', () => {
  const cards = [new Card('5', 'C'), new Card('5', 'H'), new Card('5', 'S'), new Card('10', 'D'), new Card('10', 'C')];
  const currentPlay = null;
  expect(evaluateCards(cards, currentPlay, CHINESE_VERSION)).toBeTruthy();
});

test('Evaluate: Five Card Hand (null) - (Full House #2)', () => {
  const cards = [new Card('5', 'C'), new Card('5', 'H'), new Card('10', 'D'), new Card('10', 'H'), new Card('10', 'S')];
  const currentPlay = null;
  expect(evaluateCards(cards, currentPlay, CHINESE_VERSION)).toBeTruthy();
});

test('Evaluate: Five Card Hand (null) - (FourOfAKind #1)', () => {
  const cards = [new Card('5', 'C'), new Card('10', 'H'), new Card('10', 'D'), new Card('10', 'H'), new Card('10', 'S')];
  const currentPlay = null;
  expect(evaluateCards(cards, currentPlay, CHINESE_VERSION)).toBeTruthy();
});

test('Evaluate: Five Card Hand (null) - (FourOfAKind #2)', () => {
  const cards = [new Card('5', 'C'), new Card('5', 'H'), new Card('5', 'D'), new Card('5', 'H'), new Card('10', 'S')];
  const currentPlay = null;
  expect(evaluateCards(cards, currentPlay, CHINESE_VERSION)).toBeTruthy();
});

test('Evaluate: Five Card Hand (null) - (Straight Flush)', () => {
  const cards = [new Card('3', 'H'), new Card('4', 'H'), new Card('5', 'H'), new Card('6', 'H'), new Card('7', 'H')];
  const currentPlay = null;
  expect(evaluateCards(cards, currentPlay, CHINESE_VERSION)).toBeTruthy();
});

test('Evaluate: Five Card Hand (null) - (Invalid #1)', () => {
  const cards = [new Card('3', 'H'), new Card('4', 'H'), new Card('5', 'H'), new Card('6', 'H'), new Card('8', 'S')];
  const currentPlay = null;
  expect(evaluateCards(cards, currentPlay, CHINESE_VERSION)).toBeFalsy();
});

test('Evaluate: Five Card Hand (null) - (Invalid #2)', () => {
  const cards = [new Card('3', 'H'), new Card('3', 'S'), new Card('5', 'C'), new Card('5', 'H'), new Card('8', 'S')];
  const currentPlay = null;
  expect(evaluateCards(cards, currentPlay, CHINESE_VERSION)).toBeFalsy();
});

test('Evaluate: Five Card Hand (null) - (Invalid #3)', () => {
  const cards = [new Card('3', 'H'), new Card('5', 'D'), new Card('5', 'C'), new Card('5', 'H'), new Card('8', 'S')];
  const currentPlay = null;
  expect(evaluateCards(cards, currentPlay, CHINESE_VERSION)).toBeFalsy();
});

test('Evaluate: Five Card Hand (Straight Against Straight #1)', () => {
  const cards = [new Card('6', 'H'), new Card('7', 'D'), new Card('8', 'C'), new Card('9', 'H'), new Card('10', 'S')];
  const currentPlay = [new Card('5', 'C'), new Card('6', 'H'), new Card('7', 'D'), new Card('8', 'S'), new Card('9', 'C')];
  expect(evaluateCards(cards, currentPlay, CHINESE_VERSION)).toBeTruthy();
});

test('Evaluate: Five Card Hand (Straight Against Straight #2)', () => {
  const cards = [new Card('5', 'C'), new Card('6', 'H'), new Card('7', 'D'), new Card('8', 'S'), new Card('9', 'H')];
  const currentPlay = [new Card('5', 'C'), new Card('6', 'H'), new Card('7', 'D'), new Card('8', 'S'), new Card('9', 'C')];
  expect(evaluateCards(cards, currentPlay, CHINESE_VERSION)).toBeTruthy();
});

test('Evaluate: Five Card Hand (Straight Against Straight #3)', () => {
  const cards = [new Card('5', 'C'), new Card('6', 'H'), new Card('7', 'D'), new Card('8', 'S'), new Card('9', 'D')];
  const currentPlay = [new Card('5', 'C'), new Card('6', 'H'), new Card('7', 'D'), new Card('8', 'S'), new Card('9', 'C')];
  expect(evaluateCards(cards, currentPlay, CHINESE_VERSION)).toBeFalsy();
});

test('Evaluate: Five Card Hand (Flush Against Straight)', () => {
  const cards = [new Card('5', 'C'), new Card('7', 'C'), new Card('9', 'C'), new Card('10', 'C'), new Card('Q', 'C')];
  const currentPlay = [new Card('5', 'C'), new Card('6', 'H'), new Card('7', 'D'), new Card('8', 'S'), new Card('9', 'C')];
  expect(evaluateCards(cards, currentPlay, CHINESE_VERSION)).toBeTruthy();
});

test('Evaluate: Five Card Hand (Full House Against Straight)', () => {
  const cards = [new Card('5', 'C'), new Card('5', 'H'), new Card('5', 'S'), new Card('10', 'C'), new Card('10', 'H')];
  const currentPlay = [new Card('5', 'C'), new Card('6', 'H'), new Card('7', 'D'), new Card('8', 'S'), new Card('9', 'C')];
  expect(evaluateCards(cards, currentPlay, CHINESE_VERSION)).toBeTruthy();
});

test('Evaluate: Five Card Hand (FourOfAKind Against Straight)', () => {
  const cards = [new Card('5', 'D'), new Card('5', 'C'), new Card('5', 'H'), new Card('5', 'S'), new Card('10', 'H')];
  const currentPlay = [new Card('5', 'C'), new Card('6', 'H'), new Card('7', 'D'), new Card('8', 'S'), new Card('9', 'C')];
  expect(evaluateCards(cards, currentPlay, CHINESE_VERSION)).toBeTruthy();
});

test('Evaluate: Five Card Hand (Straight Flush Against Straight)', () => {
  const cards = [new Card('3', 'D'), new Card('4', 'D'), new Card('5', 'D'), new Card('6', 'D'), new Card('7', 'D')];
  const currentPlay = [new Card('5', 'C'), new Card('6', 'H'), new Card('7', 'D'), new Card('8', 'S'), new Card('9', 'C')];
  expect(evaluateCards(cards, currentPlay, CHINESE_VERSION)).toBeTruthy();
});

test('Evaluate: Five Card Hand (Too Few Cards Against Straight)', () => {
  const cards = [new Card('3', 'D'), new Card('3', 'H')];
  const currentPlay = [new Card('5', 'C'), new Card('6', 'H'), new Card('7', 'D'), new Card('8', 'S'), new Card('9', 'C')];
  expect(evaluateCards(cards, currentPlay, CHINESE_VERSION)).toBeFalsy();
});

test('Evaluate: Five Card Hand (Straight Against Flush)', () => {
  const cards = [new Card('5', 'C'), new Card('6', 'H'), new Card('7', 'D'), new Card('8', 'S'), new Card('9', 'C')];
  const currentPlay = [new Card('5', 'C'), new Card('6', 'H'), new Card('7', 'D'), new Card('8', 'S'), new Card('9', 'C')];
  expect(evaluateCards(cards, currentPlay, CHINESE_VERSION)).toBeFalsy();
});

test('Evaluate: Five Card Hand (Flush Against Flush #1)', () => {
  const cards = [new Card('5', 'D'), new Card('7', 'D'), new Card('9', 'D'), new Card('10', 'D'), new Card('Q', 'D')];
  const currentPlay = [new Card('5', 'C'), new Card('7', 'C'), new Card('9', 'C'), new Card('10', 'C'), new Card('Q', 'C')];
  expect(evaluateCards(cards, currentPlay, CHINESE_VERSION)).toBeFalsy();
});

test('Evaluate: Five Card Hand (Flush Against Flush #2)', () => {
  const cards = [new Card('5', 'D'), new Card('7', 'D'), new Card('9', 'D'), new Card('10', 'D'), new Card('K', 'D')];
  const currentPlay = [new Card('5', 'C'), new Card('7', 'C'), new Card('9', 'C'), new Card('10', 'C'), new Card('Q', 'C')];
  expect(evaluateCards(cards, currentPlay, CHINESE_VERSION)).toBeTruthy();
});

test('Evaluate: Five Card Hand (Flush Against Flush #3)', () => {
  const cards = [new Card('5', 'S'), new Card('7', 'S'), new Card('9', 'S'), new Card('10', 'S'), new Card('Q', 'S')];
  const currentPlay = [new Card('5', 'C'), new Card('7', 'C'), new Card('9', 'C'), new Card('10', 'C'), new Card('Q', 'C')];
  expect(evaluateCards(cards, currentPlay, CHINESE_VERSION)).toBeTruthy();
});

test('Evaluate: Five Card Hand (Full House Against Flush)', () => {
  const cards = [new Card('5', 'C'), new Card('5', 'H'), new Card('5', 'S'), new Card('10', 'C'), new Card('10', 'H')];
  const currentPlay = [new Card('5', 'C'), new Card('7', 'C'), new Card('9', 'C'), new Card('10', 'C'), new Card('Q', 'C')];
  expect(evaluateCards(cards, currentPlay, CHINESE_VERSION)).toBeTruthy();
});

test('Evaluate: Five Card Hand (FourOfAKind Against Flush)', () => {
  const cards = [new Card('5', 'D'), new Card('5', 'C'), new Card('5', 'H'), new Card('5', 'S'), new Card('10', 'H')];
  const currentPlay = [new Card('5', 'C'), new Card('7', 'C'), new Card('9', 'C'), new Card('10', 'C'), new Card('Q', 'C')];
  expect(evaluateCards(cards, currentPlay, CHINESE_VERSION)).toBeTruthy();
});

test('Evaluate: Five Card Hand (Straight Flush Against Flush)', () => {
  const cards = [new Card('3', 'D'), new Card('4', 'D'), new Card('5', 'D'), new Card('6', 'D'), new Card('7', 'D')];
  const currentPlay = [new Card('5', 'C'), new Card('7', 'C'), new Card('9', 'C'), new Card('10', 'C'), new Card('Q', 'C')];
  expect(evaluateCards(cards, currentPlay, CHINESE_VERSION)).toBeTruthy();
});

test('Evaluate: Five Card Hand (Straight Against Full House)', () => {
  const cards = [new Card('3', 'D'), new Card('4', 'D'), new Card('5', 'D'), new Card('6', 'D'), new Card('7', 'S')];
  const currentPlay = [new Card('5', 'C'), new Card('5', 'H'), new Card('5', 'S'), new Card('10', 'C'), new Card('10', 'H')];
  expect(evaluateCards(cards, currentPlay, CHINESE_VERSION)).toBeFalsy();
});

test('Evaluate: Five Card Hand (Flush Against Full House)', () => {
  const cards = [new Card('3', 'D'), new Card('4', 'D'), new Card('5', 'D'), new Card('6', 'D'), new Card('10', 'D')];
  const currentPlay = [new Card('5', 'C'), new Card('5', 'H'), new Card('5', 'S'), new Card('10', 'C'), new Card('10', 'H')];
  expect(evaluateCards(cards, currentPlay, CHINESE_VERSION)).toBeFalsy();
});

test('Evaluate: Five Card Hand (Full House Against Full House #1)', () => {
  const cards = [new Card('9', 'C'), new Card('9', 'H'), new Card('9', 'S'), new Card('J', 'C'), new Card('J', 'H')];
  const currentPlay = [new Card('5', 'C'), new Card('5', 'H'), new Card('5', 'S'), new Card('10', 'C'), new Card('10', 'H')];
  expect(evaluateCards(cards, currentPlay, CHINESE_VERSION)).toBeTruthy();
});

test('Evaluate: Five Card Hand (Full House Against Full House #2)', () => {
  const cards = [new Card('4', 'C'), new Card('4', 'H'), new Card('J', 'D'), new Card('J', 'C'), new Card('J', 'H')];
  const currentPlay = [new Card('5', 'C'), new Card('5', 'H'), new Card('5', 'S'), new Card('10', 'C'), new Card('10', 'H')];
  expect(evaluateCards(cards, currentPlay, CHINESE_VERSION)).toBeTruthy();
});

test('Evaluate: Five Card Hand (Full House Against Full House #3)', () => {
  const cards = [new Card('4', 'C'), new Card('4', 'H'), new Card('5', 'D'), new Card('5', 'C'), new Card('5', 'H')];
  const currentPlay = [new Card('9', 'C'), new Card('9', 'H'), new Card('9', 'S'), new Card('10', 'C'), new Card('10', 'H')];
  expect(evaluateCards(cards, currentPlay, CHINESE_VERSION)).toBeFalsy();
});

test('Evaluate: Five Card Hand (FourOfAKind Against Full House)', () => {
  const cards = [new Card('4', 'C'), new Card('5', 'D'), new Card('5', 'C'), new Card('5', 'H'), new Card('5', 'S')];
  const currentPlay = [new Card('9', 'C'), new Card('9', 'H'), new Card('9', 'S'), new Card('10', 'C'), new Card('10', 'H')];
  expect(evaluateCards(cards, currentPlay, CHINESE_VERSION)).toBeTruthy();
});

test('Evaluate: Five Card Hand (Straight Flush Against Full House)', () => {
  const cards = [new Card('3', 'D'), new Card('4', 'D'), new Card('5', 'D'), new Card('6', 'D'), new Card('7', 'D')];
  const currentPlay = [new Card('9', 'C'), new Card('9', 'H'), new Card('9', 'S'), new Card('10', 'C'), new Card('10', 'H')];
  expect(evaluateCards(cards, currentPlay, CHINESE_VERSION)).toBeTruthy();
});

test('Evaluate: Five Card Hand (Too Few Cards Against Full House)', () => {
  const cards = [new Card('4', 'D'), new Card('4', 'C'), new Card('4', 'H')];
  const currentPlay = [new Card('9', 'C'), new Card('9', 'H'), new Card('9', 'S'), new Card('10', 'C'), new Card('10', 'H')];
  expect(evaluateCards(cards, currentPlay, CHINESE_VERSION)).toBeFalsy();
});

test('Evaluate: Five Card Hand (Straight Against FourOfAKind)', () => {
  const cards = [new Card('3', 'D'), new Card('4', 'D'), new Card('5', 'D'), new Card('6', 'D'), new Card('7', 'S')];
  const currentPlay = [new Card('9', 'D'), new Card('9', 'C'), new Card('9', 'H'), new Card('9', 'S'), new Card('10', 'H')];
  expect(evaluateCards(cards, currentPlay, CHINESE_VERSION)).toBeFalsy();
});

test('Evaluate: Five Card Hand (Flush Against FourOfAKind)', () => {
  const cards = [new Card('3', 'D'), new Card('4', 'D'), new Card('5', 'D'), new Card('Q', 'D'), new Card('K', 'D')];
  const currentPlay = [new Card('9', 'D'), new Card('9', 'C'), new Card('9', 'H'), new Card('9', 'S'), new Card('10', 'H')];
  expect(evaluateCards(cards, currentPlay, CHINESE_VERSION)).toBeFalsy();
});

test('Evaluate: Five Card Hand (Full House Against FourOfAKind)', () => {
  const cards = [new Card('4', 'C'), new Card('4', 'H'), new Card('5', 'D'), new Card('5', 'C'), new Card('5', 'H')];
  const currentPlay = [new Card('9', 'D'), new Card('9', 'C'), new Card('9', 'H'), new Card('9', 'S'), new Card('10', 'H')];
  expect(evaluateCards(cards, currentPlay, CHINESE_VERSION)).toBeFalsy();
});

test('Evaluate: Five Card Hand (FourOfAKind Against FourOfAKind #1)', () => {
  const cards = [new Card('4', 'C'), new Card('5', 'D'), new Card('5', 'C'), new Card('5', 'H'), new Card('5', 'S')];
  const currentPlay = [new Card('9', 'D'), new Card('9', 'C'), new Card('9', 'H'), new Card('9', 'S'), new Card('10', 'H')];
  expect(evaluateCards(cards, currentPlay, CHINESE_VERSION)).toBeFalsy();
});

test('Evaluate: Five Card Hand (FourOfAKind Against FourOfAKind #2)', () => {
  const cards = [new Card('4', 'C'), new Card('K', 'D'), new Card('K', 'C'), new Card('K', 'H'), new Card('K', 'S')];
  const currentPlay = [new Card('9', 'D'), new Card('9', 'C'), new Card('9', 'H'), new Card('9', 'S'), new Card('10', 'H')];
  expect(evaluateCards(cards, currentPlay, CHINESE_VERSION)).toBeTruthy();
});

test('Evaluate: Five Card Hand (FourOfAKind Against FourOfAKind #3)', () => {
  const cards = [new Card('J', 'D'), new Card('J', 'C'), new Card('J', 'H'), new Card('J', 'S'), new Card('4', 'C')];
  const currentPlay = [new Card('9', 'D'), new Card('9', 'C'), new Card('9', 'H'), new Card('9', 'S'), new Card('10', 'H')];
  expect(evaluateCards(cards, currentPlay, CHINESE_VERSION)).toBeTruthy();
});

test('Evaluate: Five Card Hand (Straight Flush Against FourOfAKind)', () => {
  const cards = [new Card('3', 'D'), new Card('4', 'D'), new Card('5', 'D'), new Card('6', 'D'), new Card('7', 'D')];
  const currentPlay = [new Card('9', 'D'), new Card('9', 'C'), new Card('9', 'H'), new Card('9', 'S'), new Card('10', 'H')];
  expect(evaluateCards(cards, currentPlay, CHINESE_VERSION)).toBeTruthy();
});

test('Evaluate: Five Card Hand (Too Few Cards Against FourOfAKind)', () => {
  const cards = [new Card('3', 'D'), new Card('3', 'H')];
  const currentPlay = [new Card('9', 'D'), new Card('9', 'C'), new Card('9', 'H'), new Card('9', 'S'), new Card('10', 'H')];
  expect(evaluateCards(cards, currentPlay, CHINESE_VERSION)).toBeFalsy();
});

test('Evaluate: Five Card Hand (Straight Against Straight Flush)', () => {
  const cards = [new Card('10', 'D'), new Card('J', 'D'), new Card('Q', 'D'), new Card('K', 'D'), new Card('A', 'S')];
  const currentPlay = [new Card('5', 'D'), new Card('6', 'D'), new Card('7', 'D'), new Card('8', 'D'), new Card('9', 'D')];
  expect(evaluateCards(cards, currentPlay, CHINESE_VERSION)).toBeFalsy();
});

test('Evaluate: Five Card Hand (Flush Against Straight Flush)', () => {
  const cards = [new Card('9', 'D'), new Card('J', 'D'), new Card('Q', 'D'), new Card('K', 'D'), new Card('A', 'D')];
  const currentPlay = [new Card('5', 'D'), new Card('6', 'D'), new Card('7', 'D'), new Card('8', 'D'), new Card('9', 'D')];
  expect(evaluateCards(cards, currentPlay, CHINESE_VERSION)).toBeFalsy();
});

test('Evaluate: Five Card Hand (Full House Against Straight Flush)', () => {
  const cards = [new Card('4', 'C'), new Card('4', 'H'), new Card('5', 'D'), new Card('5', 'C'), new Card('5', 'H')];
  const currentPlay = [new Card('5', 'D'), new Card('6', 'D'), new Card('7', 'D'), new Card('8', 'D'), new Card('9', 'D')];
  expect(evaluateCards(cards, currentPlay, CHINESE_VERSION)).toBeFalsy();
});

test('Evaluate: Five Card Hand (FourOfAKind Against Straight Flush)', () => {
  const cards = [new Card('J', 'D'), new Card('J', 'C'), new Card('J', 'H'), new Card('J', 'S'), new Card('4', 'C')];
  const currentPlay = [new Card('5', 'D'), new Card('6', 'D'), new Card('7', 'D'), new Card('8', 'D'), new Card('9', 'D')];
  expect(evaluateCards(cards, currentPlay, CHINESE_VERSION)).toBeFalsy();
});

test('Evaluate: Five Card Hand (Straight Flush Against Straight Flush #1)', () => {
  const cards = [new Card('3', 'D'), new Card('4', 'D'), new Card('5', 'D'), new Card('6', 'D'), new Card('7', 'D')];
  const currentPlay = [new Card('5', 'D'), new Card('6', 'D'), new Card('7', 'D'), new Card('8', 'D'), new Card('9', 'D')];
  expect(evaluateCards(cards, currentPlay, CHINESE_VERSION)).toBeFalsy();
});

test('Evaluate: Five Card Hand (Straight Flush Against Straight Flush #2)', () => {
  const cards = [new Card('5', 'C'), new Card('6', 'C'), new Card('7', 'C'), new Card('8', 'C'), new Card('9', 'C')];
  const currentPlay = [new Card('5', 'H'), new Card('6', 'H'), new Card('7', 'H'), new Card('8', 'H'), new Card('9', 'H')];
  expect(evaluateCards(cards, currentPlay, CHINESE_VERSION)).toBeFalsy();
});

test('Evaluate: Five Card Hand (Straight Flush Against Straight Flush #3)', () => {
  const cards = [new Card('5', 'S'), new Card('6', 'S'), new Card('7', 'S'), new Card('8', 'S'), new Card('9', 'S')];
  const currentPlay = [new Card('5', 'H'), new Card('6', 'H'), new Card('7', 'H'), new Card('8', 'H'), new Card('9', 'H')];
  expect(evaluateCards(cards, currentPlay, CHINESE_VERSION)).toBeTruthy();
});

test('Evaluate: Five Card Hand (Straight Flush Against Straight Flush #4)', () => {
  const cards = [new Card('6', 'S'), new Card('7', 'S'), new Card('8', 'S'), new Card('9', 'S'), new Card('10', 'S')];
  const currentPlay = [new Card('5', 'H'), new Card('6', 'H'), new Card('7', 'H'), new Card('8', 'H'), new Card('9', 'H')];
  expect(evaluateCards(cards, currentPlay, CHINESE_VERSION)).toBeTruthy();
});
