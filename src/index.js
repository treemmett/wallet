import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';

import './index.scss';

//Components
import App from './components/App';
import Budget from './components/Budget';
import Income from './components/Income';
import Login from './components/Login';

class Root extends Component{
  constructor(){
    super();

    //Setup Axios instance
    global.api = axios.create({
      headers: {
        'content-type': 'application/json'
      }
    });

    //Set response interceptor
    global.api.interceptors.response.use(response => {

      //Add access token to localStorage
      if(response.headers['access-token']){
        localStorage.setItem('token', response.headers['access-token']);
      }

      return response;
    });
  }

  render(){
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={App}/>

          <Route exact path="/income" component={Income}/>
          <Route exact path="/budget" component={Budget}/>

          <Route exact path="/login" component={Login}/>
          <Route exact path="/login/register" component={Login}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<Root/>, document.getElementById('root'));
registerServiceWorker();
