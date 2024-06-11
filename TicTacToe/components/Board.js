import React from 'react';
import { View, StyleSheet } from 'react-native';
import Square from './Square';

const Board = ({ squares, onClick }) => {
    const renderSquare = (i) => (
        <Square value={squares[i]} onClick={() => onClick(i)} />
    );

    return (
        <View>
            <View style={styles.boardRow}>
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </View>
            <View style={styles.boardRow}>
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </View>
            <View style={styles.boardRow}>
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    boardRow: {
        flexDirection: 'row',
    },
});

export default Board;
