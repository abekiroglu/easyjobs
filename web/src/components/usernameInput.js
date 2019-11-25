import React, { Component } from 'react';
import '../styles/usernameInput.css';

export class UsernameInput extends Component {
  render() {
    return (
      <input
        className="username-input"
        type="text"
        placeholder="Your Email"
        maxLength="50"
        {...this.props}
      />
    );
  }
}
