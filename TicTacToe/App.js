import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Game from './components/Game';
import Menu from './components/Menu';

const App = () => {
    const [isGameStarted, setIsGameStarted] = useState(false);

    const startGame = () => {
        setIsGameStarted(true);
    };

    return (
        <View style={styles.body}>
          <View style={styles.container}>
            {isGameStarted ? <Game /> : <Menu startGame={startGame} />}
          </View>
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Arial',
      },
      container: {
        alignItems: 'center',
        textAlign: 'center',
      },
    });
    
    export default App;