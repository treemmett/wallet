import React, { Component } from 'react';
import classNames from 'classnames';
import ActionBar from './ActionBar';
import Sidebar from './Sidebar';
import Plus from '../svg/Plus';
import './Transactions.scss';
import formatCurrency from '../functions/formatCurrency';

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

  selectRows = (e, id) => {
    if(e.ctrlKey){
      const selected = this.state.selected.slice(0);
      selected.push(id);
      this.setState({selected: selected});
    }else{
      this.setState({selected: [id]});
    }
  }

  deselectRows = e => {
    //Remove new transaction if existing was cancelled
    if(this.state.selected.indexOf('new') >= 0){
      //Duplicate transactions
      const transactions = this.state.transactions.slice(0);

      //Find element for new transaction
      for(let i = 0; i < transactions.length; i++){
        if(transactions[i].id === 'new'){
            transactions.splice(i, 1);
            this.setState({transactions: transactions, selected: []});
            break;
        }
      }
    }else{
      this.setState({selected: []});
    }

  }

  getTransactions = e => {
    //Get transactions api call
    global.api.get('/api/budget/transactions')
    .then(res => this.setState({transactions: res.data, selected: []})).catch(_ => {});
  }

  newTransaction = e => {
    //Check if new transaction is already in scope
    if(this.state.selected.indexOf('new') !== -1){
      return;
    }

    const newState = this.state.transactions.slice(0);
    newState.unshift({id: 'new'});
    this.setState({transactions: newState, selected: ['new']});
  }

  render(){
    //Compile rows
    let rows = [];
    for(let i = 0; i < this.state.transactions.length; i++){
      //Check if row is selected
      const selected = this.state.selected.indexOf(this.state.transactions[i].id) >= 0;
      let editMode = false;

      if(selected){
        //Add edit prop if this is the only row selected
        editMode = this.state.selected.length === 1;
      }

      rows.push(<Row key={i} data={this.state.transactions[i]} editMode={editMode} selected={selected} refreshTransactions={this.getTransactions} select={this.selectRows} deselect={this.deselectRows}/>);
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

    //Remove formatting from amount
    let amount = Number((e.target.inflow.value || e.target.outflow.value).replace(/\$|,/g, ''));

    //Set the value to negative if transaction is a withdrawal
    if(e.target.outflow.value && !e.target.inflow.value){
      amount = 0 - amount;
    }

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

    //If this is a new transaction
    if(this.props.data.id === 'new'){
      //Add new transaction
      global.api.post('/api/budget/transactions', data).then(this.props.refreshTransactions).catch(err => {});
    }else{
      //Update existing transaction
      global.api.put('/api/budget/transactions/'+this.props.data.id, data).then(this.props.refreshTransactions).catch(err => {});
    }
  }

  render(){
    //Check if amount is inflow or outflow
    let inflow = '', outflow = '';
    if(this.props.data.amount){
      if(this.props.data.amount > 0){
        inflow = formatCurrency(Math.abs(this.props.data.amount).toString());
      }else{
        outflow = formatCurrency(Math.abs(this.props.data.amount).toString());
      }
    }

    //Row if edit mode is enabled
    if(this.props.editMode){
      return (
        <form className="row selected" onSubmit={this.save}>
          <div className="cell" data-type="date"><input name="date" placeholder="mm/dd/yy" defaultValue={this.props.data.date}/></div>
          <div className="cell" data-type="payee"><input name="payee" defaultValue={this.props.data.payee}/></div>
          <div className="cell" data-type="category"><input name="category" defaultValue={this.props.data.category}/></div>
          <div className="cell" data-type="notes"><input name="notes" defaultValue={this.props.data.notes}/></div>
          <div className="cell" data-type="outflow"><input name="outflow" onFocus={formatCurrency} onInput={formatCurrency} onBlur={formatCurrency} defaultValue={outflow}/></div>
          <div className="cell" data-type="inflow"><input name="inflow" onFocus={formatCurrency} onInput={formatCurrency} onBlur={formatCurrency} defaultValue={inflow}/></div>
          <div className="actions">
            <span onClick={this.props.deselect}>Cancel</span>
            <input type="submit" value="Save"/>
          </div>
        </form>
      );
    }

    //Row if not editing
    return (
      <div className={classNames({row: true, selected: this.props.selected})} onClick={e => this.props.select(e, this.props.data.id)}>
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
