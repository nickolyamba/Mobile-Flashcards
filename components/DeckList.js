import React, { Component } from 'react'
import { StyleSheet, Text, View, FlatList} from 'react-native';
import { white, gray } from '../utils/colors'
import { connect } from "react-redux";
import { initDecks } from "../actions";
import DeckItem from './DeckItem';

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
        backgroundColor: white
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
        backgroundColor: gray,//'rgba(2, 179, 228, 1.0)',
        marginBottom: 5,
        borderWidth: 1
    },
    smallText: {
        fontSize: 20,
        textAlign: 'center',
        color: gray
    },
});

const mapStateToProps = ({decks}) => {
    if(!Object.keys(decks)) return{ decks: [] };

    const deckArray = Object.keys(decks).reduce((deckArray, deckKey)=>{
        if(!deckArray) deckArray = [];
        deckArray.push(decks[deckKey]);
        return deckArray;
    }, []);

    return {
        decks: deckArray
    }
};

export default connect(mapStateToProps, { initDecks })(DeckList);