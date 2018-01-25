import React, { Component } from 'react';

export default class Income extends Component{
  saveIncome = e => {
    e.preventDefault();
    alert('Done');
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
            <input id="income_rate" name="income_rate" placeholder="$00.00" required/>

            <input type="submit" value="Save"/>
          </form>
        </section>
      </div>
    );
  }
}
