import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./appbar/Navbar";
import ElectionsList from "./elections/ElectionsList";
import Footer from "./footer/Footer";
import Vote from "./vote/VotesList";

function LandingPage() {
  return (
    <div>
      <Router>
        <Navbar />
        <div style={{ minHeight: "85vh" }}>
          <Switch>
            <Route exact path="/user">
              Home
            </Route>
            <Route path="/user/elections">
              <ElectionsList />
            </Route>
            <Route path="/user/vote/:title">
              <Vote />
            </Route>
          </Switch>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default LandingPage;
