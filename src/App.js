// App.js

import React, { useState } from 'react';
import Game from './components/Game';
import Menu from './components/Menu';
import './App.css';

const App = () => {
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [selectedCharacters, setSelectedCharacters] = useState([]);
    const startGame = (characters) => {
        console.log("Selected Characters:", characters);
        setSelectedCharacters(characters);
        setIsGameStarted(true);
    };

    const goToMenu = () => {
        setIsGameStarted(false);
        setSelectedCharacters([]); // Reset selected characters when going back to menu
    };

    return (
        <div className="App">
            {isGameStarted ? (
                <Game goToMenu={goToMenu} selectedCharacters={selectedCharacters} />
            ) : (
                <Menu startGame={startGame} selectedCharacters={selectedCharacters} goToMenu={goToMenu} />
            )}
        </div>
    );
};

export default App;
