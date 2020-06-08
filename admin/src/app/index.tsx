import React from "react";
import { Switch, Link, Route } from "react-router-dom";
import { Pews } from "./pews";
import { Other } from "./other";
import { Vehicles } from "./vehicles";

export const App = () => {
  return (
    <div>
      <h1 className="text-lg text-blue-600">Hello from our app!</h1>
      <Link to="/pews">Pews</Link>
      <Link to="/vehicles">Vehicles</Link>
      <Switch>
        <Route path="/pews">
          <Pews />
        </Route>
        <Route path="/other">
          <Other />
        </Route>
        <Route path="/vehicles">
          <Vehicles />
        </Route>
      </Switch>
    </div>
  );
};
