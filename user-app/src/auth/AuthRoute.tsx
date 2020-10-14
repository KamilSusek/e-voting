import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";

function AuthRoute({ children, path }: any) {
  const isLoggedIn = useSelector((state: any) => state.login.isLoggedIn);

  if (isLoggedIn) {
    return <Route path={path}>{children}</Route>;
  } else {
    return <Redirect to="/" />;
  }
}

export default AuthRoute;
