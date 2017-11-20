import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { purple, white } from '../utils/colors'

export default class DeckList extends Component {
    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.button}
                                  onPress={() => navigate('Deck', { cardId: 'cardId #5' })}
                >
                    <Text style={styles.buttonText}>
                        DeckList Go to Deck
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
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