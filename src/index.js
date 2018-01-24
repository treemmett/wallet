import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';

import './index.scss';

//Components
import App from './components/App';
import Sidebar from './components/Sidebar';

class Root extends Component{
  render(){
    return (
      <BrowserRouter>
        <div className="root">
          <Sidebar/>
          <Switch>
            <Route exact path="/" component={App}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<Root/>, document.getElementById('root'));
registerServiceWorker();
