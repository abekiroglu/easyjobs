import React, { Component } from 'react';
import '../styles/companyNameInput.css';

export class CompanyNameInput extends Component {
  render() {
    return (
      <input
        className="companyname-input"
        type="text"
        placeholder="Your Username"
        maxLength="50"
        {...this.props}
      />
    );
  }
}
