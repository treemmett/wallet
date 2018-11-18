<template>
  <div>
    <nav>
      <a href="#" class="active"><span class="icon-wallet"/>Budget</a>
      <a href="#"><span class="icon-receipt"/>Transactions</a>
      <a href="#"><span class="icon-money-check"/>Income</a>
      <a href="#"><span class="icon-piggy-bank"/>Goals</a>
      <a href="#"><span class="icon-account"/>Tax</a>
      <a href="#"><span class="icon-analytics"/>Reports</a>
      <a href="#"><span class="icon-settings"/>Settings</a>
    </nav>

    <div class="page">
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
  nav{
    background-color: #fff;
    box-shadow: 0 5px 20px rgba(#000, 0.1);
    display: flex;
    justify-content: space-around;
    box-sizing: border-box;
    height: 80px;
  }

  a{
    display: flex;
    align-items: center;
    text-decoration: none;
    color: inherit;
    color: #acacac;
    font-size: 17px;
    padding: 1em 1em;

    span{
      margin-right: 1em;
    }

    &.active{
      color: #ed6a5e
    }

    &:hover{
      color: #777;
    }
  }

  .page{
    height: calc(100vh - 80px);
    overflow: auto;
    padding: 2em;
    box-sizing: border-box;
  }
</style>


<style>
  @import url('https://fonts.googleapis.com/css?family=Montserrat|Raleway');
  @import url('/static/fonts/icons.css');

  body{
    background-color: #f8f8f8;
    margin: 0;
    font-family: 'Montserrat', sans-serif;
    color: #333;
  }
</style>

