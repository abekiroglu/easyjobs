import React, { Component } from 'react';
import '../styles/dateInput.css';

export class DateInput extends Component {
  render() {
    return (
      <input
        className="date-input"
        type="date"
        placeholder="Date"
        maxLength="50"
        {...this.props}
      />
    );
  }
}
