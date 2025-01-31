/**
 * Returns the last card in the deck and removes it.
 * 
 * @param {Array<string>} deck
 * @returns {string} The last card in the deck.
 */
export const getCard = (deck) => {
    if (deck.length == 0)
        throw new Error("There are no cards in the deck.");

    return deck.pop();
};
