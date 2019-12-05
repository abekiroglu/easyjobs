import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

export default class CheckBox extends Component {
    render() {
        return <Redirect to='/login' />
    }
}
