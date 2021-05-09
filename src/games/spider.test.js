import { test } from "uvu";
import * as assert from "uvu/assert";
import { setupDefaultGame, cloneGame } from "./spider.js";

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

test.run();
