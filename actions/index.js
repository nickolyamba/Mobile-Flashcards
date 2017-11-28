export const NEXT_CARD = 'NEXT_CARD';

export const nextCard = (cardIdx) => {
    return {
        type: NEXT_CARD,
        cardIdx,
    }
};