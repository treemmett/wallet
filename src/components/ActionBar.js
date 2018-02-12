import React, { Component } from 'react';
import './ActionBar.scss';

export default class ActionBar extends Component{
  render(){

    //Compile left action items
    let left = [];
    if(this.props.left){
      for(let i = 0; i < this.props.left.length; i++){
        left.push(<div key={i} className="btn" onClick={this.props.left[i].action}>{this.props.left[i].icon}</div>)
      }
    }

    //Compile right action items
    let right = [];
    if(this.props.right){
      for(let i = 0; i < this.props.right.length; i++){
        right.push(<div key={i} className="btn" onClick={this.props.right[i].action}>{this.props.right[i].icon}</div>)
      }
    }

    return (
      <div className="actionBar">
        <div className="left">{left}</div>
        <div className="right">{right}</div>
      </div>
    );
  }
}
