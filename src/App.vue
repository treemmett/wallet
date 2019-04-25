<template>
  <div id="app">
    <router-view />
    <Toaster />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Toaster from '@/components/Toaster.vue';

@Component({
  components: {
    Toaster
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
@import './global';

body {
  margin: 0;
  background-color: #f8f8f8;
  color: #333;
}

#app {
  font-family: $font-stack;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
