<template>
  <div>
    <nav>
      <router-link :to="{ name: 'budget' }"><span class="icon-wallet"/>Budget</router-link>
      <router-link :to="{ name: 'transactions' }"><span class="icon-receipt"/>Transactions</router-link>
      <a href="#"><span class="icon-money-check"/>Income</a>
      <a href="#"><span class="icon-piggy-bank"/>Goals</a>
      <a href="#"><span class="icon-account"/>Tax</a>
      <a href="#"><span class="icon-analytics"/>Reports</a>
      <a href="#"><span class="icon-settings"/>Settings</a>
    </nav>

    <div class="view">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard'
}
</script>

<style lang="scss" scoped>
  @import '../colors';

  nav{
    position: relative;
    background-color: #fff;
    box-shadow: 0 5px 20px rgba(#000, 0.1);
    display: flex;
    box-sizing: border-box;
    height: 80px;
    z-index: 10;
    overflow-x: auto;
  }

  a{
    display: flex;
    align-items: center;
    text-decoration: none;
    color: inherit;
    color: #acacac;
    font-size: 17px;
    padding: 1em 1em;
    margin: auto;

    span{
      margin-right: 1em;
    }

    &:hover{
      color: #777;
    }

    &.router-link-exact-active{
      color: $orange;
    }
  }

  .view{
    position: relative;
    height: calc(100vh - 80px);
    overflow: auto;
    box-sizing: border-box;
  }
</style>


<style>
  @import url('https://fonts.googleapis.com/css?family=Montserrat:400,500');
  @import url('/static/fonts/icons.css');

  body{
    background-color: #f8f8f8;
    margin: 0;
    font-family: 'Montserrat', sans-serif;
    color: #333;
  }

  *{
    font-family: 'Montserrat', sans-serif;
  }
</style>

