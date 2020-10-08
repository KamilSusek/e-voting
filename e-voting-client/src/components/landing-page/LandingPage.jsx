import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LoginDialog from "./login-dialog/LoginDialog";
import Navbar from "./navbar/Navbar";

function LandingPage() {
  const [openLoginDialog, setOpenLoginDialog] = useState(false);

  const handleOpen = () => {
    setOpenLoginDialog(true);
  };

  const handleClose = () => {
    setOpenLoginDialog(false);
  };
  return (
    <>
      <Navbar onLoginClick={handleOpen} />
      <Switch>
        <Route exact path="/">
          <div>xd</div>
        </Route>
        <Route path="/about">
          <div>about</div>
        </Route>
        <Route path="/help">
          <div>help</div>
        </Route>
      </Switch>
      <LoginDialog onClose={handleClose} open={openLoginDialog} />
    </>
  );
}

export default LandingPage;
