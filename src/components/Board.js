import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import Square from './Square';

const drawLineAnimation = keyframes`
  from {
    width: 0%;
  }
  to {
    width: ${props => props.width}%;
  }
`;

const BoardContainer = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
`;

const WinningLine = styled.div`
  position: absolute;
  background-color: #B185EA;
  height: 8px;
  border-radius: 4px;
  width: 0%;
  transform-origin: left center;
  ${({ winningLine }) =>
    winningLine &&
    css`
      top: ${winningLine.top}%;
      left: ${winningLine.left}%;
      width: ${winningLine.width}%;
      transform: rotate(${winningLine.angle}deg);
      animation: ${drawLineAnimation} 1s forwards;
    `}
`;

const Board = ({ squares, onClick, winningSquares, xCharacter, oCharacter }) => {
  console.log("winning: " + winningSquares);
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
    <BoardContainer>
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
      {winningLineProps && <WinningLine winningLine={winningLineProps} />}
    </BoardContainer>
  );
};

export default Board;
