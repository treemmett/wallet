import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';

import './index.scss';

//Components
import App from './components/App';
import Budget from './components/Budget';
import Income from './components/Income';
import Login from './components/Login';
import Transactions from './components/Transactions';

class Root extends Component{
  constructor(){
    super();

    //Setup Axios instance
    global.api = axios.create({
      headers: {
        'content-type': 'application/json'
      }
    });

    //Set request interceptor
    global.api.interceptors.request.use(config => {

      //Add token to all requests
      if(localStorage.token){
        config.headers.authorization = 'Bearer '+localStorage.token;
      }

      return config;
    });

    //Set response interceptor
    global.api.interceptors.response.use(response => {

      //Add access token to localStorage
      if(response.headers['access-token']){
        localStorage.setItem('token', response.headers['access-token']);
      }

      return response;
    }, error => {

      if(error.response){

        //Remove token if 401 is received
        if(error.response.status === 401){
          localStorage.removeItem('token');
          window.location.href = '/login';
        }

        console.error(error.response.data.error);

        if(error.response.data.message){
          alert(error.response.data.message);
        }
      }else if(error.request){
        console.error(error.request);
      }else{
        console.error(error.message);
        alert('Something went wrong');
      }

      return Promise.reject(error);
    });
  }

  render(){
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={App}/>

          <Route exact path="/login" component={Login}/>
          <Route exact path="/login/register" component={Login}/>

          <PrivateRoute  exact path="/budget" component={Budget}/>
          <PrivateRoute exact path="/income" component={Income}/>
          <PrivateRoute  exact path="/transactions" component={Transactions}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    checkAuth()
      ? <Component {...props}/>
      : <Redirect to={{pathname: '/login', state: {referrer: props.match.path}}}/>
  )} />
);

function checkAuth(){
  //Return false if token is not saved
  if(!localStorage.token){
    return false;
  }

  //Parse token expiration date
  const tokenExp = JSON.parse(atob(localStorage.token.split('.')[1])).exp;
  const epoch = Math.floor(new Date().getTime() / 1000);

  const valid = tokenExp > epoch;

  if(!valid){
    //Clear storage if session is expired
    localStorage.clear();
  }

  return valid;
}

ReactDOM.render(<Root/>, document.getElementById('root'));
registerServiceWorker();
