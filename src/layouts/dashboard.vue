<template>
  <nav>
    <a href="#">Budget</a>
    <a href="#">Transactions</a>
    <a href="#">Income</a>
    <a href="#">Goals</a>
    <a href="#">Tax</a>
    <a href="#">Reports</a>
    <a href="#">Settings</a>
  </nav>
</template>

<script>
export default {
  name: 'Dashboard'
}
</script>

<style scoped>
  nav{
    background-color: #fff;
    box-shadow: 0 5px 20px 0 rgba(#000, 0.15);
    padding: 1.5em 0;
    display: flex;
    justify-content: space-around;
  }

  a{
    text-decoration: none;
    color: inherit;
    color: #acacac;
  }
</style>


<style>
  @import url('https://fonts.googleapis.com/css?family=Montserrat|Raleway');

  body{
    background-color: #f8f8f8;
    margin: 0;
    font-family: 'Montserrat', sans-serif;
    color: #333;
  }
</style>

