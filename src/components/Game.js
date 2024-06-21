import React from 'react';
import PropTypes from 'prop-types';
import Board from './Board';
import { calculateWinner } from '../gameLogic';
import homeIcon from '../images/home.png';
import resetIcon from '../images/reset.png';
import CharacterSelection from './CharacterSelection';

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
      <span className="flex flex-col items-center">
        Next player: <img src={isXNext ? selectedCharacters[0].image : selectedCharacters[1].image} alt="next player" className="w-10 h-10 ml-2" />
      </span>
    );
  } else if (winner.winner === 'Draw')  {
    status = 'It\'s a draw!';
  } else if (winner.winner === 'No Win Possible') {
    status = 'No Possible Win. Game Over';
  } else {
    status = (
      <span className="flex flex-col items-center">
        Winner: <img src={winner.winner === selectedCharacters[0].image ? selectedCharacters[0].image : selectedCharacters[1].image} alt="winner" className="w-10 h-10 ml-2" />
      </span>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-lg p-5 rounded-xl border-4 border-purple-400 bg-white shadow-md">
        <div className="flex justify-between w-full mb-5">
          <button onClick={goToMenu} className="p-2 rounded-full hover:bg-teal-400 transition">
            <img src={homeIcon} alt="Back to Menu" className="w-5 h-5" />
          </button>
          <button onClick={resetGame} className="p-2 rounded-full hover:bg-teal-400 transition">
            <img src={resetIcon} alt="Reset Game" className="w-5 h-5" />
          </button>
        </div>
        {selectedCharacters.length < 2 ? (
          <CharacterSelection selectCharacter={(character) => {/* No need to set state here */}} />
        ) : (
          <>
            <Board squares={board} onClick={handleClick} winningSquares={winner ? winner.line : null} xCharacter={selectedCharacters[0].image} oCharacter={selectedCharacters[1].image} />
            <div className="mt-5 text-2xl text-orange-400 font-medium">{status}</div>
          </>
        )}
      </div>
    </div>
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
