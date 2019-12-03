import React, { Component } from 'react';
import '../styles/errorField.css';

export class ErrorField extends Component {
  render() {
    return this.props.error ? (
      <div className="error-div">
        <label className="error-field">{this.props.error}</label>
      </div>
    ) : null;
  }
}
