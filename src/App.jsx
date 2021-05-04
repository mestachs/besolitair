import React, { useState } from "react";
import Card from "./components/Card";
import "./App.css";

const ranks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
const suites = ["heart", "spades", "diamond", "club"];

function App() {
  const [count, setCount] = useState(0);

  return (
    <div id="table">
      <div
        id="cards"
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {suites.map((suite) => {
          return ranks.map((rank) => {
            return (
              <>
                <Card suit={suite} rank={rank}></Card>
              </>
            );
          });
        })}
      </div>
    </div>
  );
}

export default App;
