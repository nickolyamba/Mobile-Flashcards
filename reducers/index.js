import { combineReducers } from 'redux'
import { NEXT_CARD, RESET_QUIZ,
    INIT_DECKS, ADD_DECK, ADD_CARD } from '../actions'

function quiz (state = {}, action) {
    const {type, cardIdx, isCorrect} = action;
    switch (type) {
        case NEXT_CARD:
            const increment = isCorrect ? 1 : 0;
            return {
                ...state,
                    cardIdx,
                    correctCount: state.correctCount + increment
            };

        case RESET_QUIZ:
            return {
                cardIdx: 0,
                correctCount: 0
            };

        default :
            return state
    }
}

function decks (state = {}, action) {
    const {type, decks, deck, title, card} = action;
    switch (type) {
        case INIT_DECKS:
            return {
                ...decks
            };

        case ADD_DECK:
            return {
                ...state, ...deck
            };

        case ADD_CARD:
            const updatedQuestions = questionsArrayCopy(state[title].questions);
            updatedQuestions.push(card);

            return {
                ...state,
                [title]:{
                    ...state[title],
                    questions: updatedQuestions
                }
            };

        default :
            return state
    }
}

const questionsArrayCopy = (array) => {
    const newArray = [];
    for(const obj of array){
        newArray.push({...obj});
    }
    return newArray;
};

export default combineReducers({
    quiz, decks
});