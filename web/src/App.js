import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import history from './history';
import LoginContainer from './containers/loginContainer';
import MainContainer from './containers/mainContainer';
import SignupContainer from './containers/signupContainer';
import AboutContainer from './containers/aboutContainer';
import FormProfileContainer from './containers/formProfileContainer';


class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div className="wrap">
          <Route exact path="/" component={LoginContainer} />
          <Route exact path="/main" component={MainContainer} />
          <Route exact path="/sign-up" component={SignupContainer}/>
          <Route exact path="/about" component={AboutContainer}/>
          <Route exact path="/form-profile" component={FormProfileContainer}/>

        </div>
      </Router>
    );
  }
}

export default App;
