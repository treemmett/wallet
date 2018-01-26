import React, { Component } from 'react';

export default class Income extends Component{
  saveIncome = e => {
    e.preventDefault();
    alert('Done');
  }

  formatCurrency = e => {
    //Remove all non currency characters from value
    const val = e.target.value.trim().replace(/[^\d.{1}]/g, '');

    //Remove all periods after the first
    const split = val.split('.');

    //Seperate dollars and cents
    const dollars = split.shift();
    let cents = split.join('').substring(0,2);

    //Add decimal if needed
    if(split.length || e.type === 'blur'){
      cents = '.' + cents;
    }

    //Add padding to cents
    if(e.type === 'blur'){
      cents += '0'.repeat(3 - cents.length);
    }

    //Store numeric value
    const value = Number(dollars + cents);

    if(e.type === 'blur' && value === 0){
      e.target.value = null;
    }else{
      e.target.value = '$' + dollars.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + cents;
    }
  }

  render(){
    return (
      <div className="app">
        <section>
          <div className="title">Income</div>
          <form onSubmit={this.saveIncome}>
            <label>Pay Scale</label>
            <div className="radio">
              <div className="option">
                <input type="radio" id="income_scale_hourly" name="income_scale" value="hourly" required/>
                <label htmlFor="income_scale_hourly">Hourly</label>
              </div>

              <div className="option">
                <input type="radio" id="income_scale_salary" name="income_scale" value="salary"/>
                <label htmlFor="income_scale_salary">Salary</label>
              </div>
            </div>

            <label htmlFor="income_hours">Average Hours per Week</label>
            <input id="income_hours" name="income_hours" required/>

            <label htmlFor="income_rate">Income Rate</label>
            <input id="income_rate" name="income_rate" placeholder="$00.00" onChange={this.formatCurrency} onFocus={this.formatCurrency} onBlur={this.formatCurrency}required/>

            <input type="submit" value="Save"/>
          </form>
        </section>
      </div>
    );
  }
}
