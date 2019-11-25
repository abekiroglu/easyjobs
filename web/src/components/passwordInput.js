import React, { Component } from 'react';
import '../styles/passwordInput.css';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export class PasswordInput extends Component {
  constructor(props) {
    super(props);
    this.inputReference = React.createRef();
  }

  showPassword = e => {
    this.inputReference.current.type = 'text';
  };

  hidePassword = e => {
    this.inputReference.current.type = 'password';
  };

  render() {
    return (
      <div className="password-container">
        <input
          id="password-input"
          type="password"
          className="password-input"
          maxLength="20"
          ref={this.inputReference}
          {...this.props}
        />
        <FontAwesomeIcon
          className="mask"
          icon={faEye}
          onMouseDown={this.showPassword}
          onMouseUp={this.hidePassword}
          onMouseLeave={this.hidePassword}
        />
      </div>
    );
  }
}
