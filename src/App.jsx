import React, { useState } from "react";
import { format } from "timeago.js";
import Deck from "./components/Deck";
import Card from "./components/Card";
import "./App.css";

import solvable from "./games/solvable.json";

import {
  distributeRemainingCards,
  setupDefaultGame,
  possibleMoves,
  moveCard,
  checkSuiteCombined,
  checkWon,
  allPossibleMoves,
  numberOfHidenCards,
  biggestDeckCards,
  numberOfCards,
} from "./games/spider";

function sec2time(timeInMilliSeconds) {
  var pad = function (num, size) {
    return ("000" + num).slice(size * -1);
  };
  const time = timeInMilliSeconds / 1000;
  const hours = Math.floor(time / 60 / 60);
  const minutes = Math.floor(time / 60) % 60;
  const seconds = Math.floor(time - minutes * 60);

  if (hours > 0) {
    return "started " + hours + " hours and " + minutes + " minutes ago";
  }

  if (minutes == 1) {
    return "started " + minutes + " minute and " + seconds + " seconds ago";
  }

  if (minutes > 0) {
    return "started " + minutes + " minutes and " + seconds + " seconds ago";
  }

  if (seconds > 0) {
    return "started " + seconds + " seconds ago";
  }

  return pad(hours, 2) + ":" + pad(minutes, 2) + ":" + pad(seconds, 2);
}

const copyToClipboard = (str) => {
  const el = document.createElement("textarea");
  el.value = str;
  el.setAttribute("readonly", "");
  el.style.position = "absolute";
  el.style.left = "-9999px";
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
};
const startedAt = new Date();

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
    setRawGame(checkWon(checkSuiteCombined(newgame)));
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

    if (event.key == "p") {
      let moves = allPossibleMoves(game);
      if (moves.length > 0) {
        //TODO get smarter take a better heuristic
        // longest suite ? less visible card
        for (let move of moves) {
          const newGame = checkSuiteCombined(moveCard(game, move));
          move.numberOfHidenCards =
            biggestDeckCards(newGame) +
            (104 - numberOfHidenCards(newGame)) +
            (104 - numberOfCards(newGame));
        }
        moves = moves.sort((a, b) =>
          a.numberOfHidenCards < b.numberOfHidenCards ? -1 : 1
        );

        let newGame;
        if (Math.random() > 0.5) {
          newGame = moveCard(game, randomItem(moves));
        } else {
          newGame = moveCard(game, moves[moves.length - 1]);
        }

        setGame(newGame);
      }
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

      {game.status == "won" && (
        <h1 className="blink">You Won !!!!!!!!!!!!!!!!!!</h1>
      )}

      <span style={{ fontSize: "18px", marginLeft: "20px" }}>
        {gameHistory.length == 0 ? (
          <span>
            <br />
            Click on a card to move it to one of the allowed deck. <br />
            Stuck ? press h to find possible movements.
            <br /> Lazy & lucky ? press p to randomly play.
          </span>
        ) : (
          <span>
            Already {gameHistory.length} moves, {game.remaingCards.length} cards
            left, {date.toLocaleTimeString()},{" "}
            {sec2time(new Date() - startedAt)}
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

      <button
        onClick={() => {
          copyToClipboard(JSON.stringify(game));
        }}
      >
        Copy game state
      </button>

      <button
        onClick={() => {
          setGame(solvable);
          setGameHistory([]);
        }}
      >
        Load solvable
      </button>
    </div>
  );
}

export default App;
