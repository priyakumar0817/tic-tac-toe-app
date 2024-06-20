import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import CharacterSelection from './CharacterSelection';
import homeIcon from '../images/home.png';
import resetIcon from '../images/reset.png';

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 0 20px; /* Add padding to ensure centering on smaller screens */
  box-sizing: border-box;
`;

const ContentContainer = styled.div`
  width: 100%;
  max-width: 600px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  border: 4px solid #B185EA; /* Teal border */
  display: flex;
  flex-direction: column;
  align-items: center; /* Ensure child elements are centered */

  @media (max-width: 600px) {
    padding: 10px;
  }
  @media (min-width: 769px) and (max-width: 1024px) { 
    padding: 15px;
  }
`;

const Title = styled.h1`
  font-size: 3em;
  color: #1BA4AA;
  margin-bottom: 20px;
  text-align: center;

  @media (max-width: 600px) {
    font-size: 1.5em;
  }
    @media (min-width: 769px) and (max-width: 1024px) {
    font-size: 1.7em;
    
  }
    
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
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
    @media (max-width: 600px) {
    padding: 8px; /* Reduce padding on smaller screens */

    img {
      width: 18px; /* Adjust image size for smaller screens */
      height: 18px;
    }
  }
    
`;

const StartButton = styled.button`
  font-family: 'Fredoka One', cursive;
  padding: 10px 20px;
  font-size: 1.5em;
  color: white;
  background-color: #F68E5F;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #1BA4AA;
    transform: scale(1.01);
  }

  &:focus {
    outline: none;
  }

  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: 600px) {
    font-size: 1em;
    padding: 8px 16px;
  }
  @media (min-width: 769px) and (max-width: 1024px) {
    font-size: 1.2em;
    padding: 8px 16px;
  }
`;

const PlayerImage = styled.img`
  border-radius: 50%;
  width: 50px;
  height: 50px;
  margin: 5px;

  @media (max-width: 600px) {
    width: 40px;
    height: 40px;
  }
  @media (min-width: 769px) and (max-width: 1024px) {
    width: 40px;
    height: 40px;
  }
`;

const Menu = ({ startGame, selectedCharacters, goToMenu }) => {
  const [isSelectingCharacters, setIsSelectingCharacters] = useState(false);
  const [localSelectedCharacters, setLocalSelectedCharacters] = useState(selectedCharacters);
  const [availableCharacters, setAvailableCharacters] = useState([
    { id: 1, name: 'Character 1', image: require('../images/char1.png') },
    { id: 2, name: 'Character 2', image: require('../images/char2.png') },
    { id: 3, name: 'Character 3', image: require('../images/char3.png') },
    // Add more characters as needed
  ]);

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
    setAvailableCharacters([
      { id: 1, name: 'Character 1', image: require('../images/char1.png') },
      { id: 2, name: 'Character 2', image: require('../images/char2.png') },
      { id: 3, name: 'Character 3', image: require('../images/char3.png') },
      // Add more characters as needed
    ]);
    goToMenu();
  };

  const resetCharacters = () => {
    setLocalSelectedCharacters([]);
    setAvailableCharacters([
      { id: 1, name: 'Character 1', image: require('../images/char1.png') },
      { id: 2, name: 'Character 2', image: require('../images/char2.png') },
      { id: 3, name: 'Character 3', image: require('../images/char3.png') },
      // Add more characters as needed
    ]);
  };

  return (
    <MenuContainer>
      {!isSelectingCharacters ? (
        <ContentContainer>
          <Title>Elijah's Tic Tac Toe</Title>
          <StartButton onClick={() => setIsSelectingCharacters(true)}>
            Start Game
          </StartButton>
        </ContentContainer>
      ) : (
        <ContentContainer>
          <ButtonContainer>
            <IconButton onClick={handleBackToMenu}>
              <img src={homeIcon} alt="Back to Menu" />
            </IconButton>
            <IconButton onClick={resetCharacters}>
              <img src={resetIcon} alt="Reset Character Selection" />
            </IconButton>
          </ButtonContainer>
          {localSelectedCharacters.length < 2 ? (
            <>
              <Title>{`Choose Your Character`}</Title>
              <CharacterSelection
                characters={availableCharacters}
                selectCharacter={selectCharacter}
              />
            </>
          ) : (
            <>
              <Title>Characters Selected</Title>
              {localSelectedCharacters.map((character, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                  <p style={{ marginRight: '10px' }}>{`Player ${index + 1}:`}</p>
                  <PlayerImage src={character.image} alt={character.name} />
                </div>
              ))}
              <StartButton onClick={handleStartGame}>
                Start Game
              </StartButton>
            </>
          )}
        </ContentContainer>
      )}
    </MenuContainer>
  );
};

Menu.propTypes = {
  startGame: PropTypes.func.isRequired,
  selectedCharacters: PropTypes.array.isRequired,
  goToMenu: PropTypes.func.isRequired,
};

export default Menu;
