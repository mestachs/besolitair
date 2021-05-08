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

const cloneGame = (game) => JSON.parse(JSON.stringify(game));

const lastCard = (deck) => deck.cards[deck.cards.length - 1];

const possibleMoves = (card, game) => {
  const moves = [];
  if (card.visible) {
    for (let deck of game.decks) {
      const cardIndex = deck.cards.findIndex((c) => c.id === card.id);
      if (cardIndex >= 0) {
        const playableDecks = game.decks.filter((deck) => {
          const candidateCard = lastCard(deck);
          if (candidateCard == undefined) {
            return true;
          }
          if (candidateCard.rank - 1 == card.rank) {
            return true;
          }
        });

        playableDecks.forEach((targetDeck) =>
          moves.push({
            card: card,
            sourceDeck: deck,
            sourceCardIndex: cardIndex,
            targetDeck: targetDeck,
          })
        );
      }
    }
  }
  return moves;
};

const moveCard = (game, move) => {
  debugger;
  const newgame = cloneGame(game);
  const sourceDeck = newgame.decks[move.sourceDeck.id];
  const movedCards = sourceDeck.cards.slice(move.sourceCardIndex);
  sourceDeck.cards = sourceDeck.cards.slice(0, move.sourceCardIndex);
  const last = lastCard(sourceDeck);
  if (last) {
    last.visible = true;
  }
  movedCards.forEach((c) => newgame.decks[move.targetDeck.id].cards.push(c));
  debugger;
  return newgame;
};

function App() {
  const [game, setGame] = useState(toGame(shuffle(generateSpideCards(1))));

  const distributeRemainingCards = () => {
    const newGame = cloneGame(game);

    const cards = newGame.remaingCards;
    for (let deckIndex = 0; deckIndex < 10; deckIndex++) {
      const card = cards.shift();
      if (card) {
        newGame.decks[deckIndex].cards.push({ ...card, visible: true });
      }
    }
    setGame(newGame);
  };

  const onClickCard = (card) => {
    const moves = possibleMoves(card, game);
    if (moves.length > 0) {
      const newGame = moveCard(game, moves[0]);
      setGame(newGame);
    }
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
              {deck.cards
                .map((card) => {
                  return (
                    <>
                      <Card
                        key={card.id}
                        {...card}
                        onClick={onClickCard}
                      ></Card>
                    </>
                  );
                })
                .concat(
                  deck.cards.length == 0 ? [<Card disabled={true} />] : []
                )}
            </Deck>
          );
        })}
      </div>
    </div>
  );
}

export default App;
