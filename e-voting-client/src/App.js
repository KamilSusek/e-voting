import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import LandingPage from "./components/landing-page/LandingPage";
import UserPage from "./components/user-page/UserPage";

const AuthenticatedRoute = ({ path, children }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  if (isLoggedIn) {
    return <Route path={path}>{children}</Route>;
  } else {
    return <Redirect to="/" />;
  }
};

function App() {
  return (
    <Router>
      <Switch>
        {/*<AuthenticatedRoute path="/user">*/}
        <Route path="/user">
          <UserPage />
        </Route>
        {/*</AuthenticatedRoute>*/}
        <Route path="/">
          <LandingPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
