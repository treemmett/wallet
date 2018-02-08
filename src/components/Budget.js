import React, { Component } from 'react';
import Plus from '../svg/Plus';
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
    global.api.get('/api/budget')
    .then(res => this.setState({categories: res.data}));
  }

  createCategory = (e, that) => {
    const saveCategory = e1 => {
      e1.preventDefault();

      //Duplicate state
      const categories = this.state.categories.slice(0);

      //Find category with ID
      for(let i = 0; i < categories.length; i++){
        if(categories[i].id !== that.props.id){
          continue;
        }

        //Add new category to duplicate
        categories[i].subcategories.push({name: e1.target.name.value.trim(), spending: 0});

        //Update state
        this.setState({categories: categories, modal: null});
      }
    }

    //Create modal for new category
    const modal = <div className="modal">
      <form onSubmit={saveCategory}>
        <label htmlFor="category_name">Category Name</label>
        <input id="category_name" name="name" autoFocus required/>
        <input type="submit" value="Save"/>
        <button onClick={_ => this.setState({modal: null})} className="secondary">Cancel</button>
      </form>
    </div>

    //Add modal to DOM
    this.setState({modal: modal});
  }

  render(){
    //Display each category
    let categories = [];
    this.state.categories.forEach((i, index) => {
      categories.push(<Category createCategory={this.createCategory} name={i.name} categories={i.subcategories} id={i.id} key={index}/>)
    });

    return (
      <div className="app budget">
        { this.state.modal }
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
          <Plus className="add" onClick={e => this.props.createCategory(e, this)}/>
          <div className="spending">{totalSpending}</div>
        </div>
        {rows}
      </div>
    );
  }
}
