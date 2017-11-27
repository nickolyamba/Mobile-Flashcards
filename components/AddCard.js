import React, { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity, TextInput,
         KeyboardAvoidingView } from 'react-native';
import { blue, white } from '../utils/colors'
import { addCardToDeck } from '../utils/storage';

export default class AddCard extends Component {
    state = {question: '', answer: ''};

    createCard = (deck, goBack) => {
        const { question, answer } = this.state;
        addCardToDeck(deck.title, {question, answer}).then(() => goBack())
            .catch(err => console.error(err));
    };

    render() {
        const { deck } = this.props.navigation.state.params;
        const { goBack } = this.props.navigation;

        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <TextInput value={this.state.question} style={styles.textInput}
                           autogrow={true}
                           onChangeText={question => this.setState({question})}
                           placeholder = 'Enter Question'
                           multiline={true}
                           numberOfLines = {2}/>

                <TextInput value={this.state.answer} style={styles.textInput}
                           autogrow={true}
                           onChangeText={answer => this.setState({answer})}
                           placeholder = 'Enter Answer'
                           multiline={true}
                           numberOfLines = {2}/>
                
                <TouchableOpacity style={styles.button} onPress={() => this.createCard(deck, goBack)}>
                    <Text style={styles.buttonText}>
                        Submit
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
        //marginTop: 20
    },
    buttonText: {
        color: white,
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    button: {
        paddingHorizontal: 40,
        paddingVertical: 15,
        backgroundColor: blue,
        alignSelf: 'center',
        borderRadius: 5,
        marginVertical: 10,
    },
    titleText: {
        fontSize: 20,
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