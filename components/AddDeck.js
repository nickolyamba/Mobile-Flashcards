import React, { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity, TextInput,
         KeyboardAvoidingView, ToastAndroid } from 'react-native';
import { blue, white } from '../utils/colors'
import { saveDeckTitle } from '../utils/storage';
import { connect } from "react-redux";
import { addDeck } from "../actions";

class AddDeck extends Component {
    state = {deckInput: ''};

    createDeck = () => {
        // Pressing the button correctly creates the deck and
        // routes the user to the Individual Deck view for the new deck.
        const {addDeck} = this.props;
        const deck = this.state.deckInput;

        saveDeckTitle(deck).then(() => {
            addDeck(deck);
            ToastAndroid.showWithGravityAndOffset(`Deck ${deck} is added!`,
                ToastAndroid.LONG, ToastAndroid.CENTER, 25, 50);
        }).catch(err => {
            ToastAndroid.showWithGravityAndOffset('Error during saving: Deck is NOT saved!',
                ToastAndroid.LONG, ToastAndroid.CENTER, 25, 50);
            console.error(err);
        });

        this.setState({deckInput: ''});


    };

    render() {
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <Text style={styles.titleText}>Enter New Deck Title:</Text>
                <TextInput value={this.state.deckInput} style={styles.textInput}
                           autogrow={true}
                           onChangeText={deckInput => this.setState({deckInput})}/>
                <TouchableOpacity style={styles.button} onPress={() => this.createDeck()}>
                    <Text style={styles.buttonText}>
                        Add Deck
                    </Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
    },
    buttonText: {
        color: white,
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    button: {
        paddingHorizontal: 60,
        paddingVertical: 20,
        backgroundColor: blue,
        alignSelf: 'center',
        borderRadius: 5,
        marginVertical: 10,
    },
    titleText: {
        fontSize: 30,
        textAlign: 'center',
    },
    smallText: {
        fontSize: 20,
        textAlign: 'center',
    },
    textInput:{
        fontSize: 20,
        marginHorizontal: 20,
        marginVertical: 20,
        padding: 10
    }
});

const mapDispatchToProps = dispatch => {
    return {
        addDeck: (deckTitle) => dispatch(addDeck(deckTitle)),
    }
};

export default connect(null, mapDispatchToProps)(AddDeck);