import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Menu = ({ startGame }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to Tic Tac Toe</Text>
            <Button title="Start Game" onPress={startGame} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
});

export default Menu;
