import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import history from './history';
import LoginContainer from './containers/loginContainer';
import MainContainer from './containers/mainContainer';

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div className="wrap">
          <Route exact path="/" component={LoginContainer} />
          <Route exact path="/main" component={MainContainer} />
        </div>
      </Router>
    );
  }
}

export default App;
