import React, { Component } from 'react';
import { HashRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import SignUpForm from './pages/SignUpForm';
import SignInForm from './pages/SignInForm';
import AboutUs from './pages/AboutUs';
import Home from './pages/Home';

import fire from "firebase"; 
import './App.css';


class App extends Component {

  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      if(user) {
        this.setState({user});
      }else {
        this.setState({user:null});
      }
    });
  }
  componentDidMount(){
    this.authListener()
   }

  render() {
    return (
      <Router >
        <div className="App">
          
          <div className="App__Aside">
            {/* <h4>EasyJobs is ...</h4> */}
          </div>
          <div className="App__Form">
          <h1>Easy <span class="badge badge-secondary">Jobs</span></h1>
            <div className="PageSwitcher">
            <NavLink exact to="/sign-in" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign In</NavLink>
            <NavLink exact to="/" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign Up</NavLink>
            <NavLink to="/About Us" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">About Us</NavLink>
          </div> 
              {/* <div className="FormTitle">
                  <NavLink to="/sign-in" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign In</NavLink> 
              </div> */}

              <Route exact path="/" component={SignUpForm}>
              </Route>
              <Route path="/sign-in" component={SignInForm}>
              </Route>
              <Route path="/about-us" component={AboutUs}>
              </Route>
              <Route path="/home" component={Home}>
              </Route>
          </div>

        </div>
      </Router>
    );
  }
}

export default App;