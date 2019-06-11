<template>
  <div class="transactions">
    <div v-if="modalOpen" class="modal" @click.self="modalOpen = false">
      <div class="card">
        <div class="head">
          <div class="title">New Transaction</div>
          <button class="close" type="button" aria-label="close" @click="modalOpen = false">
            <X />
          </button>
        </div>
        <div class="body">
          <form>
            <label class="field">
              <div class="label">Description</div>
              <input />
            </label>
            <label class="field">
              <div class="label">Category</div>
              <input />
            </label>
            <label class="field">
              <div class="label">Date</div>
              <input type="date" />
            </label>
            <label class="field">
              <div class="label">Amount</div>
              <input type="number" min="0" step="0.01" value="0.00" />
            </label>
          </form>
        </div>
        <div class="foot">
          <btn color="blue" outline label="Save & New" />
          <btn color="green" solid label="Save" />
        </div>
      </div>
    </div>
    <div class="infinite">
      <div class="date-group">
        <div class="date">Jan 1, 2018</div>
        <div class="list">
          <div class="transaction">
            <div class="description">McDonalds</div>
            <div class="amount">$13,000.00</div>
            <div class="category">Groceries</div>
          </div>
          <div class="transaction">
            <div class="description">Store 2</div>
            <div class="amount">$1.34</div>
            <div class="category">Entertainment</div>
          </div>
          <div class="transaction">
            <div class="description">Store 1</div>
            <div class="amount">$100.00</div>
            <div class="category">Groceries</div>
          </div>
          <div class="transaction">
            <div class="description">Store 2</div>
            <div class="amount">$50.00</div>
            <div class="category">Entertainment</div>
          </div>
          <div class="transaction">
            <div class="description">Store 1</div>
            <div class="amount">$100.00</div>
            <div class="category">Groceries</div>
          </div>
          <div class="transaction">
            <div class="description">Store 2</div>
            <div class="amount">$50.00</div>
            <div class="category">Entertainment</div>
          </div>
          <div class="transaction">
            <div class="description">Store 1</div>
            <div class="amount">$100.00</div>
            <div class="category">Groceries</div>
          </div>
          <div class="transaction">
            <div class="description">Store 2</div>
            <div class="amount">$50.00</div>
            <div class="category">Entertainment</div>
          </div>
          <div class="transaction">
            <div class="description">Store 1</div>
            <div class="amount">$100.00</div>
            <div class="category">Groceries</div>
          </div>
          <div class="transaction">
            <div class="description">Store 2</div>
            <div class="amount">$50.00</div>
            <div class="category">Entertainment</div>
          </div>
        </div>
      </div>
      <div class="date-group">
        <div class="date">Feb 1, 2018</div>
        <div class="list">
          <div class="transaction">
            <div class="description">Store 1</div>
            <div class="amount">$100.00</div>
            <div class="category">Groceries</div>
          </div>
          <div class="transaction">
            <div class="description">Store 2</div>
            <div class="amount">$50.00</div>
            <div class="category">Entertainment</div>
          </div>
          <div class="transaction">
            <div class="description">Store 1</div>
            <div class="amount">$100.00</div>
            <div class="category">Groceries</div>
          </div>
          <div class="transaction">
            <div class="description">Store 2</div>
            <div class="amount">$50.00</div>
            <div class="category">Entertainment</div>
          </div>
          <div class="transaction">
            <div class="description">Store 1</div>
            <div class="amount">$100.00</div>
            <div class="category">Groceries</div>
          </div>
          <div class="transaction">
            <div class="description">Store 2</div>
            <div class="amount">$50.00</div>
            <div class="category">Entertainment</div>
          </div>
          <div class="transaction">
            <div class="description">Store 1</div>
            <div class="amount">$100.00</div>
            <div class="category">Groceries</div>
          </div>
          <div class="transaction">
            <div class="description">Store 2</div>
            <div class="amount">$50.00</div>
            <div class="category">Entertainment</div>
          </div>
          <div class="transaction">
            <div class="description">Store 1</div>
            <div class="amount">$100.00</div>
            <div class="category">Groceries</div>
          </div>
          <div class="transaction">
            <div class="description">Store 2</div>
            <div class="amount">$50.00</div>
            <div class="category">Entertainment</div>
          </div>
          <div class="transaction">
            <div class="description">Store 1</div>
            <div class="amount">$100.00</div>
            <div class="category">Groceries</div>
          </div>
          <div class="transaction">
            <div class="description">Store 2</div>
            <div class="amount">$50.00</div>
            <div class="category">Entertainment</div>
          </div>
          <div class="transaction">
            <div class="description">Store 1</div>
            <div class="amount">$100.00</div>
            <div class="category">Groceries</div>
          </div>
          <div class="transaction">
            <div class="description">Store 2</div>
            <div class="amount">$50.00</div>
            <div class="category">Entertainment</div>
          </div>
          <div class="transaction">
            <div class="description">Store 1</div>
            <div class="amount">$100.00</div>
            <div class="category">Groceries</div>
          </div>
          <div class="transaction">
            <div class="description">Store 2</div>
            <div class="amount">$50.00</div>
            <div class="category">Entertainment</div>
          </div>
          <div class="transaction">
            <div class="description">Store 1</div>
            <div class="amount">$100.00</div>
            <div class="category">Groceries</div>
          </div>
          <div class="transaction">
            <div class="description">Store 2</div>
            <div class="amount">$50.00</div>
            <div class="category">Entertainment</div>
          </div>
        </div>
      </div>
    </div>
    <button type="button" class="fab" @click="modalOpen = !modalOpen"><Plus /></button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Btn from '@/components/Button.vue';
