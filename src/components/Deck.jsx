import React from "react";

const Deck = ({ deck, children }) => {
  return (
    <div style={{ display: "inline-block" }}>
      <div
        style={{
          position: "relative",
          top: 30,
          textAlign: "center",
          color: "grey",
        }}
      >
        {deck + 1}
      </div>
      {children.map((c, index) => (
        <div
          key={index}
          style={{
            position: "relative",
            top: -index * 235,
          }}
        >
          {c}
        </div>
      ))}
    </div>
  );
};

export default Deck;
