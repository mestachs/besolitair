import React, { useState } from "react";

// https://en.wikipedia.org/wiki/Playing_cards_in_Unicode
const suites = {
  heart: {
    symbol: "\u2665",
    name: "coeur",
    color: "red",
  },
  spades: {
    symbol: "\u2664",
    name: "pique",
    color: "black",
  },
  diamond: {
    symbol: "\u2666",
    name: "carreau",
    color: "red",
  },
  club: {
    symbol: "\u2667",
    name: "trèfle",
    color: "black",
  },
};

const ranks = { 11: "J", 12: "Q", 13: "K", 1: "A" };

// heavily inspired by  https://github.com/zachwaugh/Helveticards

const scale = "scale(0.7, 0.7)";

const Card = ({ id, suit, rank, visible, onClick }) => {
  debugger;
  const suite = suites[suit];
  const rankLabel = ranks[rank] || rank;

  const handleClick = () => {
    onClick({ id, suit, rank, visible });
  };

  if (!visible) {
    return (
      <div
        class="card"
        onClick={handleClick}
        style={{
          background: "linear-gradient(135deg, #65799b 0%,#5e2563 100%)",
          transform: scale,
        }}
      ></div>
    );
  }

  if (suite == undefined) {
    throw new Error("Unknown suite " + suit);
  }

  return (
    <div onClick={handleClick}>
      <div class="card" style={{ color: suite.color, transform: scale }}>
        <div class="front">
          <div class="corner top">
            <span class="number">{rankLabel}</span>
            <span class="suite">{suite.symbol}</span>
          </div>

          {rank == 2 && (
            <>
              <span class="suit top_center">{suite.symbol}</span>
              <span class="suit bottom_center">{suite.symbol}</span>
            </>
          )}

          {rank == 3 && (
            <>
              <span class="suit top_center">{suite.symbol}</span>
              <span class="suit middle_center">{suite.symbol}</span>
              <span class="suit bottom_center">{suite.symbol}</span>
            </>
          )}
          {rank == 4 && (
            <>
              <span class="suit top_left">{suite.symbol}</span>
              <span class="suit top_right">{suite.symbol}</span>
              <span class="suit bottom_left">{suite.symbol}</span>
              <span class="suit bottom_right">{suite.symbol}</span>
            </>
          )}
          {rank == 5 && (
            <>
              <span class="suit top_left">{suite.symbol}</span>
              <span class="suit top_right">{suite.symbol}</span>
              <span class="suit middle_center">{suite.symbol}</span>
              <span class="suit bottom_left">{suite.symbol}</span>
              <span class="suit bottom_right">{suite.symbol}</span>
            </>
          )}

          {rank == 6 && (
            <>
              <span class="suit top_left">{suite.symbol}</span>
              <span class="suit top_right">{suite.symbol}</span>
              <span class="suit middle_left">{suite.symbol}</span>
              <span class="suit middle_right">{suite.symbol}</span>
              <span class="suit bottom_left">{suite.symbol}</span>
              <span class="suit bottom_right">{suite.symbol}</span>
            </>
          )}

          {rank == 7 && (
            <>
              <span class="suit top_left">{suite.symbol}</span>
              <span class="suit top_right">{suite.symbol}</span>
              <span class="suit middle_left">{suite.symbol}</span>
              <span class="suit middle_top">{suite.symbol}</span>
              <span class="suit middle_right">{suite.symbol}</span>
              <span class="suit bottom_left">{suite.symbol}</span>
              <span class="suit bottom_right">{suite.symbol}</span>
            </>
          )}
          {rank == 8 && (
            <>
              <span class="suit top_left">{suite.symbol}</span>
              <span class="suit top_right">{suite.symbol}</span>
              <span class="suit middle_left">{suite.symbol}</span>
              <span class="suit middle_top">{suite.symbol}</span>
              <span class="suit middle_right">{suite.symbol}</span>
              <span class="suit middle_bottom">{suite.symbol}</span>
              <span class="suit bottom_left">{suite.symbol}</span>
              <span class="suit bottom_right">{suite.symbol}</span>
            </>
          )}

          {rank == 9 && (
            <>
              <span class="suit top_left">{suite.symbol}</span>
              <span class="suit top_right">{suite.symbol}</span>

              <span class="suit middle_top_left">{suite.symbol}</span>
              <span class="suit middle_center">{suite.symbol}</span>
              <span class="suit middle_top_right">{suite.symbol}</span>
              <span class="suit bottom_left">{suite.symbol}</span>
              <span class="suit bottom_right">{suite.symbol}</span>
              <span class="suit middle_bottom_left">{suite.symbol}</span>
              <span class="suit middle_bottom_right">{suite.symbol}</span>
            </>
          )}
          {rank == 10 && (
            <>
              <span class="suit top_left">{suite.symbol}</span>
              <span class="suit top_right">{suite.symbol}</span>

              <span class="suit middle_top_left">{suite.symbol}</span>
              <span class="suit middle_top_center">{suite.symbol}</span>
              <span class="suit middle_top_right">{suite.symbol}</span>
              <span class="suit bottom_left">{suite.symbol}</span>
              <span class="suit bottom_right">{suite.symbol}</span>
              <span class="suit middle_bottom_center">{suite.symbol}</span>
              <span class="suit middle_bottom_left">{suite.symbol}</span>
              <span class="suit middle_bottom_right">{suite.symbol}</span>
            </>
          )}
          {rank > 10 && <span class="suit middle_center">&#9827;</span>}
          <div class="corner bottom">
            <span class="number">{rankLabel}</span>
            <span>{suite.symbol}</span>
          </div>
        </div>

        <div class="back"></div>
      </div>
    </div>
  );
};

export default Card;
