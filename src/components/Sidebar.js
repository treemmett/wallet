import React, { Component } from 'react';
import './Sidebar.scss';

export default class Sidebar extends Component{
  render(){
    return (
      <div className="sidebar">
        <div className="brand">Wallet</div>
        <div className="nav">
          <a href="#null">Budget</a>
          <a href="#null">Tax</a>
        </div>
      </div>
    );
  }
}
