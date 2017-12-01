import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { white, gray } from '../utils/colors'
import { connect } from "react-redux";
import { initDecks } from "../actions";


const DeckItem = ({deck, navigate}) => {
  return(
      <TouchableOpacity style={styles.card}
                        onPress={() => navigate('Deck', { title: deck.title })}>
          <Text style={styles.buttonLargeText}>
              {deck.title}
          </Text>
          <Text style={styles.buttonSmallText}>
              {deck.questions ? deck.questions.length : ''} cards
          </Text>
      </TouchableOpacity>
  )
};

class DeckList extends Component {
    render() {
        const {navigate} = this.props.navigation;
        const {decks} = this.props;

        if(decks && decks.length === 0){
            return(
                <View style={styles.container}>
                    <Text style={styles.smallText}>
                        {'No decks in storage\nClick right tab to add new deck'}
                    </Text>
                </View>
            );
        }

        return (
            <View style={styles.container}>
                {decks &&
                    <FlatList
                        style={{flex: 1}}
                        data={decks}
                        renderItem={({item}) => <DeckItem deck={item} navigate={navigate}/> }
                        keyExtractor={item => item.title}
                    />
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
        marginTop: 5
    },
    buttonLargeText: {
        color: white,
        fontWeight: 'bold',
        fontSize: 30,
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
        backgroundColor: 'rgba(2, 179, 228, 1.0)',
        borderRadius: 5,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        borderWidth: 1
    },
    smallText: {
        fontSize: 20,
        textAlign: 'center',
        color: gray
    },
});

const mapStateToProps = ({decks}) => {
    if(!Object.keys(decks))
        return{
            decks: []
        };

    const deckArray = Object.keys(decks).reduce((deckArray, deckKey)=>{
        if(!deckArray) deckArray = [];
        deckArray.push(decks[deckKey]);
        return deckArray;
    }, []);

    return {
        decks: deckArray
    }
};

const mapDispatchToProps = dispatch => {
    return {
        initDecks: (decks) => dispatch(initDecks(decks)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(DeckList);