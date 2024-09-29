class SnakeGame {
  constructor() {
      this.boardSize = 20;
      this.snake = [{ x: 10, y: 10 }];
      this.direction = { x: 0, y: 0 };
      this.food = this.generateFood();
      this.board = document.querySelector('.game-board-snake');
      this.draw(); // Dibuja la serpiente y la comida al iniciar
      console.log(this.food);
      console.log(this.snake);
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
      console.log('move');
      this.draw(); // Redibuja después de mover la serpiente
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

  draw() {
      // Limpiar el tablero
      this.board.innerHTML = '';
      console.log(this.board);

      // Dibujar la serpiente
      this.snake.forEach(segment => {
          const segmentDiv = document.createElement('div');
          segmentDiv.classList.add('snake');
          segmentDiv.style.gridColumnStart = segment.x + 1; 
          segmentDiv.style.gridRowStart = segment.y + 1; 
          this.board.appendChild(segmentDiv);
      });
      console.log(this.board);

      // Dibujar la comida
      const foodDiv = document.createElement('div');
      foodDiv.classList.add('food');
      foodDiv.style.gridColumnStart = this.food.x + 1; 
      foodDiv.style.gridRowStart = this.food.y + 1; 
      this.board.appendChild(foodDiv);
  }
}

export default SnakeGame;
