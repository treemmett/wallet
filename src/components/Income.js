import React, { Component } from 'react';
import classNames from 'classnames';

export default class Income extends Component{
  constructor(){
    super();

    this.state = {
      scaleHourly: false
    }
  }

  saveIncome = e => {
    e.preventDefault();

    //Convert rate string to number
    const rate = Number(e.target['income_rate'].value.replace(/\$|,/g, ''));

    //Save settings
    localStorage.setItem('income', JSON.stringify({
      rate: rate,
      scale: e.target['income_scale'].value.trim(),
      hours: this.state.scaleHourly ? e.target['income_hours'].value.trim() : undefined
    }));

    alert('Settings saved');
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

  updateScale = e => {
    this.setState({scaleHourly: e.target.value === 'hourly'});
    e.target.blur();
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
                <input type="radio" id="income_scale_hourly" name="income_scale" value="hourly" onChange={this.updateScale} required/>
                <label htmlFor="income_scale_hourly">Hourly</label>
              </div>

              <div className="option">
                <input type="radio" id="income_scale_salary" name="income_scale" value="salary" onChange={this.updateScale}/>
                <label htmlFor="income_scale_salary">Salary</label>
              </div>
            </div>

            <label className={classNames({hidden: !this.state.scaleHourly})} htmlFor="income_hours">Average Hours per Week</label>
            <input className={classNames({hidden: !this.state.scaleHourly})} id="income_hours" name="income_hours" required={this.state.scaleHourly}/>

            <label htmlFor="income_rate">Income Rate</label>
            <input id="income_rate" name="income_rate" placeholder="$00.00" onChange={this.formatCurrency} onFocus={this.formatCurrency} onBlur={this.formatCurrency} required/>

            <input type="submit" value="Save"/>
          </form>
        </section>
      </div>
    );
  }
}
