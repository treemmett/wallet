import React, { Component } from 'react';
import './Budget.scss';

export default class Budget extends Component{
  constructor(){
    super();

    this.state = {
      categories: []
    }
  }

  componentDidMount(){
    //Get budget on mount
    this.getBudget();
  }

  getBudget = e => {
    fetch('/api/budget').then(res => res.json()).then(res => this.setState({categories: res}));
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
