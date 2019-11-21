
import React from "react";

import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import configureStore from "./configureStore";


function Root() {
  return (
    <Provider configureStore ={configureStore}>
      <Router>
        <App />
      </Router>
    </Provider>
  );
}

export default Root;