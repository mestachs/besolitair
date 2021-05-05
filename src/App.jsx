import React, { useState } from "react";

import Deck from "./components/Deck";
import Card from "./components/Card";
import "./App.css";

const ranks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
const suites = ["heart", "spades", "diamond", "club"];

function App() {
  const [count, setCount] = useState(0);
  ranks.sort((a, b) => 0.5 - Math.random());
  return (
    <div id="table">
      <div id="cards" style={{display: "block"}}>
        {suites.map((suite, index) => {
          return (
            <Deck deck={index}>
              {ranks.map((rank) => {
                return (
                  <>
                    <Card suit={suite} rank={rank}></Card>
                  </>
                );
              })}
            </Deck>
          );
        })}
        <br></br>
      </div>
    </div>
  );
}

export default App;
