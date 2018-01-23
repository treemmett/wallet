import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import './index.scss';

//Components
import App from './components/App';
import Sidebar from './components/Sidebar';

class Root extends Component{
  render(){
    return (
      <div className="root">
        <Sidebar/>
        <App/>
      </div>
    );
  }
}

ReactDOM.render(<Root/>, document.getElementById('root'));
registerServiceWorker();
