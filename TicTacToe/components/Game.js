import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Board from './Board';
import { calculateWinner } from '../gameLogic';

const Game = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const handleClick = (index) => {
    const newBoard = [...board];
    if (calculateWinner(board) || newBoard[index]) return;
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const winner = calculateWinner(board);
  let status;
  if (winner === 'Draw') {
    status = "It's a draw!";
  } else if (winner === 'No Win Possible') {
    status = 'No Possible Win. Game Over';
  } else if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next player: ${isXNext ? 'X' : 'O'}`;
  }

  return (
    <View>
      <Board squares={board} onClick={handleClick} />
      <Text style={styles.status}>{status}</Text>
    </View>
  );
};

const styles = {
  status: {
    marginTop: 20,
    fontSize: 24,
    textAlign: 'center',
  },
};

export default Game;
