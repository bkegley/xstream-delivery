import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import { ListPews } from "./ListPews";
import { CreatePewForm } from "./CreatePewForm";

export const Pews = () => {
  return (
    <div>
      <Link to="/pews">List</Link>
      <Link to="/pews/create">Create</Link>
      <Switch>
        <Route path="/pews/create">
          <CreatePewForm />
        </Route>
        <Route path="/pews">
          <ListPews />
        </Route>
      </Switch>
    </div>
  );
};
