import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import LoginChecker from './components/loginChecker';
import history from './history';

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div className="wrap">
          <Route exact path="/" component={LoginChecker} />
        </div>
      </Router>
    );
  }
}

export default App;
