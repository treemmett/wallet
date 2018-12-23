<template>
  <Dashboard>
    <div class="budget">
      <div class="group" :class="{ collapsed: collapsedGroups.indexOf(group.id) > -1}" v-for="group in $store.getters.budget.groups" :key="group.id">
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
            <div class="amount">
              <input v-model="category.budget" v-money="{ precision: 0 }"/>
            </div>
            <div class="amount">{{formatMoney(category.expenses)}}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="sidebar">
      <div class="card">
        <div class="date">
          <span class="icon-angle-left" @click="$store.commit('changeDate', { direction: -1 })"/>
          <div class="selector">
            <div class="month">{{months[$store.state.date.month]}}</div>
            <div class="year">{{$store.state.date.year}}</div>
          </div>
          <span class="icon-angle-right" @click="$store.commit('changeDate', { direction: 1 })"/>
        </div>

        <div class="summary">
          <div class="summary-item">
            <div class="title">Budgetted</div>
            <div class="value">${{$store.getters.budget.budgetted}}</div>
          </div>

          <div class="summary-item">
            <div class="title">Used</div>
            <div class="value">${{$store.getters.budget.used}}</div>
          </div>

          <div class="summary-item">
            <div class="title">Available</div>
            <div class="value">${{$store.getters.budget.available}}</div>
          </div>
        </div>
      </div>
    </div>
  </Dashboard>
</template>

<script>
import Dashboard from '../layouts/dashboard';
import moment from 'moment';

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
      collapsedGroups: [],
      categoryCreation: undefined,
      months: ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec']
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
    changeMonth(direction){
      
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

      this.$store.commit('addCategory', {
        categoryName: e.target.value,
        groupId: id
      });

      // uncollapse group if needed
      const index = this.collapsedGroups.indexOf(id);
      if(index > -1) this.collapsedGroups.splice(index, 1);

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

  .budget{
    padding: 2em;
    padding-right: 25em;
    box-sizing: border-box;
    overflow: auto;
    height: 100%;
  }

  .sidebar{
    position: absolute;
    top: 0;
    right: 0;
    width: 25em;
    height: 100%;
    padding: 0 2em;
    box-sizing: border-box;
    pointer-events: none;
    overflow-y: auto;

    .card{
      background-color: #fff;
      width: 100%;
      border-radius: 6px;
      padding: 1em;
      margin: 2em 0;
      box-sizing: border-box;
      pointer-events: auto;
      box-shadow: 0 5px 20px rgba(#000, 0.1);
    }

    .date{
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto;
      font-weight: 500;
      user-select: none;
      
      > span{
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 30px;
        color: #aaa;
        width: 1em;
        border-radius: 50%;
        transition: color 0.15s ease, background-color 0.15s ease-in-out;
        cursor: pointer;

        &:hover{
          background-color: #eee;
          color: darken(#aaa, 10%);
        }
      }

      .selector{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 4em;
      }

      .month{
        text-transform: uppercase;
      }
    }

    .summary{
      margin-top: 1em;
      border-top: 1px solid #ddd;

      .summary-item{
        display: flex;
        margin: 0.5em 0;
      }

      .title{
        font-size: 18px;
      }
    }
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

    &:hover{
      input{
        border-color: $blue;
      }
    }
  }

  .title{
    margin-right: auto;
  }

  .amount{
    color: #888;
    width: 100px;
    margin-left: 1em;

    input{
      color: inherit;
      font-size: inherit;
      width: 100%;
      outline: none;
      border-radius: 5px;
      border: 1px solid transparent;
      text-overflow: ellipsis;

      &:focus{
        border-color: $blue;
        box-shadow: 0 0 1px $blue;
      }
    }
  }
</style>