import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Square = ({ value, onClick }) => (
    <TouchableOpacity style={styles.square} onPress={onClick}>
        <Text>{value}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    square: {
        width: 100,
        height: 100,
        fontSize: 24,
        borderWidth: 1,
        borderColor: '#000',
        cursor:'pointer',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Square;
