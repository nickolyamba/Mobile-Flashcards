import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { purple, white } from '../utils/colors'



export default class Deck extends Component {
    render() {
        const { cardId } = this.props.navigation.state.params;
        return (
            <View style={styles.container}>
                <Text>{cardId}</Text>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>
                        Quiz
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>
                        Add Question
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: white,
        fontSize: 22,
        textAlign: 'center',
    },
    button: {
        padding: 10,
        backgroundColor: purple,
        alignSelf: 'center',
        borderRadius: 5,
        margin: 20,
    },
});