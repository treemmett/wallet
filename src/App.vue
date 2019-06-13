<template>
  <div id="app">
    <div class="main">
      <router-view />
    </div>
    <Toaster />
    <nav v-if="loggedIn">
      <router-link class="link" :to="{ name: 'budget' }"><Wallet /></router-link>
      <router-link class="link" :to="{ name: 'accounts' }"><Bank /></router-link>
      <button class="fab" type="button"><Plus /></button>
      <router-link class="link" :to="{ name: 'transactions' }"><CheckBook /></router-link>
      <button class="link" type="button"><Hamburger /></button>
    </nav>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State } from 'vuex-class';
import Bank from '@/components/icons/Bank.vue';
import CheckBook from '@/components/icons/CheckBook.vue';
import Hamburger from '@/components/icons/Hamburger.vue';
import Plus from '@/components/icons/Plus.vue';
import Toaster from '@/components/Toaster.vue';
import Wallet from '@/components/icons/Wallet.vue';

@Component({
  components: {
    Bank,
    CheckBook,
    Hamburger,
    Plus,
    Toaster,
    Wallet
  }
})
export default class App extends Vue {
  @State(s => s.session.loggedIn)
  readonly loggedIn: boolean;
}
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
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 4em;
  grid-template-areas: 'main' 'nav';
}
</style>

<style lang="scss" scoped>
@import './global';

.main {
  grid-area: main;
}

nav {
  display: flex;
  position: fixed;
  grid-area: nav;
  background-color: #fff;
  box-shadow: $shadow;
  height: 4em;
  width: 100vw;
  bottom: 0;
  left: 0;
}

.link {
  flex: 1;
  display: flex;
  color: #ccc;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  padding: 0;
  border: none;
  appearance: none;
  cursor: pointer;
  transition: color 0.2s $curve;

  &.router-link-exact-active {
    color: $orange;
  }

  svg {
    justify-content: center;
    align-items: center;
  }
}

.fab {
  width: 4em;
  height: 4em;
  border-radius: 100%;
  padding: 1em;
  box-sizing: border-box;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  border: none;
  font-size: 16px;
  outline: none;
  background: linear-gradient(to bottom left, #ff4747, #ff8b4c);
  color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateY(-30%);
  cursor: pointer;

  &:hover,
  &:focus {
    transform: translateY(-35%);
  }

  &:active {
    transform: translateY(-25%);
  }

  svg {
    height: 100%;
    width: 100%;
  }
}
</style>
