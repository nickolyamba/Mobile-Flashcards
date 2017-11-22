import { AsyncStorage } from 'react-native'

const APP_STORAGE_KEY = 'MOBILE_FLASHCARDS';

/**
 * Return all of the decks along
 * with their titles, questions,
 * and answers.
 */
const getDecks = async () => {
    try{
        const decks = await AsyncStorage.getItem(APP_STORAGE_KEY);
        return JSON.parse(decks);
    }
    catch(err){
        return err;
    }

};

/**
 *  Take in a single id argument
 *  and return the deck associated
 *  with that id.
 * @param deckKey
 */
const getDeck = async (deckKey) => {
    try{
        const decks = await AsyncStorage.getItem(APP_STORAGE_KEY);
        return JSON.parse(decks)[deckKey];
    }
    catch(err){
       return err
    }
};

/**
 * Take in a single title argument
 * and add it to the decks.
 * @param title
 */
const saveDeckTitle = (title) => {
    return AsyncStorage.mergeItem(APP_STORAGE_KEY, JSON.stringify({
        [title]: {
            title,
            questions: []
        }
    }));
};

/**
 *  Take in two arguments, title and card,
 *  and will add the card to the list of
 *  questions for the deck with
 *  the associated title.
 * @param title
 * @param card
 */
const addCardToDeck = async(title, card) => {
    try{
        const decks = JSON.parse(await AsyncStorage.getItem(APP_STORAGE_KEY));
        const questions = decks[title]['questions'];
        questions.push(card);
        console.log('questions: ', questions);

        return await AsyncStorage.mergeItem(APP_STORAGE_KEY, JSON.stringify({
            [title]: {
                title,
                questions
            }
        }));
    }
    catch (err){
        return err;
    }

};


const removeCardFromDeck = async(title, card) => {
    try{
        const decks = JSON.parse(await AsyncStorage.getItem(APP_STORAGE_KEY));
        const questions = decks[title]['questions'];
        console.log('questions: ', questions);

        return await AsyncStorage.setItem(APP_STORAGE_KEY, JSON.stringify({
            [title]: {
                title,
                questions: questions.filter(savedCard => savedCard.question !== card.question)
            }
        }));
    }
    catch (err){
        return err;
    }

};

export {getDeck, getDecks, saveDeckTitle, addCardToDeck, removeCardFromDeck}

