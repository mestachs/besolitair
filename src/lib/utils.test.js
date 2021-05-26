import { test } from "uvu";
import * as assert from "uvu/assert";
import { sec2elapsed } from "./utils.js";

test("sec2elapsed seconds ago", () => {
  assert.equal(sec2elapsed(5000), "started 5 seconds ago");
});

test("sec2elapsed minute ago", () => {
  assert.equal(sec2elapsed(70000), "started 1 minute and 10 seconds ago");
});

test("sec2elapsed minutes ago", () => {
  assert.equal(sec2elapsed(700000), "started 11 minutes and 40 seconds ago");
});

test.run();
