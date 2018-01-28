import React, { Component } from 'react';
import './Budget.scss';

export default class Budget extends Component{
  render(){
    return (
      <div className="app budget">
        <div className="table">
          <Category/>
          <Category/>
        </div>
      </div>
    );
  }
}

class Category extends Component{
  constructor(props){
    super();

    this.state = {
      name: 'Category',
      categories: [
        {
          name: 'Subcategory 1',
          spending: 1000
        },
        {
          name: 'Subcategory 2',
          spending: 100
        }
      ]
    }
  }

  render(){
    //Calculate total spending
    let totalSpending = 0;
    this.state.categories.forEach(i => {
      totalSpending += i.spending;
    });

    //Generate rows
    let rows = [];
    this.state.categories.forEach((i, index) => {
      rows.push(<div className="row" key={index}><div className="name">{i.name}</div><div className="spending">{i.spending}</div></div>)
    });

    return (
      <div className="category">
        <div className="main">
          <div className="name">{this.state.name}</div>
          <div className="spending">{totalSpending}</div>
        </div>
        {rows}
      </div>
    );
  }
}
