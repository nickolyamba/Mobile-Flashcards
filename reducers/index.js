import { combineReducers } from 'redux'
import { NEXT_CARD, RESET_QUIZ } from '../actions'

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

export default combineReducers({
    quiz
});