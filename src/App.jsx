import React, { useState } from "react";

import Deck from "./components/Deck";
import Card from "./components/Card";
import "./App.css";

const ranks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
const suites = ["heart", "spades", "diamond", "club"];

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8; // not a good random source but let's try this
    return v.toString(16);
  });
}

const generateCardsForSuite = (suit) => {
  return ranks.map((rank) => {
    return {
      id: uuidv4(),
      rank: rank,
      suit: suit,
    };
  });
};

const generateSpideCards = (numberOfSuites) => {
  if (numberOfSuites == 1) {
    return generateCardsForSuite("spades")
      .concat(generateCardsForSuite("spades"))
      .concat(generateCardsForSuite("spades"))
      .concat(generateCardsForSuite("spades"))
      .concat(generateCardsForSuite("spades"))
      .concat(generateCardsForSuite("spades"))
      .concat(generateCardsForSuite("spades"))
      .concat(generateCardsForSuite("spades"));
  }

  if (numberOfSuites == 2) {
    return generateCardsForSuite("spades")
      .concat(generateCardsForSuite("spades"))
      .concat(generateCardsForSuite("spades"))
      .concat(generateCardsForSuite("spades"))
      .concat(generateCardsForSuite("heart"))
      .concat(generateCardsForSuite("heart"))
      .concat(generateCardsForSuite("heart"))
      .concat(generateCardsForSuite("heart"));
  }

  throw new Error("Only 1 or 2 suites supported");
};

const shuffle = (cards) => cards.sort((a, b) => 0.5 - Math.random());

const toGame = (cards) => {
  const decks = [];
  for (let deckIndex = 0; deckIndex < 10; deckIndex++) {
    for (let tourIndex = 0; tourIndex < 5; tourIndex++) {
      const card = cards.shift();
      if (decks[deckIndex] == undefined) {
        decks[deckIndex] = { id: deckIndex, cards: [] };
      }
      if (card) {
        decks[deckIndex].cards.push({ ...card, visible: false });
      }
    }
  }
  for (let deckIndex = 0; deckIndex < 4; deckIndex++) {
    const card = cards.shift();
    if (card) {
      decks[deckIndex].cards.push({ ...card, visible: false });
    }
  }
  for (let deckIndex = 0; deckIndex < 10; deckIndex++) {
    const card = cards.shift();
    if (card) {
      decks[deckIndex].cards.push({ ...card, visible: true });
    }
  }

  return {
    decks,
    remaingCards: cards,
  };
};

function App() {
  const [game, setGame] = useState(toGame(shuffle(generateSpideCards(2))));

  const distributeRemainingCards = () => {
    const newGame = JSON.parse(JSON.stringify(game));

    const cards = newGame.remaingCards;
    for (let deckIndex = 0; deckIndex < 10; deckIndex++) {
      const card = cards.shift();
      if (card) {
        newGame.decks[deckIndex].cards.push({ ...card, visible: true });
      }
    }
    setGame(newGame);
  };
  return (
    <div id="table">
      {game.remaingCards.length > 0 && (
        <Card visible={false} onClick={distributeRemainingCards}></Card>
      )}
      {game.remaingCards.length == 0 && <Card disabled={true}></Card>}
      <div
        id="cards"
        style={{ display: "flex", justifyContent: "space-around" }}
      >
        {game.decks.map((deck, index) => {
          return (
            <Deck key={deck.id} deck={index}>
              {deck.cards.map((card) => {
                return (
                  <>
                    <Card key={card.id} {...card}></Card>
                  </>
                );
              })}
            </Deck>
          );
        })}
      </div>
    </div>
  );
}

export default App;
