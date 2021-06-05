import React, { useState } from "react";
import "./App.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useSpring, animated } from "react-spring";
import { Route, Switch } from "react-router";
import { HashRouter as Router } from "react-router-dom";

import Spider from "./Spider";

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
              <Spider></Spider>
            </Route>
            <Route
              path="/spider/:suites/:level"
              render={({ match }) => {
                const numberOfSuites = parseInt(match.params.suites)
                const level = match.params.level
                return <Spider numberOfSuites={numberOfSuites} level={level}></Spider>;
              }}
            ></Route>
          </Switch>
        </Router>
      </DndProvider>
    </animated.div>
  );
}

export default App;
