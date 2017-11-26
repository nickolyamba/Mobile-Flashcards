import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { purple, white } from '../utils/colors'



export default class Deck extends Component {
    static navigationOptions = ({ navigation }) => {
        const { deck } = navigation.state.params;
        return {
            title: `${deck.title}`
        }
    };

    render() {
        const { deck } = this.props.navigation.state.params;
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.largeText}>
                        {deck.title}
                    </Text>
                    <Text style={styles.smallText}>
                        {deck.questions ? deck.questions.length : ''} cards
                    </Text>
                </View>

                <View>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>
                            Add Card
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>
                            Start Quiz
                        </Text>
                    </TouchableOpacity>

                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    buttonText: {
        color: white,
        fontSize: 22,
        textAlign: 'center',
    },
    button: {
        paddingHorizontal: 60,
        paddingVertical: 20,
        backgroundColor: purple,
        alignSelf: 'center',
        borderRadius: 5,
        marginVertical: 10,
    },
    largeText: {
        fontSize: 30,
        textAlign: 'center',
    },
    smallText: {
        fontSize: 20,
        textAlign: 'center',
    }
});