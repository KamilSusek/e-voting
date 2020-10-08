import React from "react";
import ReactDOM from "react-dom";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { Provider } from "react-redux";
import store from "./store";
import "./reset.css";
import "./index.css";
import App from "./App";

// optional configuration
const options = {
  position: positions.BOTTOM,
  timeout: 3000,
  offset: "30px",
  transition: transitions.SCALE,
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AlertProvider template={AlertTemplate} {...options}>
        <App />
      </AlertProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
