import React, { Component }  from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { purple, white } from './utils/colors'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { StackNavigator } from 'react-navigation'
import DeckList from './components/DeckList';
import Deck from './components/Deck';


const MainNavigator = StackNavigator({
    Home: {
        screen: DeckList,
    },
    Deck: {
        screen: Deck,
        navigationOptions: {
            headerTintColor: white,
            headerStyle: {
                backgroundColor: purple,
            }
        }
    }
});

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
          <MainNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      paddingTop: 20
  },
});
