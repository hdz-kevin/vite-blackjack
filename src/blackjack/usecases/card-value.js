/**
 * Returns the numeric value of a card.
 * 
 * @param {string} card 
 * @returns {number} The numerical value of `card`.
 */
export const cardValue = (card) => {
    const prefix = card.substring(0, card.length - 1);

    return isNaN(prefix) ?
            (prefix == "A" ? 11 : 10) :
            (prefix * 1);
};
