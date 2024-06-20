import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import CharacterSelection from './CharacterSelection';

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
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
`;

const Title = styled.h1`
  font-size: 3em;
  color: #1BA4AA;
  margin-bottom: 20px;
  text-align: center;
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

  img {
    width: 20px;
    height: 20px;
  }
`;

const Menu = ({ startGame }) => {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [selectedCharacters, setSelectedCharacters] = useState([]);
  const [availableCharacters, setAvailableCharacters] = useState([
    { id: 1, name: 'Character 1', image: require('../images/char1.png')},
    { id: 2, name: 'Character 2', image: require('../images/char2.png') },
    { id: 3, name: 'Character 3', image: require('../images/char3.png')},
    // Add more characters as needed
  ]);

  const handleStartGame = () => {
    if (selectedCharacters.length === 2) {
      startGame(selectedCharacters);
      setIsGameStarted(true);
    } else {
      alert('Please select characters for both players before starting the game.');
    }
  };

  const selectCharacter = (character) => {
    setSelectedCharacters([...selectedCharacters, character]);
    setAvailableCharacters(availableCharacters.filter((char) => char.id !== character.id));
  };

  return (
    <MenuContainer>
      {!isGameStarted ? (
        <ContentContainer>
          <Title>Elijah's Tic Tac Toe</Title>
          <StartButton onClick={() => setIsGameStarted(true)}>
            Start Game
          </StartButton>
        </ContentContainer>
      ) : (
        <ContentContainer>
          {selectedCharacters.length < 2 ? (
            <>
              <Title>{`Player ${selectedCharacters.length + 1} Select Your Character`}</Title>
              <CharacterSelection
                characters={availableCharacters}
                selectCharacter={selectCharacter}
              />
            </>
          ) : (
            <>
               <Title>Characters Selected</Title>
              {selectedCharacters.map((character, index) => (
                <div key={index}>
                  <p>{`Player ${index + 1}:`}</p>
                  <img src={character.image} alt={character.name} />
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
};

export default Menu;
