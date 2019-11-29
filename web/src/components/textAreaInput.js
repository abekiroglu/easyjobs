import React, { Component } from 'react';

export class TextAreaInput extends Component {
    render(){
    return (
        <div className="input-group">
            <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon">
                <i className="fas fa-pencil-alt prefix"></i>
                </span>
            </div>
            <textarea className="form-control" id="exampleFormControlTextarea1" rows="5"></textarea>
        </div>
    )
}
}
