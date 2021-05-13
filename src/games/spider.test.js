import { test } from "uvu";
import * as assert from "uvu/assert";
import {
  setupDefaultGame,
  cloneGame,
  possibleMoves,
  moveCard,
  isASuite,
} from "./spider.js";
import fs from "fs";

test("setupDefaultGame", () => {
  const defaultGame = setupDefaultGame(1);
  assert.is(defaultGame.decks.length, 10);
  assert.equal(
    defaultGame.decks.map((d) => d.cards.length),
    [7, 7, 7, 7, 6, 6, 6, 6, 6, 6]
  );
  assert.equal(defaultGame.remaingCards.length, 40);
});

test("cloneGame", () => {
  const defaultGame = setupDefaultGame(1);
  const clonedGame = cloneGame(defaultGame);
  assert.equal(clonedGame, defaultGame);
  assert.is.not(clonedGame, defaultGame);
});

test("isASuite", () => {
  const asuite = isASuite([
    { rank: 4, suit: "spades", visible: true },
    { rank: 3, suit: "spades", visible: true },
    { rank: 2, suit: "spades", visible: true },
  ]);
  assert.is(asuite, true);
});

test("possibleMoves", () => {
  const game = JSON.parse(
    fs.readFileSync("./src/games/spider-fixture.json", "utf8")
  );
  const card = game.decks[0].cards[game.decks[0].cards.length - 1];
  const moves = possibleMoves(card, game);
  const move = moves[0];
  assert.equal(move.sourceDeck.id, 0);
  assert.equal(move.targetDeck.id, 8);

  const nextGame = moveCard(game, move);
  // the card has moved to deck 8
  assert.equal(
    nextGame.decks[8].cards[nextGame.decks[8].cards.length - 1],
    card
  );

  // last card on the first deck is now visible
  assert.equal(game.decks[0].cards[game.decks[0].cards.length - 2], {
    id: "d250f423-c966-44cf-88ca-c089bfe06de2",
    rank: 10,
    suit: "spades",
    visible: false,
  });

  assert.equal(nextGame.decks[0].cards[nextGame.decks[0].cards.length - 1], {
    id: "d250f423-c966-44cf-88ca-c089bfe06de2",
    rank: 10,
    suit: "spades",
    visible: true,
  });
});

test.run();
