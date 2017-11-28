import { combineReducers } from 'redux'
import { NEXT_CARD } from '../actions'

function activeCard (state = {}, action) {
    switch (action.type) {
        case NEXT_CARD :
            return {
                ...state,
                ...action.cardIdx,
            };
        default :
            return state
    }
}

export default combineReducers({
    activeCard
});