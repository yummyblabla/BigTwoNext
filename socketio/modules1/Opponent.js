class Opponent {
  constructor(name) {
    this.name = name;
    this.numberOfCards = 13;
    this.passed = false;
  }

  getUsername() {
    return this.name;
  }

  decreaseCards(number) {
    this.numberOfCards -= number;
  }

  getNumberOfCards() {
    return this.numberOfCards;
  }
}

export default Opponent;
