import React, { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity, Animated } from 'react-native';
import { white, gray } from '../utils/colors'

class DeckItem extends Component {
    state = {bounceValue: new Animated.Value(1)};

    componentDidMount(){
        const {bounceValue} = this.state;

        // reused from UdaciFitness app
        Animated.sequence([
            Animated.timing(bounceValue, { duration: 300, toValue: 1.10}),
            Animated.spring(bounceValue, { toValue: 1, friction: 5})
        ]).start();
    }

    navigateToDeck = () => {
        const {deck, navigate} = this.props;
        const {bounceValue} = this.state;

        Animated.sequence([
            Animated.timing(bounceValue, { duration: 100, toValue: 1.50}),
            Animated.spring(bounceValue, { toValue: 1, bounciness: 10, speed: 70})
        ]).start(()=>navigate('Deck', { title: deck.title }));

    };

    render() {
        const {deck} = this.props;
        const {bounceValue} = this.state;

        return (
            <Animated.View style={[styles.container, {transform: [{scale: bounceValue}]}]}>
                <TouchableOpacity style={[styles.card]}
                                  onPress={() => this.navigateToDeck()}>
                    <Text style={styles.buttonLargeText}>
                        {deck.title}
                    </Text>
                    <Text style={styles.buttonSmallText}>
                        {deck.questions ? deck.questions.length : ''} cards
                    </Text>
                </TouchableOpacity>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    buttonLargeText: {
        color: white,
        fontWeight: 'bold',
        fontSize: 25,
        textAlign: 'center',
    },
    buttonSmallText: {
        color: white,
        fontSize: 20,
        textAlign: 'center',
    },
    card: {
        flex: 1,
        paddingVertical: 20,
        backgroundColor: gray,
        marginBottom: 5,
        borderWidth: 1
    }
});

export default DeckItem;