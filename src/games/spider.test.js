import { test } from "uvu";
import * as assert from "uvu/assert";
import { setupDefaultGame, cloneGame, possibleMoves } from "./spider.js";
import fs from "fs"

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

test("possibleMoves", () => {
  const game = JSON.parse(fs.readFileSync('./src/games/spider-fixture.json', 'utf8'))
  const card = game.decks[0].cards[game.decks[0].cards.length - 1 ]
  const moves = possibleMoves(card, game);
  const move = moves[0]
  assert.equal(move.sourceDeck.id, 0);
  assert.equal(move.targetDeck.id, 8);
});

test.run();
