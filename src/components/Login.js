import React, {Component} from 'react';
import './Login.scss';

export default class Login extends Component{
  render(){
    return (
      <div className="root app login">
        <form className="card">
          <input placeholder="Email" required autoFocus/>
          <input placeholder="Password" required/>
          <div className="buttons">
            <button className="secondary">Register</button>
            <button className="main">Login</button>
          </div>
        </form>
      </div>
    );
  }
}
