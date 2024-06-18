import TicTacToe from './src/assets/components/TicTacToe.js';
import MemoryGame from './src/assets/components/MemoryGame.js';
import SnakeGame from './src/assets/components/SnakeGame.js';

document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;
  if (path.includes('tictactoe.html')) {
    // Inicializar Tres en Raya
    const game = new TicTacToe();
    const boardElement = document.querySelector('.game-board');
    boardElement.innerHTML = Array(9).fill('').map((_, i) => `<div data-index="${i}"></div>`).join('');
    boardElement.addEventListener('click', (e) => {
      const index = e.target.dataset.index;
      if (index !== undefined) {
        game.makeMove(index);
        e.target.innerText = game.board[index];
        const winner = game.checkWinner();
        if (winner) {
          alert(`${winner} ha ganado!`);
        }
      }
    });
  } else if (path.includes('memorygame.html')) {
    // Inicializar Juego de Memoria
    const game = new MemoryGame();
    const boardElement = document.querySelector('.game-board');
    boardElement.innerHTML = game.shuffledCards.map((_, i) => `<div data-index="${i}"></div>`).join('');
    boardElement.addEventListener('click', (e) => {
      const index = e.target.dataset.index;
      if (index !== undefined) {
        game.selectCard(index);
        e.target.innerText = game.shuffledCards[index];
        if (game.isGameOver()) {
          alert('¡Has ganado el juego de memoria!');
        }
      }
    });
  } else if (path.includes('snakegame.html')) {
    // Inicializar Snake
    const game = new SnakeGame();
    const boardElement = document.querySelector('.game-board');
    boardElement.style.gridTemplateColumns = `repeat(${game.boardSize}, 20px)`;
    boardElement.style.gridTemplateRows = `repeat(${game.boardSize}, 20px)`;
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowUp') game.changeDirection({ x: 0, y: -1 });
      else if (e.key === 'ArrowDown') game.changeDirection({ x: 0, y: 1 });
      else if (e.key === 'ArrowLeft') game.changeDirection({ x: -1, y: 0 });
      else if (e.key === 'ArrowRight') game.changeDirection({ x: 1, y: 0 });
    });

    setInterval(() => {
      game.moveSnake();
      if (game.isGameOver()) {
        alert('¡Has perdido!');
        window.location.reload();
      } else {
        boardElement.innerHTML = '';
        game.snake.forEach(segment => {
          const segmentElement = document.createElement('div');
          segmentElement.style.gridColumnStart = segment.x + 1;
          segmentElement.style.gridRowStart = segment.y + 1;
          segmentElement.classList.add('snake');
          boardElement.appendChild(segmentElement);
        });
        const foodElement = document.createElement('div');
        foodElement.style.gridColumnStart = game.food.x + 1;
        foodElement.style.gridRowStart = game.food.y + 1;
        foodElement.classList.add('food');
        boardElement.appendChild(foodElement);
      }
    }, 200);
  }
});
