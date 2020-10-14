import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LandingPage from "./components/landing-page/LandingPage";
import LoginPage from "./components/login-page/LoginPage";
import AuthRoute from "./auth/AuthRoute";

function App() {
  return (
    <Router>
      <Route exact path="/">
        <LoginPage />
      </Route>
      <AuthRoute exact path="/user">
        <LandingPage />
      </AuthRoute>
    </Router>
  );
}

export default App;
