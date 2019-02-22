<template>
  <div class="layout">
    <div class="appbar" />

    <div class="navigation">
      <div class="nav">
        <router-link :to="{ name: 'budget' }" exact>
          <span class="icon"><icon-wallet /></span>
          <span class="label">Budget</span>
        </router-link>
        <router-link :to="{ name: 'transactions' }">
          <span class="icon"><icon-receipt /></span>
          <span class="label">Transactions</span>
        </router-link>
        <router-link :to="{ name: 'income' }">
          <span class="icon"><icon-money-check /></span>
          <span class="label">Income</span>
        </router-link>
        <a href="#">
          <span class="icon"><icon-piggy-bank /></span>
          <span class="label">Goals</span>
        </a>
        <a href="#">
          <span class="icon"><icon-bank /></span>
          <span class="label">Tax</span>
        </a>
        <a href="#">
          <span class="icon"><icon-analytics /></span>
          <span class="label">Reports</span>
        </a>
      </div>

      <div class="nav account">
        <div class="title">Account</div>
        <a href="#">
          <span class="icon"><icon-settings /></span>
          <span class="label">Settings</span>
        </a>
      </div>
    </div>

    <div class="view">
      <slot />
    </div>

    <alert />
  </div>
</template>

<script>
import Alert from '../components/Alert';
import IconAnalytics from '../components/icons/IconAnalytics';
import IconBank from '../components/icons/IconBank';
import IconMoneyCheck from '../components/icons/IconMoneyCheck';
import IconPiggyBank from '../components/icons/IconPiggyBank';
import IconReceipt from '../components/icons/IconReceipt';
import IconSettings from '../components/icons/IconSettings';
import IconWallet from '../components/icons/IconWallet';

export default {
  name: 'Dashboard',
  components: {
    Alert,
    IconAnalytics,
    IconBank,
    IconMoneyCheck,
    IconPiggyBank,
    IconReceipt,
    IconSettings,
    IconWallet
  }
};
</script>

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
  z-index: 5;
}

.navigation {
  grid-area: nav;
  display: flex;
  flex-direction: column;
  overflow: auto;
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
    display: flex;
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

    .icon {
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
    grid-template-rows: min-content 1fr min-content;
    grid-template-columns: 1fr;
    grid-template-areas: 'header' 'view' 'nav';
    overflow: hidden;
  }

  .navigation {
    display: block;
    overflow: visible;

    .nav {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      padding: 0;
      background-color: #fff;
      box-shadow: 0 -1px 10px rgba(0, 0, 0, 0.1);
      z-index: 1;
      position: relative;
      font-size: 20px;
      height: 3.25em;

      a {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0;
        margin: 0;
        text-align: center;
        flex-grow: 1;
        height: 100%;
        -webkit-tap-highlight-color: transparent;

        .label {
          display: none;
        }

        .icon {
          margin: 0;
        }

        &::before {
          all: unset;
        }

        &.router-link-active {
          &::before {
            content: '';
            position: absolute;
            height: 4px;
            width: 4px;
            top: unset;
            bottom: 0.5em;
            left: 50%;
            transform: translateX(-50%);
            border-radius: 100vh;
            background-color: $orange;
          }
        }

        &:nth-child(n + 5) {
          display: none;
        }
      }
    }

    .account {
      display: none;
    }
  }
}
</style>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Montserrat:400,500|Quicksand');
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
