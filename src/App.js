import React, { useState } from 'react';
import Game from './components/Game';
import Menu from './components/Menu';
import './App.css';

const App = () => {
    const [isGameStarted, setIsGameStarted] = useState(false);

    const startGame = () => {
        setIsGameStarted(true);
    };

    return (
        <div className="App">
            {isGameStarted ? <Game /> : <Menu startGame={startGame} />}
        </div>
    );
};

export default App;
