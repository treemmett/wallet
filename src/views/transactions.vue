<template>
  <Dashboard>
    <div class="list">
      <div
        v-for="(transactions, date) in transactionsByDate"
        :key="date"
        class="transaction-group"
      >
        <div class="sticky-date">{{ date }}</div>
        <div class="transactions">
          <div
            v-for="item in transactions"
            :key="item.id"
            class="transaction"
            :class="{ selected: selected === item.id }"
            @click="select(item.id)"
          >
            <div class="card">
              <div class="description">{{ item.description }}</div>
              <div class="category">{{ item.categoryName }}</div>
              <div class="amount" :class="{ positive: item.amount > 0 }">
                {{ formatCurrency(item.amount) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <transition name="animation">
      <div v-if="sidebarOpen" class="sidebar" @click.self="sidebarOpen = false">
        <div class="card">
          <form name="transaction" @submit.prevent="saveTransaction">
            <form-input
              :key="selectedDetail.description"
              type="text"
              name="description"
              label="Description"
              :value="selectedDetail.description"
              required
            />

            <form-input
              :key="selectedDetail.category"
              type="select"
              name="category"
              label="Category"
              :value="selectedDetail.category"
              :select-display-value="selectedDetail.categoryName"
              required
            >
              <optgroup
                v-for="group in $store.getters.budget.groups"
                :key="group.id"
                :label="group.name"
              >
                <option
                  v-for="category in group.categories"
                  :key="category.id"
                  :value="category.id"
                >
                  {{ category.name }}
                </option>
              </optgroup>
            </form-input>

            <form-input
              :key="
                selectedDetail.amount ? Math.abs(selectedDetail.amount) : ''
              "
              name="amount"
              type="number"
              step="0.01"
              label="Amount"
              :value="
                selectedDetail.amount ? Math.abs(selectedDetail.amount) : ''
              "
              required
            />

            <form-input
              :key="selectedDetail.date"
              name="date"
              type="date"
              label="Date"
              :value="selectedDetail.date"
              required
            />

            <label>Type</label>
            <div class="radio">
              <input
                id="expense"
                type="radio"
                name="type"
                value="expense"
                :checked="!selectedDetail.amount || selectedDetail.amount <= 0"
                required
              />
              <label class="radio-selector" for="expense">Expense</label>
              <input
                id="income"
                type="radio"
                name="type"
                value="income"
                :checked="selectedDetail.amount > 0"
              />
              <label class="radio-selector" for="income">Income</label>
            </div>

            <div class="right">
              <input type="button" value="Cancel" @click="deselect" />
              <input type="submit" value="Save" />
            </div>
          </form>
        </div>
      </div>
    </transition>

    <Fab @click="sidebarOpen = true">
      <icon-plus />
      <template v-if="selected" slot="menu">
        <div class="icon" @click="saveTransaction">
          <icon-check />
        </div>
        <div class="icon">
          <icon-edit />
        </div>
        <div class="icon" @click="remove">
          <icon-trash />
        </div>
      </template>
    </Fab>
  </Dashboard>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import Dashboard from '../layouts/dashboard';
import Fab from '../components/fab';
import FormInput from '../components/FormInput';
import IconCheck from '../components/icons/IconCheck';
import IconEdit from '../components/icons/IconEdit';
import IconPlus from '../components/icons/IconPlus';
import IconTrash from '../components/icons/IconTrash';

export default {
  name: 'Transactions',
  components: {
    Dashboard,
    Fab,
    IconCheck,
    FormInput,
    IconEdit,
    IconPlus,
    IconTrash
  },
  data() {
    return {
      sidebarOpen: false,
      selected: null,
      selectedDetail: {}
    };
  },
  computed: {
    ...mapGetters(['transactions']),
    transactionsByDate() {
      const ts = this.transactions;
      const dt = {};

      ts.forEach(t => {
        // create array if it doesn't exist
        if (!dt[t.date]) dt[t.date] = [];

        dt[t.date].push(t);
      });

      return dt;
    }
  },
  methods: {
    ...mapMutations(['addTransaction', 'editTransaction', 'removeTransaction']),
    add(e) {
      // parse date object
      const date = new Date(e.target.elements.date.value)
        .toISOString()
        .substring(0, 10);

      this.addTransaction({
        description: e.target.elements.description.value.trim(),
        category: e.target.elements.category.value.trim(),
        amount: e.target.elements.amount.value.trim(),
        type: e.target.elements.type.value,
        date
      });

      // close sidebar
      this.deselect();
    },
    deselect() {
      this.selected = null;
      this.sidebarOpen = false;
      this.selectedDetail = {};
    },
    remove() {
      this.removeTransaction(this.selected);

      this.selected = null;
    },
    saveTransaction() {
      const { elements } = document.forms.transaction;

      // parse date object
      const date = new Date(elements.date.value).toISOString().substring(0, 10);

      const transactionData = {
        description: elements.description.value.trim(),
        category: parseInt(elements.category.value.trim(), 10),
        amount: elements.amount.value.trim(),
        type: elements.type.value,
        date
      };

      if (this.selectedDetail.id) {
        this.editTransaction({
          id: this.selectedDetail.id,
          data: transactionData
        });
      } else {
        this.addTransaction(transactionData);
      }

      this.deselect();
    },
    select(id) {
      const selectedTransaction = this.transactions.find(t => t.id === id);

      if (!selectedTransaction) return;

      this.selected = id;
      this.sidebarOpen = true;
      this.selectedDetail = { ...selectedTransaction };
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../colors';

.list {
  width: 100%;
  left: 0;
  top: 0;
  padding: 1em;
  padding-right: 20em;
  box-sizing: border-box;
  overflow: auto;
  height: 100%;
}

.sidebar {
  position: absolute;
  top: 0;
  right: 0;
  width: 20em;
  height: 100%;
  padding: 0 1em;
  box-sizing: border-box;
  pointer-events: none;
  overflow-y: auto;

  .card {
    background-color: #fff;
    border-radius: 6px;
    padding: 1em;
    margin: 1em 0;
    box-sizing: border-box;
    pointer-events: auto;
    box-shadow: 0 5px 20px rgba(#000, 0.1);

    select {
      margin-bottom: 1em;
    }
  }

  .right {
    margin-top: 0.75em;
    text-align: right;

    input {
      font-size: 16px;
      border-radius: 10px;
      outline: none;
      padding: 0.75em 1.25em;
      margin-left: 0.5em;
      cursor: pointer;
      transition: background-color 0.15s ease, box-shadow 0.15s ease;
      background-color: #fff;
      border: 1px solid #ccc;
      -webkit-appearance: none;
      -moz-appearance: none;

      &[type='submit'] {
        background: $blue;
        color: #fff;
        border: none;

        &:hover {
          box-shadow: 0 1px 1px rgba(darken($blue, 10%), 0.5);
          background-color: darken($blue, 3%);
        }
      }

      &:hover {
        box-shadow: 0 1px 1px rgba(#000, 0.2);
      }
    }
  }
}

.transaction-group {
  display: flex;
  margin-bottom: 1em;

  &:last-child {
    margin-bottom: 0;
  }
}

.sticky-date {
  position: sticky;
  top: 0;
  flex: 0 0 6.5em;
  align-self: flex-start;
  text-align: right;
  margin-right: 1em;
  color: #777;
}

.transactions {
  flex-grow: 1;
}

.transaction {
  position: relative;
  box-shadow: 0 1px 5px rgba(#000, 0.1);
  border-radius: 6px;
  margin-bottom: 1em;
  transition: box-shadow 0.15s ease-in-out;

  .card {
    position: relative;
    padding: 1em;
    background-color: #fff;
    border-radius: 6px;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      width: 0;
      height: 3px;
      transform: translateX(-50%);
      top: 0;
      left: 50%;
      background: $blue-gradient;
      transition: width 0.2s ease-in-out;
    }
  }

  &:last-child {
    margin-bottom: 0;
  }

  &.selected,
  &:hover {
    box-shadow: 0 5px 20px rgba(#000, 0.1);
    cursor: pointer;
  }

  &.selected .card::before {
    width: 100%;
  }

  .category {
    color: #757575;
    font-size: 14px;
  }

  .amount {
    position: absolute;
    right: 0;
    padding-right: 1em;
    bottom: 50%;
    transform: translateY(50%);
    font-size: 18px;
    color: #e41e0a;
    font-weight: 500;

    &.positive {
      color: #659157;
    }
  }
}

@media screen and (max-width: $break) {
  .transaction-group {
    display: block;
    margin-bottom: 0;
    padding-bottom: 1px;
  }

  .transaction {
    margin: 1em;

    &:first-child {
      margin-top: 0.25em;
    }

    &:last-child {
      margin-bottom: 1em;
    }
  }

  .sticky-date {
    margin: 0;
    padding: 0.75em 0;
    text-align: center;
    z-index: 1;
    background-color: #f8f8f8;
  }

  .list {
    padding: 0;
  }

  .sidebar {
    position: fixed;
    width: 100%;
    z-index: 7;
    background-color: rgba(#000, 0.3);
    transition: background-color 0.4s ease;
    pointer-events: auto;

    .card {
      box-shadow: 0 5px 20px 5px 3px rgba(#000, 0.1);
      padding: 1.5em;
      max-width: 25em;
      margin: auto;
      margin-top: 6em;
      transition: transform 0.4s ease-out, box-shadow 0.4s ease-out,
        opacity 0.4s ease;
    }

    &.animation-enter,
    &.animation-leave-to {
      background-color: rgba(#000, 0);

      .card {
        transform: translateY(100%);
        box-shadow: none;
        opacity: 0;
      }
    }

    &.animation-leave-to {
      transition: background-color 0.3s ease;

      .card {
        transition: transform 0.3s ease-out, box-shadow 0.3s ease-out,
          opacity 0.3s ease;
      }
    }
  }
}
</style>
