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
    const newState = this.state.transactions.concat({});
    this.setState({transactions: newState});
  }

  render(){
    //Compile rows
    let rows = [];
    for(let i = 0; i < this.state.transactions.length; i++){
      rows.push(<Row key={i} data={this.state.transactions[i]}/>);
    }

    return (
      <div className="root">
        <Sidebar/>
        <div className="app transactions">
          <ActionBar left={this.state.actionBarFunctions.left} right={this.state.actionBarFunctions.right}/>
          <div className="table">
            <div className="header">
              <div className="body">
                <div className="row">
                  <div className="cell" data-type="date">Date</div>
                  <div className="cell">Payee</div>
                  <div className="cell">Category</div>
                  <div className="cell">Notes</div>
                  <div className="cell" data-type="outflow">Outflow</div>
                  <div className="cell" data-type="inflow">Inflow</div>
                </div>
              </div>
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
    return (
      <div className="row">
        <div className="cell" data-type="date">{moment.unix(this.props.data.date).format('MMM DD, YYYY')}</div>
        <div className="cell">{this.props.data.payee}</div>
        <div className="cell">{this.props.data.category}</div>
        <div className="cell"></div>
        <div className="cell" data-type="outflow">{this.props.data.amount}</div>
        <div className="cell" data-type="inflow"></div>
      </div>
    );
  }
}
