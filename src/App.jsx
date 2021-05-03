import React, { useState } from "react";
import Card from "./components/Card";
import "./App.css";

const ranks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
const suites = ["heart", "spades", "diamond", "club"];

function App() {
  const [count, setCount] = useState(0);

  return (
    <div id="table">
      <div id="cards">
        <div class="card jack">
          <div>
            <div class="corner top">
              <span class="number">J</span>
              <span>&#9827;</span>
            </div>

            <span class="suit middle_center">&#9827;</span>

            <div class="corner bottom">
              <span class="number">J</span>
              <span>&#9827;</span>
            </div>
          </div>

          <div class="card queen">
            <div class="corner top">
              <span class="number">Q</span>
              <span>&#9827;</span>
            </div>

            <span class="suit middle_center">&#9827;</span>

            <div class="corner bottom">
              <span class="number">Q</span>
              <span>&#9827;</span>
            </div>
          </div>

          <div class="card king">
            <div class="corner top">
              <span class="number">K</span>
              <span>&#9827;</span>
            </div>

            <span class="suit middle_center">&#9827;</span>

            <div class="corner bottom">
              <span class="number">K</span>
              <span>&#9827;</span>
            </div>
          </div>

          <div class="card ace">
            <div class="corner top">
              <span class="number">A</span>
              <span>&#9827;</span>
            </div>

            <span class="suit middle_center">&#9827;</span>

            <div class="corner bottom">
              <span class="number">A</span>
              <span>&#9827;</span>
            </div>
          </div>
        </div>
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
