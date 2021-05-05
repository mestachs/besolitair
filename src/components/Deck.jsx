import React, { useState } from "react";

const Deck = ({ deck, children }) => {
  return (
    <div >
      {children.map((c, index) => (
        <div
          style={{
            position: "absolute",
            top: index * 60,
            left: deck * 300
          }}
        >
          {c}
        </div>
      ))}
    </div>
  );
};

export default Deck;
