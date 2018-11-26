<template>
  <div class="layout">
    <header>
      <nav>
        <router-link :to="{ name: 'budget' }" exact><span class="icon-wallet"/>Budget</router-link>
        <router-link :to="{ name: 'transactions' }"><span class="icon-receipt"/>Transactions</router-link>
        <a href="#"><span class="icon-money-check"/>Income</a>
        <a href="#"><span class="icon-piggy-bank"/>Goals</a>
        <a href="#"><span class="icon-account"/>Tax</a>
        <a href="#"><span class="icon-analytics"/>Reports</a>
        <a href="#"><span class="icon-settings"/>Settings</a>
      </nav>
    </header>

    <div class="view">
      <slot/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import '../colors';

  .layout{
    display: grid;
    grid-template-rows: auto 1fr auto;
    grid-template-columns: 100%;
    height: 100%;
    max-height: 100%;
  }

  header{
    position: relative;
    background-color: #fff;
    box-shadow: 0 5px 20px rgba(#000, 0.1);
    height: 5em;
    z-index: 1;
    overflow-x: auto;

    nav{
      height: 100%;
      display: flex;

      a{
        display: flex;
        align-items: center;
        margin: 0 auto;
        padding: 0 1.5em;
        text-decoration: none;
        color: #777;
        transition: color 0.15s ease;

        &:hover{
          color: #3a3a3a;
        }

        &.router-link-active{
          color: $orange;
        }

        [class^="icon-"]{
          margin-right: 0.5em;
          color: inherit;
        }
      }
    }
  }

  .view{
    position: relative;
    overflow-y: auto;
    max-height: 100%;
  }
</style>

<style>
  @import url('https://fonts.googleapis.com/css?family=Montserrat:400,500');
  @import url('/static/fonts/icons.css');
  
  html, body{
    width: 100%;
    height: 100%;
    margin: 0;
    background-color: #f8f8f8;
    color: #333;
    font-family: 'Montserrat', Arial, Helvetica, sans-serif;
  }

  *{
    color: #333;
    font-family: 'Montserrat', Arial, Helvetica, sans-serif;
    -webkit-overflow-scrolling: touch;
  }
</style>
