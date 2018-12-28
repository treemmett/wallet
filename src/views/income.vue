<template>
  <Dashboard>
    <div class="income">
      <section>
        <div class="header">
          <div class="title">Summary</div>
        </div>

        <div class="summary">
          <div class="item">
            <div class="label">Gross Income</div>
            <div class="value">{{formatCurrency($store.getters.income.gross)}}</div>
          </div>

          <div class="item">
            <div class="label">Est. Fed Tax</div>
            <div class="value">{{formatCurrency($store.getters.income.tax.federal)}}</div>
          </div>

          <div class="item">
            <div class="label">Est. {{tax.state.toUpperCase()}} Tax</div>
            <div class="value">{{formatCurrency($store.getters.income.tax.state)}}</div>
          </div>

          <div class="item">
            <div class="label">Net Income</div>
            <div class="value">{{formatCurrency($store.getters.income.net)}}</div>
          </div>
        </div>
      </section>

      <section>
        <div class="header">
          <div class="title">
            Recurring Income
            <div class="click-icon icon-plus"/>
          </div>
        </div>

        <div class="table">
          <div class="head">
            <div class="col">Description</div>
            <div class="col">Type</div>
            <div class="col">Rate</div>
            <div class="col">Hours per Week</div>
          </div>

          <div class="row" v-for="incomeSource in income" :key="incomeSource.id">
            <div class="col"><input :value="incomeSource.description" @change="setIncome(incomeSource.id, { description: $event.target.value })"/></div>
            <div class="col">
              <select :value="incomeSource.type" @change="setIncome(incomeSource.id, { type: $event.target.value })">
                <option value="hourly">Hourly</option>
                <option value="salary">Salary</option>
              </select>
            </div>
            <div class="col"><Money :value="incomeSource.rate" @change="setIncome(incomeSource.id, { rate: arguments[0] })" :precission="incomeSource.type === 'hourly'"/></div>
            <div class="col" v-if="incomeSource.type === 'hourly'"><input :value="incomeSource.hours" min="0" type="number" @input="setIncome(incomeSource.id, { hours: parseInt($event.target.value, 10) })"/></div>
          </div>
        </div>
      </section>

      <section>
        <div class="header">
          <div class="title">Tax</div>
        </div>
        <div class="table">
          <div class="row">
            <div class="col">State</div>
            <div class="col">
              <select :value="tax.state" @change="$store.commit('setTax', { state: $event.target.value })">
                <option value="ut">Utah</option>
              </select>
            </div>
          </div>
          <div class="row">
            <div class="col">Filing Status</div>
            <div class="col">
              <select :value="tax.status" @change="$store.commit('setTax', { status: $event.target.value })">
                <option value="single">Single</option>
                <option value="married">Married</option>
                <option value="marriedSeparately">Married - Filing Seperately</option>
                <option value="headOfHousehold">Head of Household</option>
              </select>
            </div>
          </div>
        </div>
      </section>
    </div>
  </Dashboard>
</template>

<script>
import Dashboard from '../layouts/dashboard';
import Money from '../components/money';
import { mapState } from 'vuex';

export default {
  components: {
    Dashboard,
    Money
  },
  methods: {
    setIncome(id, obj){
      this.$store.commit('setIncome', { ...obj, id });
    }
  },
  computed: {
    ...mapState([
      'income',
      'tax'
      ])
  }
}
</script>


<style lang="scss" scoped>
  @import '../colors';

  .income{
    padding: 2em;
    box-sizing: border-box;
    overflow: auto;
    height: 100%;
  }

  section{
    background-color: #fff;
    box-shadow: 0 5px 20px rgba(#000, 0.1);
    border-radius: 6px;
    margin-bottom: 1em;
    position: relative;
    padding: 0 1em;

    &:last-child{
      margin-bottom: 0;
    }

    &:hover .click-icon{
      opacity: 1;
    }
  }

  .header{
    font-size: 20px;
    padding: 1em 0;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ddd;
  }

  .summary{
    display: flex;
    justify-content: space-between;
    padding: 1em 0;

    .label{
      color: #888;
      margin-bottom: 0.25em;
    }
  }

  .click-icon{
    position: relative;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    width: 1.75rem;
    height: 1.75rem;
    color: #aaa;
    opacity: 0;
    font-size: 16px;
    transition: background-color 0.15s ease-in-out, transform 0.15s ease-in-out, opacity 0.1s ease-in-out;
    cursor: pointer;

    &:hover{
      background-color: #eee;
    }
  }

  .table{
    display: table;
    width: 100%;
    box-sizing: border-box;
    table-layout: fixed;
    border-collapse: collapse;
    margin-top: 1em;

    .head{
      color: #888;
    }

    .head, .row{
      display: table-row;
      height: 2em;

      .col{
        display: table-cell;
        text-align: left;
      }
    }

    .row{
      input:not([type=checkbox]), select{
        background-color: transparent;
        border: 1px solid transparent;
        font-size: 16px;
        outline: none;
        border-radius: 5px;
        padding: 2px;
        appearance: none;

        &:focus{
          border-color: $blue;
          box-shadow: 0 0 1px $blue;
        }
      }

      &:hover{
        input, select{
          border-color: #aaa;
        }
      }
    }
  }
</style>