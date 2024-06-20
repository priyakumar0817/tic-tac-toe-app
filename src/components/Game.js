import React from 'react';
import PropTypes from 'prop-types';
import Board from './Board';
import { calculateWinner } from '../gameLogic';
import styled from 'styled-components';
import homeIcon from '../images/home.png';
import resetIcon from '../images/reset.png';
import CharacterSelection from './CharacterSelection';

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const ContentContainer = styled.div`
  width: 100%;
  max-width: 600px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: white;
  border-radius: 10px;
  border: 4px solid #B185EA;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Status = styled.div`
  margin-top: 20px;
  font-size: 24px;
  color: #F68E5F;
  font-weight: 500;
  display: flex;
  align-items: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;
`;

const IconButton = styled.button`
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s ease, transform 0.3s ease;
  color: white;

  &:hover {
    background-color: #1BA4AA; /* Teal hover color */
    transform: scale(1.05);
  }

  &:focus {
    outline: none;
  }

  img {
    width: 20px;
    height: 20px;
  }
`;

const PlayerImage = styled.img`
  width: 40px;
  height: 40px;
`;

const Game = ({ goToMenu, selectedCharacters }) => {
  const [board, setBoard] = React.useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = React.useState(true);

  const handleClick = (index) => {
    const newBoard = board.slice();
    if (calculateWinner(board) || newBoard[index]) return;
    newBoard[index] = isXNext ? selectedCharacters[0].image : selectedCharacters[1].image;
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  const winner = calculateWinner(board);
  let status;
  if (!winner) {
    status = (
      <span>
        Next player: <PlayerImage src={isXNext ? selectedCharacters[0].image : selectedCharacters[1].image} alt="next player" />
      </span>
    );
  } else if (winner.winner === 'Draw')  {
    status = 'It\'s a draw!';
  } else if (winner.winner === 'No Win Possible') {
    status = 'No Possible Win. Game Over';
  } else {
    status = (
      <span>
        Winner: <PlayerImage src={winner.winner === selectedCharacters[0].image ? selectedCharacters[0].image : selectedCharacters[1].image} alt="winner" />
      </span>
    );
  }


  return (
    <GameContainer>
      <ContentContainer>
        <ButtonContainer>
          <IconButton onClick={goToMenu}>
            <img src={homeIcon} alt="Back to Menu" />
          </IconButton>
          <IconButton onClick={resetGame}>
            <img src={resetIcon} alt="Reset Game" />
          </IconButton>
        </ButtonContainer>
        {selectedCharacters.length < 2 ? (
          <CharacterSelection selectCharacter={(character) => {/* No need to set state here */}} />
        ) : (
          <>
            <Board squares={board} onClick={handleClick} winningSquares = {winner ? winner.line: null} xCharacter={selectedCharacters[0].image} oCharacter={selectedCharacters[1].image} />
            <Status>{status}</Status>
          </>
        )}
      </ContentContainer>
    </GameContainer>
  );
};

Game.propTypes = {
  goToMenu: PropTypes.func.isRequired,
  selectedCharacters: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Game;
