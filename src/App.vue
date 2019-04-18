<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
@import './global';

body {
  margin: 0;
  background-color: #f8f8f8;
}

#app {
  font-family: $font-stack;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
