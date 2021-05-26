import React, { useState } from "react";

import { sec2elapsed } from "../lib/utils";

const Status = ({ game, gameHistory, startedAt, handleUndo }) => {
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
    <div style={{ display: "flex", height: "50px" }}>
      <button onClick={handleUndo} disabled={gameHistory.length == 0}>
        Undo
      </button>

      <span style={{ fontSize: "18px", marginLeft: "20px" }}>
        {gameHistory.length == 0 ? (
          <span>
            <br />
            Click on a card to move it to one of the allowed deck. <br />
            Stuck ? Press h to find possible movements.
            <br /> Lazy & lucky ? Press p to randomly play.
          </span>
        ) : (
          <span>
            Already {gameHistory.length} moves, {game.remaingCards.length} cards
            left, {date.toLocaleTimeString()},{" "}
            {sec2elapsed(new Date() - startedAt)}
          </span>
        )}
      </span>
    </div>
  );
};

export default Status;
