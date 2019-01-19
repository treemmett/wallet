<template>
  <div class="layout">
    <div class="appbar" />

    <div class="sidebar">
      <div class="nav">
        <router-link :to="{ name: 'budget' }" exact>
          <span class="icon-wallet" /> Budget
        </router-link>
        <router-link :to="{ name: 'transactions' }">
          <span class="icon-receipt" /> Transactions
        </router-link>
        <router-link :to="{ name: 'income' }">
          <span class="icon-money-check" /> Income
        </router-link>
        <a href="#"><span class="icon-piggy-bank" />Goals</a>
        <a href="#"><span class="icon-account" />Tax</a>
        <a href="#"><span class="icon-analytics" />Reports</a>
      </div>

      <div class="nav account">
        <div class="title">Account</div>
        <a href="#"><span class="icon-settings" />Settings</a>
      </div>
    </div>

    <div class="view"><slot /></div>
  </div>
</template>

<style lang="scss" scoped>
@import '../colors';

.layout {
  display: grid;
  grid-template-columns: 14em 1fr;
  grid-template-rows: min-content 1fr;
  grid-template-areas: 'header header' 'nav view';
  height: 100%;
  max-height: 100%;
}

.appbar {
  grid-area: header;
  height: 3em;
  background-color: #fff;
  box-shadow: 0 1px 10px rgba(#000, 0.1);
  position: relative;
  z-index: 1;
}

.sidebar {
  grid-area: nav;
  display: flex;
  flex-direction: column;
}

.nav {
  padding: 1em 0;
  position: relative;
  z-index: 10;

  &.account {
    margin-top: auto;
  }

  a {
    position: relative;
    display: block;
    text-decoration: none;
    align-items: center;
    margin: 0 auto;
    text-decoration: none;
    color: #777;
    transition: color 0.15s ease;
    padding: 0.75em 0 0.75em 2em;
    margin-bottom: 0.25em;

    &::before {
      content: '';
      position: absolute;
      height: 100%;
      width: 0;
      top: 0;
      left: 0;
      background-color: $orange;
      transition: width 0.2s ease-in-out;
    }

    span[class*='icon'] {
      display: inline-block;
      text-align: center;
      width: 1.5em;
      margin-right: 0.5em;
    }

    &:hover,
    &.router-link-active {
      &::before {
        width: 5px;
      }
    }

    &:hover {
      color: #3a3a3a;
    }

    &.router-link-active {
      color: $orange;
    }
  }

  .title {
    text-align: center;
    font-size: 10px;
    text-transform: uppercase;
    color: #846a6a;
    letter-spacing: 0.75px;
  }
}

.view {
  position: relative;
  overflow-y: auto;
  max-height: 100%;
  grid-area: view;
}
</style>

<style lang="scss" scoped>
@import '../colors';

@media (max-width: $break) {
  .layout {
    grid-template-columns: 0 1fr;

    .sidebar {
      display: none;
    }
  }
}
</style>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Montserrat:400,500');
@import url('/static/fonts/icons.css');
@import '../colors';

html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  background-color: #f8f8f8;
  color: #333;
  font-family: 'Montserrat', Arial, Helvetica, sans-serif;
}

* {
  font-family: 'Montserrat', Arial, Helvetica, sans-serif;
  -webkit-overflow-scrolling: touch;
}

.input {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  font-size: 16px;
  padding: 0.25em 0.5em;
  box-sizing: border-box;
  -webkit-appearance: none;
  outline: none;
  transition: box-shadow 0.1s ease-in-out, border-color 0.1s ease-in-out;

  &:focus {
    $blue: #11aaff;
    box-shadow: 0 0 1px $blue;
    border-color: $blue;
  }

  option:disabled {
    display: none;
  }
}

.radio {
  display: flex;

  input[type='radio'] {
    position: fixed;
    opacity: 0;

    &:checked + .radio-selector {
      background-color: $orange;
      color: #fff;
      border-color: $orange;
      box-shadow: 0 1px 1px rgba($orange, 0.5);

      & + input + .radio-selector {
        border-left: none;
        padding-left: calc(0.5em + 1px);
      }
    }
  }

  .radio-selector {
    display: inline-block;
    white-space: pre-line;
    padding: 0.4em 0.5em;
    border: 1px solid #ccc;
    border-right: none;
    border-radius: 6px;
    transition: background-color 0.15s ease, border-color 0.15s ease,
      box-shadow 0.15s ease, color 0.15s ease;

    &:first-of-type {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }

    &:last-of-type {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      border-right: 1px solid #ccc;
    }

    &:hover {
      border-color: $orange;
      box-shadow: 0 1px 1px rgba($orange, 0.5);
    }
  }
}
</style>
