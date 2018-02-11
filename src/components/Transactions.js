import React, { Component } from 'react';
import Sidebar from './Sidebar';
import './Transactions.scss';

export default class Transactions extends Component{
  render(){
    let a = [];
    for(let i = 0; i < 10; i++){
      a.push(<Row/>);
    }

    return (
      <div className="root">
        <Sidebar/>
        <div className="app transactions">
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
              {a}
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
        <div className="cell" data-type="date">01/01/2018</div>
        <div className="cell">Store</div>
        <div className="cell">Groceries</div>
        <div className="cell"></div>
        <div className="cell" data-type="outflow">$36.56</div>
        <div className="cell" data-type="inflow">$2.56</div>
      </div>
    );
  }
}
