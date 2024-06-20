import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const CharacterList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;

  @media (max-width: 600px) {
    gap: 10px;
    margin-top: 0px;
  }
`;

const CharacterItem = styled.div`
  margin: 10px;
  text-align: center;
  cursor: pointer;
  width: 150px;

  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 2px solid transparent;
    transition: border-color 0.3s ease;

    &:hover {
      border-color: #1BA4AA;
    }
  }

  p {
    margin-top: 5px;
    font-size: 16px;
    color: #333;
  }

  @media (max-width: 600px) {
    width: 30px;

    img {
      width: 50px;
      height: 50px;
    }

    p {
      font-size: 14px;
    }
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    width: 60px;

    img {
      width: 80px;
      height: 80px;
    }

    p {
      font-size: 10px;
    }
  }
`;

const CharacterSelection = ({ characters, selectCharacter }) => {
  if (!characters || characters.length === 0) {
    return <p>No characters available</p>;
  }

  const handleCharacterSelect = (characterId) => {
    const selectedCharacter = characters.find((char) => char.id === characterId);
    if (selectedCharacter) {
      selectCharacter(selectedCharacter);
    }
  };

  return (
    <div>
      <CharacterList>
        {characters.map((character) => (
          <CharacterItem key={character.id} onClick={() => handleCharacterSelect(character.id)}>
            <img src={character.image} alt={character.name} />
          </CharacterItem>
        ))}
      </CharacterList>
    </div>
  );
};

CharacterSelection.propTypes = {
  characters: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    })
  ),
  selectCharacter: PropTypes.func.isRequired,
};

export default CharacterSelection;
