import _ from "underscore";

// Exportación individual
// export const name = "Itzel";

/**
 * Create a new shuffled deck.
 * 
 * @param {Array<string>} cardTypes 
 * @param {Array<string>} cardPrefixes 
 * @returns {Array<string>} A new shuffled deck.
 */
export const createDeck = (cardTypes, cardPrefixes) => {
    const deck = [];

    cardPrefixes.forEach(prefix =>
        cardTypes.forEach(type => deck.push(prefix + type))
    );

    return _.shuffle(deck);
};

// Exportación por defecto
// export default createDeck;
