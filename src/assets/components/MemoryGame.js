class MemoryGame {
    constructor() {
      this.cards = [...Array(16).keys()].concat([...Array(16).keys()]);
      this.shuffledCards = this.shuffle(this.cards);
      this.selectedCards = [];
      this.matchedCards = [];
    }
  
    shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }
  
    selectCard(index) {
      if (this.selectedCards.length < 2 && !this.selectedCards.includes(index)) {
        this.selectedCards.push(index);
      }
  
      if (this.selectedCards.length === 2) {
        this.checkMatch();
      }
    }
  
    checkMatch() {
      const [first, second] = this.selectedCards;
      if (this.shuffledCards[first] === this.shuffledCards[second]) {
        this.matchedCards.push(...this.selectedCards);
      }
      this.selectedCards = [];
    }
  
    isGameOver() {
      return this.matchedCards.length === this.shuffledCards.length;
    }
  }
  
  export default MemoryGame;
  