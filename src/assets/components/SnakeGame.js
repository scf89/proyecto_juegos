class SnakeGame {
    constructor() {
      this.boardSize = 20;
      this.snake = [{ x: 10, y: 10 }];
      this.direction = { x: 0, y: 1 };
      this.food = this.generateFood();
    }
  
    moveSnake() {
      const newHead = { 
        x: this.snake[0].x + this.direction.x,
        y: this.snake[0].y + this.direction.y
      };
      this.snake.unshift(newHead);
  
      if (this.isFood(newHead)) {
        this.food = this.generateFood();
      } else {
        this.snake.pop();
      }
    }
  
    changeDirection(newDirection) {
      this.direction = newDirection;
    }
  
    generateFood() {
      return {
        x: Math.floor(Math.random() * this.boardSize),
        y: Math.floor(Math.random() * this.boardSize)
      };
    }
  
    isFood(cell) {
      return cell.x === this.food.x && cell.y === this.food.y;
    }
  
    isGameOver() {
      const head = this.snake[0];
      if (head.x < 0 || head.x >= this.boardSize || head.y < 0 || head.y >= this.boardSize) {
        return true;
      }
      for (let i = 1; i < this.snake.length; i++) {
        if (head.x === this.snake[i].x && head.y === this.snake[i].y) {
          return true;
        }
      }
      return false;
    }
  }
  
  export default SnakeGame;
  