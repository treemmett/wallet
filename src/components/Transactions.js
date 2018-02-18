import React, { Component } from 'react';
import moment from 'moment';
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
    //Get transactions api call
    global.api.get('/api/budget/transactions')
    .then(res => this.setState({transactions: res.data})).catch(_ => {});
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

      rows.push(<Row key={i} data={this.state.transactions[i]} editMode={selected}/>);
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
  render(){
    //Row if edit mode is enabled
    if(this.props.editMode){
      return (
        <div className="row edit">
          <div className="cell" data-type="date"><input ref="name" placeholder="mm/dd/yy"/></div>
          <div className="cell" data-type="payee"><input ref="payee"/></div>
          <div className="cell" data-type="category"><input ref="category"/></div>
          <div className="cell" data-type="notes"><input ref="notes"/></div>
          <div className="cell" data-type="outflow"><input ref="outflow" type="number" min="0.01" step="0.01"/></div>
          <div className="cell" data-type="inflow"><input ref="inflow" type="number" min="0.01" step="0.01"/></div>
          <div className="actions">
            <span>Cancel</span>
            <span>Save</span>
          </div>
        </div>
      );
    }

    //Row if not editing
    return (
      <div className="row">
        <div className="cell" data-type="date">{moment.unix(this.props.data.date).format('MMM DD, YYYY')}</div>
        <div className="cell" data-type="payee">{this.props.data.payee}</div>
        <div className="cell" data-type="category">{this.props.data.category}</div>
        <div className="cell" data-type="notes"></div>
        <div className="cell" data-type="outflow">{this.props.data.amount}</div>
        <div className="cell" data-type="inflow"></div>
      </div>
    );
  }
}
