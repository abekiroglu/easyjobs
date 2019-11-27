import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import history from './history';
import LoginContainer from './containers/loginContainer';
import MainContainer from './containers/mainContainer';
import SignupContainer from './containers/signupContainer';

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div className="wrap">
          <Route exact path="/" component={LoginContainer} />
          <Route exact path="/main" component={MainContainer} />
          <Route exact path="/sign-up" component={SignupContainer}/>
        </div>
      </Router>
    );
  }
}

export default App;
