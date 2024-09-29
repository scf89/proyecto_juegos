class TicTacToe {
    constructor() {
      this.board = Array(9).fill(null);
      this.currentPlayer = 'X';
      this.movesCount = 0;
    }
  
    makeMove(index) {
      if (!this.board[index]) {
        this.board[index] = this.currentPlayer;
        this.movesCount++;
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
      }
    }
  
    checkWinner() {
      const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
      ];
  
      for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
          return this.board[a];
        }
      }

      if (this.movesCount === 9) {
        return 'Empate';
      }
  
      return null;
    }
  }
  
  export default TicTacToe;
  