import Plus from '@/components/icons/Plus.vue';
import X from '@/components/icons/X.vue';

@Component({
  components: {
    Btn,
    Plus,
    X
  }
})
export default class Transactions extends Vue {
  modalOpen: boolean = false;
}
</script>

<style lang="scss" scoped>
@import '../global';

.modal {
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  overflow: hidden;
  width: 100vw;
  background-color: rgba(#000, 0.2);
  z-index: 1;
  padding: 3em 1em;
  box-sizing: border-box;

  .card {
    @include card;
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 30em;
    max-height: 100%;
    margin: auto;

    .head,
    .body,
    .foot {
      padding: 1em;
      box-sizing: border-box;
    }

    .head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #ccc;

      .title {
        font-weight: 500;
        font-size: 20px;
      }

      .close {
        position: relative;
        height: 30px;
        width: 30px;
        color: #888;
        padding: 3px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(#000, 0);
        transition: background-color 0.2s $curve;
        cursor: pointer;
        border: none;
        outline: none;

        &:hover,
        &:focus {
          background-color: rgba(#000, 0.1);
        }

        svg {
          height: 100%;
          width: 100%;
        }
      }
    }

    .body {
      overflow: auto;

      .field {
        display: block;

        & + .field {
          margin-top: 1em;
        }
      }

      .label {
        display: inline;
        text-transform: uppercase;
        font-size: 14px;
        font-weight: 500;
        color: #666;
      }

      input {
        display: block;
        font-size: 16px;
        border-radius: 4px;
        border: 1px solid #ccc;
        outline: none;
        transition: 0.2s $curve;
        transition-property: background-color, color, transform;
        padding: 10px;
        margin: 0;
        width: 100%;
        box-sizing: border-box;
        font-family: $font-stack;

        &:focus {
          box-shadow: 0 0 3px 0 $blue;
          border-color: $blue;
        }
      }
    }

    .foot {
      text-align: right;
      border-top: 1px solid #ccc;

      > *:not(:last-child) {
        margin-right: 1em;
      }
    }
  }
}

.transactions {
  padding: 2em;
}

.date-group {
  display: flex;
  position: relative;
  margin-bottom: 1em;

  &:last-child {
    margin-bottom: 0;
  }
}

.date {
  position: sticky;
  top: 2em;
  flex: 0 0 6.5em;
  align-self: flex-start;
  text-align: right;
  margin-right: 1em;
  color: $gray-text;
}

.list {
  flex-grow: 1;
}

.transaction {
  @include card;
  padding: 0 1.25em;
  margin-bottom: 1em;
  display: grid;
  grid-template-columns: 1fr min-content;
  grid-template-rows: 1.5fr 1fr;
  grid-template-areas: 'main amount' 'sub amount';
  height: 4em;

  &:last-child {
    margin-bottom: 0;
  }

  .description {
    display: flex;
    align-items: flex-end;
    grid-area: main;
    font-size: 18px;
    font-weight: 600;
    padding: 3px 0;
  }

  .category {
    grid-area: sub;
    font-size: 14px;
    color: $gray-text;
  }

  .amount {
    display: flex;
    align-items: center;
    grid-area: amount;
    justify-content: flex-end;
    color: $red-text;
    font-size: 18px;
    font-weight: 600;
  }
}

.fab {
  appearance: none;
  position: fixed;
  bottom: 1.5em;
  right: 1.5em;
  width: 4em;
  height: 4em;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  font-size: 16px;
  outline: none;
  background: $red-gradient;
  color: #fff;
  box-shadow: 0 2px 4px rgba(#000, 0.5);
  transition: 0.2s $curve;
  cursor: pointer;

  &:hover,
  &:focus {
    transform: translateY(-1px);
    box-shadow: 0 2px 5px rgba(#000, 0.5);
  }

  &:active {
    transform: translateY(-1px);
    box-shadow: 0 1px 5px rgba(#000, 0.5);
  }

  svg {
    width: 50%;
  }
}
</style>
