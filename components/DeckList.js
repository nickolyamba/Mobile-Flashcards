import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { purple, white } from '../utils/colors'
import { getDecks, getDeck, saveDeckTitle, addCardToDeck, removeCardFromDeck} from '../utils/storage';
import { connect } from "react-redux";
import { initDecks } from "../actions";


const DeckItem = ({deck, navigate}) => {
  return(
      <TouchableOpacity style={styles.card}
                        onPress={() => navigate('Deck', { title: deck.title })}
      >
          <Text style={styles.buttonLargeText}>
              {deck.title}
          </Text>
          <Text style={styles.buttonSmallText}>
              {deck.questions ? deck.questions.length : ''} cards
          </Text>
      </TouchableOpacity>
  )
};

renderHeader = () => {
    return(
        <Text style={{color: purple, fontSize: 25}}>
            Decks
        </Text>);
};

class DeckList extends Component {
    //state = {decks: []};

    componentDidMount(){
        // saveDeckTitle('JavaScript');
        // addCardToDeck('Udacity', card).catch(err => console.error(err));
        // removeCardFromDeck('Udacity', card).catch(err => console.error(err));
        const {initDecks} = this.props;
        getDecks().then(decks => {
            if(decks) initDecks(decks);
        }).catch(err => console.log(err));
    }

    render() {
        const {navigate} = this.props.navigation;
        const {decks} = this.props;
        return (
            <View style={styles.container}>
                {decks &&
                    <FlatList
                        style={{flex: 1}}
                        data={decks}
                        renderItem={({item}) => <DeckItem deck={item} navigate={navigate}/> }
                        keyExtractor={item => item.title}
                        // ListHeaderComponent={this.renderHeader}
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
    }
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