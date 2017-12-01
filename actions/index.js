export const NEXT_CARD = 'NEXT_CARD';
export const RESET_QUIZ = 'RESET_QUIZ';
export const INIT_DECKS = 'INIT_DECKS';
export const ADD_DECK = 'ADD_DECK';
export const ADD_CARD = 'ADD_CARD';

export const resetQuiz = () => {
    return {
        type: RESET_QUIZ
    }
};

export const updateScore = (cardIdx, isCorrect) => {
    return {
        type: NEXT_CARD,
        cardIdx,
        isCorrect
    }
};

export const initDecks = (decks) => {
    return {
        type: INIT_DECKS,
        decks
    }
};

export const addDeck = (title) => {
    return {
        type: ADD_DECK,
        deck: {
            [title]: {
                title,
                questions: []
            }
        }
    }
};

export const addCard = (title, card) => {
    return {
        type: ADD_CARD,
        title,
        card
    }
};