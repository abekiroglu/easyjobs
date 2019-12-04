import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import history from './history';
import LoginContainer from './containers/loginContainer';
import MainContainer from './containers/mainContainer';
import SignupContainer from './containers/signupContainer';
import AboutContainer from './containers/aboutContainer';
import UpdateProfileContainer from './containers/updateProfileContainer';
import NewAdvertisementContainer from './containers/_newAdvertisementContainer';




class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div className="wrap">
          <Route exact path="/" component={LoginContainer} />
          <Route exact path="/main" component={MainContainer} />
          <Route exact path="/sign-up" component={SignupContainer} />
          <Route exact path="/about" component={AboutContainer} />
          <Route exact path="/update-profile" component={UpdateProfileContainer} />
          <Route exact path="/add-advr" component={NewAdvertisementContainer} />

        </div>
      </Router>
    );
  }
}

export default App;
