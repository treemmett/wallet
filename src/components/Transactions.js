import React, { Component } from 'react';
import ActionBar from './ActionBar';
import Sidebar from './Sidebar';
import Plus from '../svg/Plus';
import './Transactions.scss';

export default class Transactions extends Component{
  constructor(){
    super();
    this.state = {
      transactions: [],
      selected: [],
      actionBarFunctions: {
        left: [
          {
            icon: <Plus/>,
            action: this.newTransaction
          }
        ],
        right: []
      }
    }
  }

  componentDidMount(){
    this.getTransactions();
  }

  getTransactions = e => {
    //Get transactions api call
    global.api.get('/api/budget/transactions')
    .then(res => this.setState({transactions: res.data, selected: []})).catch(_ => {});
  }

  newTransaction = e => {
    const newState = this.state.transactions.slice(0);
    newState.unshift({});
    this.setState({transactions: newState, selected: [0]});
  }

  render(){
    //Compile rows
    let rows = [];
    for(let i = 0; i < this.state.transactions.length; i++){
      //Check if row is selected
      const selected = this.state.selected.indexOf(i) >= 0;

      rows.push(<Row key={i} data={this.state.transactions[i]} editMode={selected} refreshTransactions={this.getTransactions}/>);
    }

    return (
      <div className="root">
        <Sidebar/>
        <div className="app transactions">
          <ActionBar left={this.state.actionBarFunctions.left} right={this.state.actionBarFunctions.right}/>
          <div className="table">
            <div className="header">
              <div className="cell" data-type="date">Date</div>
              <div className="cell" data-type="payee">Payee</div>
              <div className="cell" data-type="category">Category</div>
              <div className="cell" data-type="notes">Notes</div>
              <div className="cell" data-type="outflow">Outflow</div>
              <div className="cell" data-type="inflow">Inflow</div>
            </div>
            <div className="body">
              {rows}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class Row extends Component{
  save = e => {
    e.preventDefault();

    //Check if inflow and outflow is filled
    if(e.target.elements.outflow.value && e.target.elements.inflow.value){
      alert('Do not use inflow and outflow in same transaction');
      return;
    }

    //Calculate value of transaction
    const amount = Number(e.target.inflow.value || -e.target.outflow.value);

    //Compile data to send
    const data = {
      date: e.target.elements.date.value.trim(),
      payee: e.target.elements.payee.value.trim(),
      category: e.target.elements.category.value.trim(),
      notes: e.target.elements.notes.value.trim(),
      amount: amount
    }

    //Check if all data is present
    for(let i in data){
      //Continue if input is notes, notes are not required
      if(i === 'notes'){
        continue;
      }

      if(!data[i]){
        alert('Missing required input');
        return;
      }
    }

    //Send API request
    global.api.post('/api/budget/transactions', data).then(this.props.refreshTransactions).catch(err => {});
  }

  render(){
    //Check if amount is inflow or outflow
    let inflow, outflow;
    if(this.props.data.amount > 0){
      inflow = Math.abs(this.props.data.amount);
    }else{
      outflow = Math.abs(this.props.data.amount);
    }

    //Row if edit mode is enabled
    if(this.props.editMode){
      return (
        <form className="row edit" onSubmit={this.save}>
          <div className="cell" data-type="date"><input name="date" placeholder="mm/dd/yy"/></div>
          <div className="cell" data-type="payee"><input name="payee"/></div>
          <div className="cell" data-type="category"><input name="category"/></div>
          <div className="cell" data-type="notes"><input name="notes"/></div>
          <div className="cell" data-type="outflow"><input name="outflow" type="number" min="0.01" step="0.01"/></div>
          <div className="cell" data-type="inflow"><input name="inflow" type="number" min="0.01" step="0.01"/></div>
          <div className="actions">
            <span>Cancel</span>
            <input type="submit" value="Save"/>
          </div>
        </form>
      );
    }

    //Row if not editing
    return (
      <div className="row">
        <div className="cell" data-type="date">{this.props.data.date}</div>
        <div className="cell" data-type="payee">{this.props.data.payee}</div>
        <div className="cell" data-type="category">{this.props.data.category}</div>
        <div className="cell" data-type="notes">{this.props.data.notes}</div>
        <div className="cell" data-type="outflow">{outflow}</div>
        <div className="cell" data-type="inflow">{inflow}</div>
      </div>
    );
  }
}
