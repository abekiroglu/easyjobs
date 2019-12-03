import React, { Component } from 'react';
import '../styles/emailInput.css';

export class EmailInput extends Component {
  render() {
    return (
      <input
        className="email-input"
        type="text"
        placeholder="Your Email"
        maxLength="50"
        {...this.props}
      />
    );
  }
}
