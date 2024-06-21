import React from 'react';
import PropTypes from 'prop-types';

const CharacterSelection = ({ characters, selectCharacter }) => (
  <div className="flex flex-wrap justify-center">
    {characters.map((character) => (
      <div
        key={character.id}
        className="m-2 text-center cursor-pointer"
        onClick={() => selectCharacter(character)}
      >
        <img
          src={character.image}
          alt={character.name}
          className="w-24 h-24 rounded-full border-2 border-orangeC hover: transition-transform transform hover:scale-105"
        />
      </div>
    ))}
  </div>
);

CharacterSelection.propTypes = {
  characters: PropTypes.array.isRequired,
  selectCharacter: PropTypes.func.isRequired,
};

export default CharacterSelection;
