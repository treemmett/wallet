<template>
  <Dashboard>
    <div class="budget-wrapper">
      <div class="budget">
        <div class="group" :class="{ collapsed: collapsedGroups.indexOf(group.id) > -1}" v-for="group in budget" :key="group.id">
          <div class="head">
            <div class="title">
              {{group.name}}
              <div class="click-icon icon-plus" :class="{ visible: categoryCreation === group.id }" @click.stop="setCategoryCreation(group.id)">
                <div class="tooltip" v-if="categoryCreation === group.id">
                  <input v-focus placeholder="New Category Name" @keypress.enter="createCategory($event, group.id)"/>
                </div>
              </div>
            </div>
            <div class="amount">Budgeted</div>
            <div class="amount">Used</div>
            <div class="click-icon carot icon-angle-down" @click="collapseGroup(group.id)"/>
          </div>

          <div class="categories">
            <div class="category" v-for="category in group.categories" :key="category.id">
              <div class="title">{{category.name}}</div>
              <div class="amount">{{formatMoney(category.budget)}}</div>
              <div class="amount">{{formatMoney(category.expenses)}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="card"/>
  </Dashboard>
</template>

<script>
import Dashboard from '../layouts/dashboard';

const moneyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
});

export default {
  name: 'Budget',
  components: {
    Dashboard
  },
  data(){
    return {
      budget: [
        {
          name: 'Housing',
          id: 4179322703,
          categories: [
            {
              name: 'Rent',
              budget: 1000,
              expenses: 1000,
              id: 2425467916
            },
            {
              name: 'Electric Bill',
              budget: 80,
              expenses: 78,
              id: 1836338723
            }
          ]
        },
        {
          name: 'Transportation',
          id: 9716634112,
          categories: [
            {
              name: 'Auto Loan',
              budget: 500,
              expenses: 478,
              id: 3462203473
            },
            {
              name: 'Fuel',
              budget: 100,
              expenses: 27,
              id: 4096856227
            },
            {
              name: 'Insurance',
              budget: 150,
              expenses: 67,
              id: 9401003545
            }
          ]
        },
        {
          name: 'Food',
          id: 1868312036,
          categories: [
            {
              name: 'Groceries',
              budget: 200,
              expenses: 139,
              id: 3224896798
            },
            {
              name: 'Dining',
              budget: 100,
              expenses: 114,
              id: 5305833339
            }
          ]
        }
      ],
      collapsedGroups: [],
      categoryCreation: undefined
    }
  },
  methods: {
    clearCategoryCreation(e){
      if(e.code === 'Escape' || e.type === 'click' || e === true){
        // remove cancel function and unset creation
        this.categoryCreation = undefined;
        window.removeEventListener('keydown', this.clearCategoryCreation);
        window.removeEventListener('click', this.clearCategoryCreation);
      }
    },
    collapseGroup(id){
      // check if group is already collapsed
      const index = this.collapsedGroups.indexOf(id);
      if(index > -1){
        this.collapsedGroups.splice(index, 1);
      }else{
        this.collapsedGroups.push(id);
      }
    },
    createCategory(e, id){
      // clear if value is empty
      if(!e.target.value){
        return this.clearCategoryCreation(true);
      }

      // create object for category
      const category = {
        name: e.target.value,
        id: Math.floor(Math.random() * 1000000),
        budget: 0,
        expenses: 0
      }

      // find group to add category
      const group = this.budget.find(obj => obj.id === id);

      // add category
      group.categories.push(category);

      // uncollapse group if needed
      const index = this.collapsedGroups.indexOf(id);
      if(index > -1) this.collapsedGroups.splice(index, 1);
      console.log(index);

      // close input
      this.clearCategoryCreation(true);
    },
    formatMoney(value){
      return moneyFormatter.format(value);
    },
    setCategoryCreation(id){
      // add listeners to remove creation input
      window.addEventListener('keydown', this.clearCategoryCreation);
      window.addEventListener('click', this.clearCategoryCreation);
      this.categoryCreation = id;
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../colors';

  .budget-wrapper{
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    padding: 2em;
    padding-right: 22em;
    box-sizing: border-box;
    overflow: auto;
    height: 100%;
  }

  .group{
    background-color: #fff;
    box-shadow: 0 5px 20px rgba(#000, 0.1);
    border-radius: 6px;
    margin-bottom: 1em;
    position: relative;

    &:last-child{
      margin-bottom: 0;
    }

    &:hover .click-icon{
      opacity: 1;
    }

    &.collapsed{
      .carot{
        opacity: 1;
        transform: rotate(180deg);
      }

      .categories{
        max-height: 0;
        border-top-color: rgba(#ddd, 0);
        transition: max-height 0.5s cubic-bezier(0, 1, 0, 1), border-top-color 0.2s ease-in-out;
      }
    }
  }

  .head{
    font-size: 20px;
    padding: 1em;
    display: flex;
    align-items: center;

    .amount{
      font-size: 12px;
    }

    .carot{
      position: absolute;
      right: 1rem;
    }
  }

  .tooltip{
    position: absolute;
    top: calc(100% + 10px);
    border-radius: 6px;
    left: -2em;
    box-shadow: 0 0 20px 5px rgba(#000, 0.1);
    cursor: default;
    font-weight: 500;
    white-space: nowrap;
    background: $orange-gradient;
    z-index: 5;

    input{
      border: none;
      outline: none;
      padding: 1em;
      font-size: 16px;
      background-color: transparent;
      font-weight: 500;
      color: #fff;

      &::placeholder{
        color: #fff;
      }
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

    &.visible{
      opacity: 1 !important;
    }
  }

  .categories{
    border-top: 1px solid #ddd;
    margin: 0 1em;
    font-size: 18px;
    transition: max-height 1s ease-in-out, border-top-color 0.2s ease-in-out;
    overflow: hidden;
    max-height: 1000px;
  }

  .category{
    display: flex;
    align-items: center;
    padding: 1em 0;
  }

  .title{
    margin-right: auto;
  }

  .amount{
    color: #888;
    width: 100px;
    margin-left: 1em;
  }

  .card{
    position: absolute;
    right: 2em;
    width: 18em;
    max-height: calc(75% - 4em);
    overflow: scroll;
    background-color: #fff;
    box-shadow: 0 5px 20px rgba(#000, 0.1);
    border-radius: 6px;
    padding: 1em;
    box-sizing: border-box;
  }
</style>