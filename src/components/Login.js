import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Login.scss';

export default class Login extends Component{
  login = e => {
    e.preventDefault();

    //Compile data body
    const data = {
      email: e.target.elements.email.value.trim(),
      password: e.target.elements.password.value.trim()
    }

    global.api.post('/api/auth', data).then(response => {
      if(response.data.success){

        //Navigate to root
        this.props.history.push('/');
      }
    }).catch(_ => {});
  }

  register = e => {
    e.preventDefault();

    //Compile data body
    const data = {
      email: e.target.elements.email.value.trim(),
      password: e.target.elements.password.value.trim(),
      confirm_password: e.target.elements.confirm_password.value.trim()
    }

    global.api.post('/api/auth/register', data).then(response => {
      if(response.data.success){
        alert('Registration successful');

        //Navigate to root
        this.props.history.push('/');
      }
    }).catch(_ => {});
  }

  checkConfirmPassword = e => {
    //Main password input
    const password = document.forms[0].elements.password;
    if(password.value !== e.target.value){
      //Add input validity error
      e.target.setCustomValidity('Passwords do not match.');
    }else{
      //Remove validity error
      e.target.setCustomValidity('');
    }
  }

  render(){
    const isLoginPage = this.props.match.path === '/login';

    return (
      <div className="root app login">
        {isLoginPage ?
          //Login card
          <form className="card" onSubmit={this.login}>
            <input placeholder="Email" type="email" name="email" required autoFocus/>
            <input placeholder="Password" type="password" name="password" required/>
            <div className="buttons">
              <Link to="/login/register" className="secondary">Register</Link>
              <input type="submit" className="main" value="Login"/>
            </div>
          </form>

         :

         //Register Card
          <form className="card" onSubmit={this.register}>
            <input placeholder="Email" type="email" name="email" required autoFocus/>
            <input placeholder="Password" type="password" name="password" required/>
            <input placeholder="Confirm Password" type="password" name="confirm_password" onChange={this.checkConfirmPassword} required/>
            <div className="buttons">
            <Link to="/login" style={{whiteSpace: 'nowrap', paddingLeft: 0, paddingRight: 0, fontSize: '1em'}} className="secondary">Have an account?</Link>
            <input type="submit" className="main" value="Register"/>
            </div>
          </form>
        }
      </div>
    );
  }
}
