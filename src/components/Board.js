import React from 'react';
import Square from './Square';

const Board = ({ squares, onClick, winningSquares, xCharacter, oCharacter }) => {
  const getWinningLineProps = () => {
    if (!winningSquares) return null;

    const [a, b, c] = winningSquares;

    if (a % 3 === b % 3 && b % 3 === c % 3) {
      // Vertical
      return { top: -1, left: a * 33.33 + 17, width: 103, angle: 90 };
    }

    if (Math.floor(a / 3) === Math.floor(b / 3) && Math.floor(b / 3) === Math.floor(c / 3)) {
      // Horizontal
      return { top: Math.floor(a / 3) * 33.33 + 15, left: 0, width: 103, angle: 0 };
    }

    if (a === 0 && c === 8) {
      // Diagonal from top-left to bottom-right
      return { top: 0, left: 0, width: 142, angle: 45 };
    }

    if (a === 2 && c === 6) {
      // Diagonal from top-right to bottom-left
      return { top: 100, left: 0, width: 142, angle: -45 };
    }

    return null;
  };

  const winningLineProps = getWinningLineProps();

  return (
    <div className="relative w-300 h-300 grid grid-cols-3 grid-rows-3">
      {squares.map((value, i) => (
        <Square
          key={i}
          value={value}
          onClick={() => onClick(i)}
          isWinning={winningSquares && winningSquares.includes(i)}
          xCharacter={xCharacter}
          oCharacter={oCharacter}
        />
      ))}
      {winningLineProps && (
        <div
          className="absolute bg-lavenderC h-2  w-0 animate-drawLine"
          style={{
            top: `${winningLineProps.top}%`,
            left: `${winningLineProps.left}%`,
            'width': `${winningLineProps.width}%`,
            transformOrigin: 'left center',
            transform: `rotate(${winningLineProps.angle}deg)`,
          }}
        />
      )}
    </div>
  );
};

export default Board;
