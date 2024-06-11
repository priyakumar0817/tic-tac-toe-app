export const calculateWinner = (board) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
  
    // Check for a draw
    if (board.every(square => square !== null)) {
      return 'Draw';
    }
  
    // Check for no possible win condition
    if (noPossibleWin(board, lines)) {
      return 'No Win Possible';
    }
  
    return null;
  };
  
  const noPossibleWin = (board, lines) => {
    // Check if there is any line that is still open for winning
    for (let line of lines) {
      const [a, b, c] = line;
      if (board[a] === null || board[b] === null || board[c] === null) {
        return false;
      }
    }
    return true;
  };
  