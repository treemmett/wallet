import React, { Component } from 'react';
import Plus from '../svg/Plus';
import Sidebar from './Sidebar';
import './Budget.scss';

export default class Budget extends Component{
  constructor(){
    super();

    this.state = {
      groups: []
    }
  }

  componentDidMount(){
    //Get budget on mount
    this.getBudget();
  }

  getBudget = e => {
    global.api.get('/api/budget')
    .then(res => this.setState({groups: res.data})).catch(_ => {});
  }

  createCategory = (e, that) => {
    const saveCategory = e1 => {
      e1.preventDefault();

      //Duplicate state
      const groups = this.state.groups.slice(0);

      //Find category with ID
      for(let i = 0; i < groups.length; i++){
        if(groups[i]._id !== that.props.id){
          continue;
        }

        //Add new category to duplicate
        groups[i].categories.push({name: e1.target.name.value.trim(), amount: 0});

        //Update state
        this.setState({groups: groups, modal: null});
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
    let groups = [];
    this.state.groups.forEach((i, index) => {
      groups.push(<Category createCategory={this.createCategory} name={i.name} groups={i.categories} id={i._id} key={index}/>)
    });

    return (
      <div className="root">
        <Sidebar/>
        <div className="app budget">
          { this.state.modal }
          <div className="table">
            {groups}
          </div>
        </div>
      </div>
    );
  }
}

class Category extends Component{
  render(){
    //Calculate total spending
    let totalSpending = 0;
    this.props.groups.forEach(i => {
      totalSpending += i.amount;
    });

    //Generate rows
    let rows = [];
    this.props.groups.forEach((i, index) => {
      rows.push(<div className="row" id={i._id} key={index}><div className="name">{i.name}</div><div className="spending">{i.amount}</div></div>)
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
