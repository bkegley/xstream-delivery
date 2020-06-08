import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import { ListVehicles } from "./ListVehicles";
import { CreateVehicleForm } from "./CreateVehicleForm";

export const Vehicles = () => {
  console.log("we are here");
  return (
    <div>
      <Link to="/vehicles">List</Link>
      <Link to="/vehicles/create">Create</Link>
      <Switch>
        <Route exact path="/vehicles">
          <ListVehicles />
        </Route>
        <Route path="/vehicles/create">
          <CreateVehicleForm />
        </Route>
      </Switch>
    </div>
  );
};
