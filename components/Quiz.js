import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { white, gray, blue, green, red } from '../utils/colors'
import { connect } from 'react-redux';
import { updateScore, resetQuiz } from '../actions/index';

class Quiz extends Component {
    state = {showAnswer: false};

    getNextCard = (isCorrect) => {
        const { updateScore, cardIdx } = this.props;
        const { deck } = this.props.navigation.state.params;

        if(cardIdx < deck.questions.length){
            // reset state back to question
            this.setState({showAnswer: false});
            updateScore(cardIdx + 1, isCorrect);
        }
    };

    render() {
        const { deck } = this.props.navigation.state.params;
        const { goBack } = this.props.navigation;
        const { cardIdx, correctCount, resetQuiz } = this.props;
        const { showAnswer } = this.state;

        // if no cards added yet
        if(!deck.questions || deck.questions.length === 0)
            return(
                <View style={styles.container}>
                    <Text style={styles.largeText}>
                        {'No cards in the deck\n Go back to Deck View and add some cards'}
                    </Text>
                </View>
            );

        // if quiz is in progress
        if(deck.questions[cardIdx]){
            return (
                <View style={styles.container}>
                    <Text style={styles.remainCount}>
                        {`Question ${cardIdx+1} out of ${deck.questions.length}`}
                    </Text>

                    <View>
                        <Text style={styles.largeText}>
                            {showAnswer ? deck.questions[cardIdx].answer : deck.questions[cardIdx].question}
                        </Text>

                        <TouchableOpacity style={[styles.button, {backgroundColor: 'transparent'}]}
                                          onPress={() => this.setState({showAnswer: !showAnswer})}>
                            <Text style={[styles.buttonText, {color: blue}]}>
                                {showAnswer ? 'Back to Question' : 'See Answer'}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{marginBottom: 50}}>
                        <TouchableOpacity style={[styles.button, {backgroundColor: green}]}
                                          onPress={() => this.getNextCard(true)}>
                            <Text style={styles.buttonText}>
                                {deck.questions[cardIdx] ? 'Correct' : ''}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, {backgroundColor: red}]}
                                          onPress={() => this.getNextCard(false)}>
                            <Text style={styles.buttonText}>
                                Incorrect
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }

        // Quiz is finished
        else{
            return(
                <View style={[styles.container, {justifyContent: 'space-around'}]}>
                    <View>
                        <Text style={[styles.largeText, {alignSelf: 'flex-start'}]}>
                            {`Quiz Finished\n Your Score: ${correctCount} out of ${cardIdx}`}
                        </Text>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.button}
                                          onPress={() => resetQuiz()}>
                            <Text style={styles.buttonText}>
                                Retake Quiz
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}
                                          onPress={() => {goBack();}}>
                            <Text style={styles.buttonText}>
                                Back to Deck
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    buttonText: {
        color: white,
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    button: {
        width: 200,
        paddingVertical: 20,
        backgroundColor: blue,
        alignSelf: 'center',
        borderRadius: 5,
        marginVertical: 10,
    },
    largeText: {
        marginHorizontal: 10,
        fontSize: 25,
        textAlign: 'center',
    },
    smallText: {
        fontSize: 20,
        textAlign: 'center',
    },
    remainCount: {
        fontSize: 20,
        marginLeft: 10,
        marginTop: 10,
        color: gray,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
    }
});

const mapStateToProps = ({quiz}) => {
    return {
        ...quiz
    }
};

const mapDispatchToProps = dispatch => {
    return {
        updateScore: (cardIdx, isCorrect) => dispatch(updateScore(cardIdx, isCorrect)),
        resetQuiz: () => dispatch(resetQuiz())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);