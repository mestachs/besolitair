import React, { useState } from "react";
import Deck from "./components/Deck";
import Card from "./components/Card";
import "./App.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import solvable from "./games/solvable.json";
import { Fireworks } from "fireworks-js";
import Status from "./components/Status";
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
  randomItem,
} from "./games/spider";

const startedAt = new Date();

function App() {
  const [fireworks, setFireworks] = React.useState(undefined);

  const [game, setRawGame] = useState(setupDefaultGame(1));
  const [gameHistory, setGameHistory] = useState([]);

  React.useEffect(() => {
    const container = document.querySelector("#fireworks");
    const newFireworks = new Fireworks({
      target: container,
      hue: 120,
      startDelay: 1,
      minDelay: 20,
      maxDelay: 40,
      speed: 1,
      acceleration: 1.05,
      friction: 0.98,
      gravity: 2,
      particles: 175,
      trace: 3,
      explosion: 5,
      boundaries: {
        top: 50,
        bottom: 600,
        left: 50,
        right: 600,
      },
      sound: {
        enable: true,
        list: [
          "https://crashmax-dev.github.io/fireworks-js/explosion0.mp3",
          "https://crashmax-dev.github.io/fireworks-js/explosion1.mp3",
          "https://crashmax-dev.github.io/fireworks-js/explosion2.mp3",
        ],
        min: 4,
        max: 18,
      },
    });

    setFireworks(newFireworks);
  }, []);

  React.useEffect(() => {
    if (game.status == "won") {
      fireworks.start();
    }
  }, [game]);

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

  const onDropped = (droppedCard, targetCard, deck) => {
    console.log("dropping ", droppedCard, "on ", targetCard);
    let moves = allPossibleMoves(game);
    const selectedMove = moves.find((move) => {
      const sameMovedCard = move.card.id == droppedCard.id;
      const lastCardDeck =
        move.targetDeck.cards[move.targetDeck.cards.length - 1];
      if (targetCard) {
        return (
          sameMovedCard && lastCardDeck && lastCardDeck.id == targetCard.id
        );
      } else if (deck) {
        return sameMovedCard && move.targetDeck.id == deck.id;
      }
    });
    const newGame = moveCard(game, selectedMove);
    setGame(newGame);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        id="fireworks"
        style={{
          position: "absolute",
          background: game.status == "won" ? "black" : "#e7e7e7",
          top: 0,
          left: 0,
          height: "100vh",
          width: "100%",
          zIndex: game.status == "won" ? 100 : -100,
        }}
      />
      {game.status !== "won" && (
        <div
          id="table"
          onKeyDown={handleKeyDown}
          onKeyUp={resetHighlighted}
          tabIndex={0}
        >
          <Status
            game={game}
            gameHistory={gameHistory}
            startedAt={startedAt}
            handleUndo={handleUndo}
          />

          {game.remaingCards.length > 0 && (
            <span style={{ display: "block" }}>
              <Card visible={false} onClick={handleDistributeRemainingCards} />
              <br />
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
                        <Card
                          key={card.id}
                          {...card}
                          onClick={onClickCard}
                          onDropped={onDropped}
                          highlighted={highlightedCards.has(card.id)}
                        />
                      );
                    })
                    .concat(
                      deck.cards.length == 0
                        ? [
                            <Card
                              disabled={true}
                              onDropped={(dropped) =>
                                onDropped(dropped, undefined, deck)
                              }
                            />,
                          ]
                        : []
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
      )}
    </DndProvider>
  );
}

export default App;
