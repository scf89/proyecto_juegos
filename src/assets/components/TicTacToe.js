  // Estado inicial del juego
export const initialState = {
  board: Array(9).fill(null),
  currentPlayer: 'X',
  movesCount: 0
};

// Función para hacer un movimiento
export function makeMove(state, index) {
  if (state.board[index] !== null) return state;

  const newBoard = [...state.board];
  newBoard[index] = state.currentPlayer;

  return {
    ...state,
    board: newBoard,
    currentPlayer: state.currentPlayer === 'X' ? 'O' : 'X',
    movesCount: state.movesCount + 1
  };
}

// Función para verificar el ganador
export function checkWinner(state) {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (state.board[a] && state.board[a] === state.board[b] && state.board[a] === state.board[c]) {
      return state.board[a];
    }
  }

  if (state.movesCount === 9) {
    return 'Empate';
  }

  return null;
}



  