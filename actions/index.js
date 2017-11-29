export const NEXT_CARD = 'NEXT_CARD';
export const RESET_QUIZ = 'RESET_QUIZ';

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