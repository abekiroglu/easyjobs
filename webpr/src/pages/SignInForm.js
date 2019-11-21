import React, { Component } from 'react';
import { Link,Router,NavLink } from 'react-router-dom';
import fire from "./firebase";


class SignInForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            error : {
              message: ''
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleChange(e) {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        // name = target.name;

        //  this.setState({
        //  [name]: value
        //  });
    }
    handleEmailChange = ({ target }) => {
      this.setState({ email: target.value });
    };
    
    handlePasswordChange = ({ target }) => {
      this.setState({ password: target.value });
    };

 

    handleLogin(e) {
        e.preventDefault();

        console.log('The form was submitted with the following data:');
        console.log(this.state);

        fire.auth().signInWithEmailAndPassword(this.state.email,this.state.password).then((u) => {
        console.log("Succesfully logged in");
        this.props.history.push("/home");
        }).catch((error)=>{
        this.setState({error})
        }); 
       
    }

    render() {
        return (
            
        <div className="FormCenter">
         
            <form onSubmit={this.handleLogin} className="FormFields" onSubmit={this.handleLogin}>
            <div className="FormField">
                <label className="FormField__Label" htmlFor="email">E-Mail Address</label>
                <input type="email" id="email" className="FormField__Input" placeholder="Enter your email" name="email" 
                value={this.state.email} onChange={this.handleEmailChange} />
              </div>

              <div className="FormField">
                <label className="FormField__Label" htmlFor="password">Password</label>
                <input type="password" id="password" className="FormField__Input" placeholder="Enter your password" name="password" 
                value={this.state.password} onChange={this.handlePasswordChange} />
              </div>

              <div className="FormField">
              <button className="FormField__Button mr-20">Sign In</button> 
              <Link to="/" className="FormField__Link">Create an account</Link>
              </div>
              <div>{this.state.error.message} </div>
            </form>
            
          </div>

          
        );
    }
}

export default SignInForm;