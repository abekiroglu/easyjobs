/*!

=========================================================
* Material Dashboard React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import history from './history';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// core components
import Landing from "layouts/Landing.js"
import Admin from "layouts/Admin.js";
import saga from './redux/sagas';
import root from './redux/reducers';

import "assets/css/material-dashboard-react.css?v=1.8.0";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(root, applyMiddleware(sagaMiddleware, logger));

sagaMiddleware.run(saga);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route path="/admin" component={Admin} />
        <Route path="/landing" component={Landing} />
        <Redirect from="/" to="/landing" />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
