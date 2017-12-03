import {blue, white} from "../utils/colors";
import {StackNavigator, TabNavigator} from "react-navigation";
import Deck from "./Deck";
import AddDeck from "./AddDeck";
import Quiz from "./Quiz";
import AddCard from "./AddCard";
import {Platform} from "react-native";
import DeckList from "./DeckList";

const TabNav = TabNavigator({
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

export const MainNavigator = StackNavigator({
    Decks: {
        screen: TabNav,
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