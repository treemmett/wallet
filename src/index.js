import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';

import './index.scss';

//Components
import App from './components/App';
import Income from './components/Income';
import Sidebar from './components/Sidebar';

class Root extends Component{
  render(){
    return (
      <BrowserRouter>
        <div className="root">
          <Sidebar/>
          <Switch>
            <Route exact path="/" component={App}/>

            <Route exact path="/income" component={Income}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<Root/>, document.getElementById('root'));
registerServiceWorker();
