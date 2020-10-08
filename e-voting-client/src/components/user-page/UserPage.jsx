import React from "react";
import Navbar from "./navbar/Navbar";
import { Route, Switch } from "react-router-dom";
import ElectionsMenu from "./elections/elections-menu/ElectionsMenu";

function UserPage() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/user/">
          home
        </Route>
        <Route path="/user/elections">
          <ElectionsMenu />
        </Route>
        <Route path="/user/help">help</Route>
      </Switch>
    </>
  );
}

export default UserPage;
