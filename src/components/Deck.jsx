import React from "react";
import { useDrop } from "react-dnd";

const Deck = ({ deck, children, onDropped }) => {

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: "card",
      drop: (item) => {
        onDropped(item, deck.cards[deck.cards.length - 1], deck);
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [deck]
  );

  return (
    <div ref={drop} style={{ display: "inline-block" }}>
      <div
        style={{
          position: "relative",
          top: 30,
          textAlign: "center",
          color: "grey",
        }}
      >
        {deck.id + 1}
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
