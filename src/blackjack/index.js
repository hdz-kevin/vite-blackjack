// import { createDeck as newDeck } from "./usecases/create-deck";
//   default export, { individual export }
// import createDeck, { name } from "./usecases/create-deck";

import { createDeck, getCard, cardValue } from "./usecases";

// C = Clubs - Treboles
// D = Diamons - Diamantes
// H = Hearts - Corazones
// S = Spades - Espadas
const cardTypes = ["C", "D", "H", "S"];
const cardPrefixes = [2, 3, 4, 5, 6, 7, 8, 9, 10, "A", "J", "K", "Q"];
let deck = [];

const newGameBtn = document.querySelector("#new-game");
const getCardBtn = document.querySelector("#get-card");
const stopBtn = document.querySelector("#stop");
const humanCards = document.querySelector("#human-cards");
const computerCards = document.querySelector("#computer-cards");
const PLAYERS = Object.freeze({
    HUMAN: "human",
    COMPUTER: "computer",
});
const scoresHTML = {
    [PLAYERS.HUMAN]: document.querySelector("#human-score"),
    [PLAYERS.COMPUTER]: document.querySelector("#computer-score"),
};
const scores = {
    [PLAYERS.HUMAN]: 0,
    [PLAYERS.COMPUTER]: 0,
};

const startGame = () => {
    deck = createDeck(cardTypes, cardPrefixes);
    scores[PLAYERS.HUMAN] = scores[PLAYERS.COMPUTER] = 0;
    scoresHTML[PLAYERS.HUMAN].textContent = scores[PLAYERS.HUMAN];
    scoresHTML[PLAYERS.COMPUTER].textContent = scores[PLAYERS.COMPUTER];

    while (humanCards.hasChildNodes()) {
        humanCards.removeChild(humanCards.firstChild);
    }
    while (computerCards.hasChildNodes()) {
        computerCards.removeChild(computerCards.firstChild);
    }

    getCardBtn.disabled = false;
    stopBtn.disabled = false;
};

newGameBtn.addEventListener("click", startGame);

getCardBtn.addEventListener("click", () => {
    const card = getCard(deck);
    accumulateScore(PLAYERS.HUMAN, cardValue(card));
    createCardImg(PLAYERS.HUMAN, card);

    if (scores[PLAYERS.HUMAN] >= 21) {
        getCardBtn.disabled = true;
        stopBtn.disabled = true;
        computerTurn(deck);
        setTimeout(() => {
            showWinnerMessage(verifyWinner(scores));
        }, 500);
    }
});

stopBtn.addEventListener("click", () => {
    getCardBtn.disabled = true;
    stopBtn.disabled = true;
    computerTurn(deck);
    setTimeout(() => {
        showWinnerMessage(verifyWinner(scores));
    }, 500);
});

const accumulateScore = (player, points) => {
    scores[player] += points;
    scoresHTML[player].textContent = scores[player];
};

const createCardImg = (player, card) => {
    const cardImg = document.createElement("img");
    cardImg.src = `assets/cards/${card}.png`;
    cardImg.className = "card";

    player == PLAYERS.HUMAN ? humanCards.appendChild(cardImg) : computerCards.appendChild(cardImg);
};

const computerTurn = (deck) => {
    do {
        const card = getCard(deck);
        accumulateScore(PLAYERS.COMPUTER, cardValue(card));
        console.log(scores);
        createCardImg(PLAYERS.COMPUTER, card);

        if (scores[PLAYERS.HUMAN] > 21)
            break;
    } while (scores[PLAYERS.COMPUTER] < scores[PLAYERS.HUMAN]);
}

/**
 * @param {object} scores Player scores.
 * @returns {string} Name of winner or `""` if there is a tie.
 */
const verifyWinner = (scores) => {
    if (scores[PLAYERS.HUMAN] <= 21 && scores[PLAYERS.COMPUTER] > 21)
        return PLAYERS.HUMAN;
    if (scores[PLAYERS.HUMAN] == scores[PLAYERS.COMPUTER])
        return "";
    return PLAYERS.COMPUTER;
};

const showWinnerMessage = (winner) => {
    alert(winner == PLAYERS.HUMAN ? "You Win!" : winner == PLAYERS.COMPUTER ? "You Lost!" : "There was a tie!");
};
