import React, { useState } from "react";
import "./App.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useSpring, animated } from "react-spring";
import { Route, Switch } from "react-router";
import { HashRouter as Router, Link } from "react-router-dom";

import Spider from "./components/Spider";
import SpiderIcon from "./components/SpiderIcon";

const levels = ["easy", "hard"];
const suites = [1, 2, 4];

function App() {
  const props = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    delay: 800,
  });

  return (
    <animated.div style={props}>
      <DndProvider backend={HTML5Backend}>
        <Router>
          <Switch>
            <Route exact path="/">
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <SpiderIcon></SpiderIcon>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {suites.map((suite) => {
                    return (
                      <div>
                        {levels.map((level) => {
                          return (
                            <div>
                              <Link to={"/spider/" + suite + "/" + level}>
                                <button style={{ width: "400px" }}>
                                  Spider {suite} Suites {level}
                                </button>
                              </Link>
                              <br></br>
                            </div>
                          );
                        })}
                        <br></br>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Route>
            <Route
              path="/spider/:suites/:level"
              render={({ match }) => {
                const numberOfSuites = parseInt(match.params.suites);
                const level = match.params.level;
                return (
                  <Spider
                    numberOfSuites={numberOfSuites}
                    level={level}
                  ></Spider>
                );
              }}
            />
          </Switch>
        </Router>
      </DndProvider>
    </animated.div>
  );
}

export default App;
