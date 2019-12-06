import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import history from './history';
import LoginContainer from './containers/loginContainer';
import MainContainer from './containers/mainContainer';
import SignupContainer from './containers/signupContainer';
import AboutContainer from './containers/aboutContainer';
import UpdateProfileContainer from './containers/updateProfileContainer';
import NewAdvertisementContainer from './containers/_newAdvertisementContainer';
import NavigationBarContainer from './containers/navigationBarContainer';
import RedirectToLanding from './components/redirectToLanding'
import MuiContainer from './containers/muiContainer'

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div className="wrap">
          <Route exact path="/" component={RedirectToLanding} />
          <Route exact path="/login" component={LoginContainer} />
          <Route exact path="/sign-up" component={SignupContainer} />
          <Route exact path="/about" component={AboutContainer} />

          <Route path="/main" component={NavigationBarContainer} />

          <Route exact path="/main" component={MainContainer} />
          <Route exact path="/main/update-profile" component={UpdateProfileContainer} />
          <Route exact path="/main/add-advr" component={NewAdvertisementContainer} />

        </div>
      </Router>
    );
  }
}

export default App;
