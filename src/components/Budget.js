import React, { Component } from 'react';
import './Budget.scss';

export default class Budget extends Component{
  constructor(){
    super();

    this.state = {
      categories: [
        {
          name: 'Home',
          id: 0,
          subcategories: [
            {
              name: 'Rent',
              spending: 1000,
              id: 3
            },
            {
              name: 'Utilities',
              spending: 100,
              id: 8
            }
          ]
        },
        {
          name: 'Transportation',
          id: 1,
          subcategories: [
            {
              name: 'Auto Loan',
              spending: 200,
              id: 17
            },
            {
              name: 'Gas',
              spending: 100,
              id: 19
            },
            {
              name: 'Insurance',
              spending: 70,
              id: 6
            }
          ]
        },
      ]
    }
  }

  render(){
    //Display each category
    let categories = [];
    this.state.categories.forEach((i, index) => {
      categories.push(<Category name={i.name} categories={i.subcategories} id={i.id} key={index}/>)
    });

    return (
      <div className="app budget">
        <div className="table">
          {categories}
        </div>
      </div>
    );
  }
}

class Category extends Component{
  render(){
    //Calculate total spending
    let totalSpending = 0;
    this.props.categories.forEach(i => {
      totalSpending += i.spending;
    });

    //Generate rows
    let rows = [];
    this.props.categories.forEach((i, index) => {
      rows.push(<div className="row" id={i.id} key={index}><div className="name">{i.name}</div><div className="spending">{i.spending}</div></div>)
    });

    return (
      <div className="category">
        <div className="main">
          <div className="name">{this.props.name}</div>
          <div className="spending">{totalSpending}</div>
        </div>
        {rows}
      </div>
    );
  }
}
