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
import Sidebar from './components/Sidebar';

class Root extends Component{
  constructor(){
    super();

    //Setup Axios instance
    global.api = axios.create({
      headers: {
        'content-type': 'application/json'
      }
    });
  }

  render(){
    return (
      <BrowserRouter>
        <div className="root">
          <Sidebar/>
          <Switch>
            <Route exact path="/" component={App}/>

            <Route exact path="/income" component={Income}/>
            <Route exact path="/budget" component={Budget}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<Root/>, document.getElementById('root'));
registerServiceWorker();
