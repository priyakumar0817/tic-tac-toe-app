import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CharacterSelection from './CharacterSelection';
import homeIcon from '../images/home.png';
import resetIcon from '../images/reset.png';
import 'tailwindcss/tailwind.css'; 
const initialCharacters = [
  { id: 1, name: 'Character 1', image: require('../images/elijah1.png') },
  { id: 2, name: 'Character 2', image: require('../images/babybear.png') },
  { id: 3, name: 'Character 3', image: require('../images/elijah2.png') },
  { id: 4, name: 'Character 4', image: require('../images/babas.png') },
  { id: 5, name: 'Character 5', image: require('../images/gunnar.png') },
  { id: 6, name: 'Character 6', image: require('../images/joe.png') },
  { id: 7, name: 'Character 7', image: require('../images/billy.png') },
  { id: 8, name: 'Character 8', image: require('../images/suzie.png') },
  // Add more characters as needed
];

const Menu = ({ startGame, selectedCharacters, goToMenu }) => {
  const [isSelectingCharacters, setIsSelectingCharacters] = useState(false);
  const [localSelectedCharacters, setLocalSelectedCharacters] = useState(selectedCharacters);
  const [availableCharacters, setAvailableCharacters] = useState(initialCharacters);

  const handleStartGame = () => {
    if (localSelectedCharacters.length === 2) {
      startGame(localSelectedCharacters);
    } else {
      alert('Please select characters for both players before starting the game.');
    }
  };

  const selectCharacter = (character) => {
    setLocalSelectedCharacters([...localSelectedCharacters, character]);
    setAvailableCharacters(availableCharacters.filter((char) => char.id !== character.id));
  };

  const handleBackToMenu = () => {
    setIsSelectingCharacters(false);
    setLocalSelectedCharacters([]);
    setAvailableCharacters(initialCharacters);
    goToMenu();
  };

  const resetCharacters = () => {
    setLocalSelectedCharacters([]);
    setAvailableCharacters(initialCharacters);
  };

  return (
<div className="flex flex-col items-center justify-center min-h-screen p-5 ">
  {!isSelectingCharacters ? (
    <div className="flex flex-col items-center w-full max-w-lg p-5 rounded-xl border-4 border-purple-400 bg-white">
      <h1 className="text-4xl text-teal text-center mb-5">Elijah's Tic Tac Toe</h1>
      <button
        className="flex items-center gap-2 px-8 py-3 text-2xl text-white bg-orangeC rounded-full hover:bg-teal transition-transform transform hover:scale-105"
        onClick={() => setIsSelectingCharacters(true)}
      >
        Start Game
      </button>
    </div>
      ) : (
        <div className="flex flex-col items-center w-full max-w-lg p-5 rounded-xl border-4 border-purple-400 shadow-md bg-white">
          <div className="flex justify-between w-full mb-5">
            <button className="p-2 rounded-full hover:bg-tealC transition" onClick={handleBackToMenu}>
              <img src={homeIcon} alt="Back to Menu" className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-full hover:bg-tealC transition" onClick={resetCharacters}>
              <img src={resetIcon} alt="Reset Character Selection" className="w-5 h-5" />
            </button>
          </div>
          {localSelectedCharacters.length < 2 ? (
            <>
              <h1 className="text-2xl text-tealC text-center mb-5">Choose Your Character</h1>
              <CharacterSelection
                characters={availableCharacters}
                selectCharacter={selectCharacter}
              />
            </>
          ) : (
            <>
              <h1 className="text-2xl text-tealC text-center mb-5">Characters Selected</h1>
              {localSelectedCharacters.map((character, index) => (
                <div key={index} className="flex items-center mb-2">
                  <p className="mr-2">{`Player ${index + 1}:`}</p>
                  <img src={character.image} alt={character.name} className="w-12 h-12 rounded-full" />
                </div>
              ))}
              <button
                className="flex items-center gap-2 px-8 py-3 text-2xl text-white bg-orangeC rounded-full hover:bg-tealC transition-transform transform hover:scale-105"
                onClick={handleStartGame}
              >
                Start Game
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
  
};

Menu.propTypes = {
  startGame: PropTypes.func.isRequired,
  selectedCharacters: PropTypes.array.isRequired,
  goToMenu: PropTypes.func.isRequired,
};

export default Menu;
