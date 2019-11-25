import React, { Component } from 'react';
import '../styles/checkBox.css';

export class CheckBox extends Component {
  render() {
    return (
      <label className="container">
        {this.props.label}
        <input type="checkbox" onClick={this.props.onChecked} />
        <span className="checkmark" />
      </label>
    );
  }
}
