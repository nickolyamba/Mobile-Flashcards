import React, { Component }  from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { purple, white, blue } from './utils/colors'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { StackNavigator, TabNavigator } from 'react-navigation'
import DeckList from './components/DeckList';
import Deck from './components/Deck';
import AddDeck from './components/AddDeck';
import AddCard from './components/AddCard';
import Quiz from './components/Quiz';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducers'
import devTools from 'remote-redux-devtools';
import { compose } from 'redux'



const Tab = TabNavigator({
        Decks: {
            screen: DeckList,
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

const MainNavigator = StackNavigator({
    Decks: {
        screen: Tab,
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
    },

    AddCard: {
        screen: AddCard,
        navigationOptions: {
            title: 'Add Card',
            headerTintColor: blue,
            headerStyle: {
                backgroundColor: white,
            }
        }
    },

    Quiz: {
        screen: Quiz,
        navigationOptions: {
            title: 'Quiz',
            headerTintColor: blue,
            headerStyle: {
                backgroundColor: white,
            }
        }
    }


});

// source: https://reactnavigation.org/docs/guides/screen-tracking
// gets the current screen from navigation state
function getCurrentRouteName(navigationState) {
    if (!navigationState) {
        return null;
    }
    const route = navigationState.routes[navigationState.index];
    // dive into nested navigators
    if (route.routes) {
        return getCurrentRouteName(route);
    }
    return route.routeName;
}

export default class App extends Component {
    render() {
        const initState = {quiz: {cardIdx: 0, isLast: false, correctCount: 0, incorrectCount: 0}};
        const store = createStore(reducer, initState);

        console.log(store.getState());

        return (
            <Provider store={store}>
              <View style={styles.container}>
                  <MainNavigator
                      onNavigationStateChange={(prevState, currentState) => {
                          const currentScreen = getCurrentRouteName(currentState);
                          const prevScreen = getCurrentRouteName(prevState);

                          //if(currentScreen === 'DeckList')
                          console.log('currentScreen: ', currentScreen);
                      }}
                  />
              </View>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      marginTop: 22
  },
});
