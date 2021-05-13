import React, { useState } from "react";

import Deck from "./components/Deck";
import Card from "./components/Card";
import "./App.css";

import {
  distributeRemainingCards,
  setupDefaultGame,
  possibleMoves,
  moveCard,
  checkSuiteCombined,
  allPossibleMoves,
} from "./games/spider";

function App() {
  const [date, setDate] = React.useState(new Date());

  function tick() {
    setDate(new Date());
  }

  React.useEffect(() => {
    var timerID = setInterval(() => tick(), 1000);
    return function cleanup() {
      clearInterval(timerID);
    };
  });

  const [game, setRawGame] = useState(setupDefaultGame(1));
  const [gameHistory, setGameHistory] = useState([]);
  const [highlightedCards, setHightlightedCards] = useState(new Set());
  const setGame = (newgame) => {
    gameHistory.push(game);
    setGameHistory(gameHistory);
    setRawGame(checkSuiteCombined(newgame));
  };
  const handleUndo = () => {
    const previousGame = gameHistory[gameHistory.length - 1];
    setGameHistory(gameHistory.slice(0, gameHistory.length - 1));
    setRawGame(previousGame);
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

  const showHint = () => {
    const moves = allPossibleMoves(game);
    setHightlightedCards(new Set(moves.map((m) => m.card.id)));
  };
  const resetHighlighted = () => setHightlightedCards(new Set());

  const handleKeyDown = (event) => {
    console.log("event key down");
    if (event.key == "h") {
      showHint();
    }
  };

  return (
    <div
      id="table"
      onKeyDown={handleKeyDown}
      onKeyUp={resetHighlighted}
      tabIndex={0}
    >
      <button onClick={handleUndo} disabled={gameHistory.length == 0}>
        Undo
      </button>

      <span style={{ fontSize: "18px", marginLeft: "20px" }}>
        {gameHistory.length == 0 ? (
          <span><br />Click on a card to move it to one of the allowed deck. <br />Stuck ? press h to find possible movements.
          </span>
        ) : (
          <span>
            Already {gameHistory.length} moves, {game.remaingCards.length} cards
            left, {date.toLocaleTimeString()}
          </span>
        )}
      </span>
  
      {game.remaingCards.length > 0 && (
        <span style={{ display: "block" }}>
          <Card visible={false} onClick={handleDistributeRemainingCards}></Card>
          <br></br>
        </span>
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
                        highlighted={highlightedCards.has(card.id)}
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
