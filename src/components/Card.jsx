import React, { useState } from "react";

// https://en.wikipedia.org/wiki/Playing_cards_in_Unicode
const suites = {
  heart: {
    symbol: "\u2665",
    name: "coeur",
    color: "red",
  },
  spades: {
    symbol: "\u2660",
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

const defaultHighlight = { boxShadow: "rgb(131, 227, 247) 0px 0px 7px 9px" };

// heavily inspired by  https://github.com/zachwaugh/Helveticards

const scale = "scale(0.7, 0.7)";

const Card = ({ id, suit, rank, visible, disabled, highlighted, onClick }) => {
  const suite = suites[suit];
  const rankLabel = ranks[rank] || rank;

  const highlight = highlighted ? defaultHighlight : {};

  const handleClick = () => {
    onClick({ id, suit, rank, visible });
  };

  if (disabled) {
    return (
      <div
        className="card"
        style={{
          transform: scale,
        }}
      >
        <div className="corner top">
          <span
            className="suite"
            style={{ fontSize: "500%", filter: "grayscale(100%)" }}
          >
            {"\u26d4"}
          </span>
        </div>
        <div className="corner bottom">
          <span
            className="suite"
            style={{ fontSize: "500%", filter: "grayscale(100%)" }}
          >
            {"\u26d4"}
          </span>
        </div>
      </div>
    );
  }

  if (!visible) {
    return (
      <div
        className="card"
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
      <div
        className="card"
        style={{ color: suite.color, transform: scale, ...highlight }}
      >
        <div className="front">
          <div className="corner top">
            <span className="number">{rankLabel}</span>
            <span className="suite">{suite.symbol}</span>
          </div>

          {rank == 2 && (
            <>
              <span className="suit top_center">{suite.symbol}</span>
              <span className="suit bottom_center">{suite.symbol}</span>
            </>
          )}

          {rank == 3 && (
            <>
              <span className="suit top_center">{suite.symbol}</span>
              <span className="suit middle_center">{suite.symbol}</span>
              <span className="suit bottom_center">{suite.symbol}</span>
            </>
          )}
          {rank == 4 && (
            <>
              <span className="suit top_left">{suite.symbol}</span>
              <span className="suit top_right">{suite.symbol}</span>
              <span className="suit bottom_left">{suite.symbol}</span>
              <span className="suit bottom_right">{suite.symbol}</span>
            </>
          )}
          {rank == 5 && (
            <>
              <span className="suit top_left">{suite.symbol}</span>
              <span className="suit top_right">{suite.symbol}</span>
              <span className="suit middle_center">{suite.symbol}</span>
              <span className="suit bottom_left">{suite.symbol}</span>
              <span className="suit bottom_right">{suite.symbol}</span>
            </>
          )}

          {rank == 6 && (
            <>
              <span className="suit top_left">{suite.symbol}</span>
              <span className="suit top_right">{suite.symbol}</span>
              <span className="suit middle_left">{suite.symbol}</span>
              <span className="suit middle_right">{suite.symbol}</span>
              <span className="suit bottom_left">{suite.symbol}</span>
              <span className="suit bottom_right">{suite.symbol}</span>
            </>
          )}

          {rank == 7 && (
            <>
              <span className="suit top_left">{suite.symbol}</span>
              <span className="suit top_right">{suite.symbol}</span>
              <span className="suit middle_left">{suite.symbol}</span>
              <span className="suit middle_top">{suite.symbol}</span>
              <span className="suit middle_right">{suite.symbol}</span>
              <span className="suit bottom_left">{suite.symbol}</span>
              <span className="suit bottom_right">{suite.symbol}</span>
            </>
          )}
          {rank == 8 && (
            <>
              <span className="suit top_left">{suite.symbol}</span>
              <span className="suit top_right">{suite.symbol}</span>
              <span className="suit middle_left">{suite.symbol}</span>
              <span className="suit middle_top">{suite.symbol}</span>
              <span className="suit middle_right">{suite.symbol}</span>
              <span className="suit middle_bottom">{suite.symbol}</span>
              <span className="suit bottom_left">{suite.symbol}</span>
              <span className="suit bottom_right">{suite.symbol}</span>
            </>
          )}

          {rank == 9 && (
            <>
              <span className="suit top_left">{suite.symbol}</span>
              <span className="suit top_right">{suite.symbol}</span>

              <span className="suit middle_top_left">{suite.symbol}</span>
              <span className="suit middle_center">{suite.symbol}</span>
              <span className="suit middle_top_right">{suite.symbol}</span>
              <span className="suit bottom_left">{suite.symbol}</span>
              <span className="suit bottom_right">{suite.symbol}</span>
              <span className="suit middle_bottom_left">{suite.symbol}</span>
              <span className="suit middle_bottom_right">{suite.symbol}</span>
            </>
          )}
          {rank == 10 && (
            <>
              <span className="suit top_left">{suite.symbol}</span>
              <span className="suit top_right">{suite.symbol}</span>

              <span className="suit middle_top_left">{suite.symbol}</span>
              <span className="suit middle_top_center">{suite.symbol}</span>
              <span className="suit middle_top_right">{suite.symbol}</span>
              <span className="suit bottom_left">{suite.symbol}</span>
              <span className="suit bottom_right">{suite.symbol}</span>
              <span className="suit middle_bottom_center">{suite.symbol}</span>
              <span className="suit middle_bottom_left">{suite.symbol}</span>
              <span className="suit middle_bottom_right">{suite.symbol}</span>
            </>
          )}
          {rank > 10 && <span className="suit middle_center">&#9827;</span>}
          <div className="corner bottom">
            <span className="number">{rankLabel}</span>
            <span>{suite.symbol}</span>
          </div>
        </div>

        <div className="back"></div>
      </div>
    </div>
  );
};

export default Card;
