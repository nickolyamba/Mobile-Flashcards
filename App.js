import React, { Component }  from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { purple, white, blue } from './utils/colors'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { StackNavigator, TabNavigator } from 'react-navigation'
import DeckList from './components/DeckList';
import Deck from './components/Deck';
import AddDeck from './components/AddDeck';


const MainNavigator = StackNavigator({
    Home: {
        screen: DeckList,
        navigationOptions: {
            header: null
        },
    },
    Deck: {
        screen: Deck,
        navigationOptions: {
            headerTintColor: blue,
            headerStyle: {
                backgroundColor: white,
            }
        }
    }
});

const Tab = TabNavigator({
        MainNavigator: {
            screen: MainNavigator,
            navigationOptions: {
                tabBarLabel: 'Decks',
                tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
            },
        },
        AddDeck: {
            screen: AddDeck,
            navigationOptions: {
                tabBarLabel: 'New Deck',
                tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
            },
        },
    },

    // options source: UdaciFitness App and
    // https://reactnavigation.org/docs/navigators/tab
    {
        navigationOptions: {
            header: null
        },
        tabBarOptions: {
            activeTintColor: Platform.OS === 'ios' ? blue : white,
            style: {
                height: 56,
                backgroundColor: Platform.OS === 'ios' ? white : blue,
                shadowColor: 'rgba(0, 0, 0, 0.24)',
                shadowOffset: {
                    width: 0,
                    height: 3
                },
                shadowRadius: 6,
                shadowOpacity: 1
            },
            labelStyle: {
                fontSize: 20,
                fontWeight: 'bold'
            }
        }
    }
);

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
          <Tab />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      marginTop: 22
  },
});
