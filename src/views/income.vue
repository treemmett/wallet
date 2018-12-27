<template>
  <Dashboard>
    <div class="income">
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
                <option value="hourly">Hourly Work</option>
                <option value="salary">Salary Work</option>
              </select>
            </div>
            <div class="col"><Money :value="incomeSource.rate" @change="setIncome(incomeSource.id, { rate: arguments[0] })"/></div>
            <div class="col" v-if="incomeSource.type === 'hourly'"><input :value="incomeSource.hours" min="0" type="number" @change="setIncome(incomeSource.id, { hours: $event.target.value })"/></div>
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
    ...mapState(['income'])
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
      &:hover{
        input, select{
          border-color: #aaa;
        }
      }

      input, select{
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

      select::after{
        content: '\e913';
      }
    }
  }
</style>