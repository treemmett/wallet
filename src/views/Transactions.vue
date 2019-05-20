<template>
  <div class="transactions">
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
</template>

<style lang="scss" scoped>
@import '../global';

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
  padding: 0 2em;
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
</style>
