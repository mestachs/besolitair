import React, { useState } from "react";
import { Link } from "react-router-dom";

import { sec2elapsed } from "../lib/utils";

const Status = ({
  game,
  gameHistory,
  startedAt,
  handleUndo,
  showHint,
  hideHint,
}) => {
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
  return (
    <div style={{ display: "flex", height: "50px", alignItems: "center"}}>
      <button onClick={handleUndo} disabled={gameHistory.length == 0}>
        Undo
      </button>
      <button onMouseDown={showHint} onMouseUp={hideHint}>
        Hint
      </button>

      <span style={{ fontSize: "18px", marginLeft: "20px" }}>
        {gameHistory.length == 0 ? (
          <span>
            Click on a card to move it to one of the allowed deck. <br />
            Stuck ? Press h to find possible movements.
            <br /> Lazy & lucky ? Press p to randomly play.
            <br /> Undo with u, Deal the remaining card with d, 1 to 9 or 0 for
            playing the first move in the deck.
          </span>
        ) : (
          <span>
            Already {gameHistory.length} moves, {game.remaingCards.length} cards
            left, {date.toLocaleTimeString()},{" "}
            {sec2elapsed(new Date() - startedAt)}
          </span>
        )}
      </span>
      <Link to="/" style={{ marginLeft: "auto", marginRight: "50px"}}>
        <button>New</button>
      </Link>
    </div>
  );
};

export default Status;
