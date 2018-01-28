import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.scss';

export default class Sidebar extends Component{
  render(){
    return (
      <div className="sidebar">
        <div className="brand">Wallet</div>
        <div className="nav">
          <Link to="/budget">Budget</Link>
          <Link to="/income">Income & Tax</Link>
        </div>
      </div>
    );
  }
}
