import React, { Component } from 'react';
import '../styles/textboxInput.css';

export class TextBoxInput extends Component {
  render() {
    return (
      <input
        className="textbox-input"
        type="text"
        maxLength="50"
        {...this.props}
      />
    );
  }
}