import TicTacToe from './src/assets/components/TicTacToe.js';
import BrickBreaker from './src/assets/components/BrickBreaker.js';
import SnakeGame from './src/assets/components/SnakeGame.js';


function checkHash() {
  const hash = window.location.hash.replace('#', ''); 
  if (hash) {
    document.getElementById('menu').style.display = 'none';
  }
}


checkHash();

const routes = {
  'tictactoe': './src/assets/pages/tictactoe.html',
  'brickbreaker': './src/assets/pages/brickbreaker.html',
  'snake': './src/assets/pages/snakegame.html'
};

const contentDiv = document.getElementById('content');

// Función para cargar la página del juego
function loadPage(page) {
  
  document.getElementById('menu').style.display = 'none';
  if (page === 'brickbreaker') {
    document.getElementById('board-tic-tac-toe').style.display = 'none';
    document.getElementById('board-snake').style.display = 'none';
    document.getElementById('board-brickbreaker').style.display = 'block';
    const game = new BrickBreaker();
  }
  if (page === 'tictactoe') { 
    document.getElementById('board-tic-tac-toe').style.display = 'block';
    document.getElementById('board-snake').style.display = 'none';
    document.getElementById('board-brickbreaker').style.display = 'none';
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
          const message = winner === 'Empate' ? '¡El juego ha terminado en empate!' : `${winner} ha ganado!`;
          const tictactoeModal = document.getElementById('tictactoe-modal');
          showModal(tictactoeModal, 'tictactoe-modal-message', 'tictactoe-modal-button', message);
        }
      }
    });
  }
  if (page === 'snake') { 
    document.getElementById('board-tic-tac-toe').style.display = 'none';
    document.getElementById('board-snake').style.display = 'block';
    document.getElementById('board-brickbreaker').style.display = 'none';
    
    // Crear una nueva instancia del juego
    const game = new SnakeGame();

    // Obtener el elemento del tablero
    const boardElement = document.querySelector('.game-board-snake');
    const containerWidth = boardElement.clientWidth;
    const containerHeight = boardElement.clientHeight;

    // Calculamos el tamaño de las celdas basado en el tamaño más pequeño entre el ancho y alto
    const cellSize = Math.min(containerWidth, containerHeight) / game.boardSize;

    // Establecemos el grid con el tamaño de celda calculado
    boardElement.style.gridTemplateColumns = `repeat(${game.boardSize}, ${cellSize}px)`;
    boardElement.style.gridTemplateRows = `repeat(${game.boardSize}, ${cellSize}px)`;
    console.log("Tamaño del tablero:", boardElement.style.gridTemplateColumns, boardElement.style.gridTemplateRows);

    // Configurar los controles del teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowUp') game.changeDirection({ x: 0, y: -1 });
        else if (e.key === 'ArrowDown') game.changeDirection({ x: 0, y: 1 });
        else if (e.key === 'ArrowLeft') game.changeDirection({ x: -1, y: 0 });
        else if (e.key === 'ArrowRight') game.changeDirection({ x: 1, y: 0 });
    });

    // Intervalo de movimiento de la serpiente
    const interval = setInterval(() => {
        game.moveSnake(); // Mover la serpiente
        
        if (game.isGameOver()) {
            clearInterval(interval); // Detener el juego
            const snakeModal = document.getElementById('snake-modal');
            showModal(snakeModal, 'snake-modal-message', 'snake-modal-button', '¡Has perdido!');
        } else {
            game.draw(); // Dibuja la serpiente y la comida
        }
    }, 200);
}
}

// Función para mostrar modal
function showModal(modal, messageId, buttonId, message) {
  const modalMessage = document.getElementById(messageId);
  const closeButton = modal.querySelector('.close-button');
  const acceptButton = modal.querySelector(`#${buttonId}`);

  if (!modal || !modalMessage || !closeButton || !acceptButton) {
    console.error('Uno de los elementos del modal está ausente.');
    return;
  }

  modalMessage.textContent = message;
  modal.style.display = 'flex';  // Mostrar el modal

  const closeModal = () => {
    modal.style.display = 'none';
    location.reload();
  };

  closeButton.onclick = closeModal;
  acceptButton.onclick = closeModal;

  window.onclick = (event) => {
    if (event.target === modal) {
      closeModal();
    }
  };
}

// Manejar clic en los enlaces de navegación
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();  
    const page = e.target.getAttribute('data-page');  
    console.log(page);
    loadPage(page);
    
    window.location.hash = page;  
  });
});


const initialPage = window.location.hash.substring(1);  
if (initialPage) {
  loadPage(initialPage);  // Cargar el juego correspondiente
}