import React, { Component }  from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducers'
import { applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import { fetchDecks } from "./actions";
import { setLocalNotification } from './utils/notifications'
import {MainNavigator} from "./components/Navigators";

export default class App extends Component {
    componentDidMount(){
        setLocalNotification();
    }

    render() {
        const initState = {quiz: {cardIdx: 0, isLast: false, correctCount: 0, incorrectCount: 0}};
        const store = createStore(reducer, initState, applyMiddleware(thunk));

        // initialize decks from AsyncStorage
        store.dispatch(fetchDecks());

        return (
            <Provider store={store}>
              <View style={styles.container}>
                  <MainNavigator />
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
