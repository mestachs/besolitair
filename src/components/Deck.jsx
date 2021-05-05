import React, { useState } from "react";

const Deck = ({ deck, children }) => {
  return (
    <div style={{ display: "inline-block" }}>
      {children.map((c, index) => (
        <div
          style={{
            position: "relative",
            top: -index * 210,
          }}
        >
          {c}
        </div>
      ))}
    </div>
  );
};

export default Deck;
