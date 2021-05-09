import React, { useState } from "react";

import Deck from "./components/Deck";
import Card from "./components/Card";
import "./App.css";

import {
  distributeRemainingCards,
  setupDefaultGame,
  possibleMoves,
  moveCard,
  checkSuiteCombined
} from "./games/spider";

function App() {
  const [game, setRawGame] = useState(setupDefaultGame(1));
  const setGame = (game) => {
    setRawGame(checkSuiteCombined(game));
  };
  const handleDistributeRemainingCards = () => {
    setGame(distributeRemainingCards(game));
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
        <Card visible={false} onClick={handleDistributeRemainingCards}></Card>
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
