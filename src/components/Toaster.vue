<template>
  <div class="toaster">
    <div v-for="toast in toasts" :key="toast.id" class="toast">
      <div v-if="toast.title" class="title">{{ toast.title }}</div>
      <div class="message">{{ toast.message }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import toastEvents from '../utils/toastEvents';

interface Toast extends Rudget.ToastOptions {
  id: number;
}

@Component({})
export default class Toaster extends Vue {
  toasts: Toast[] = [];

  pop(params: string | Rudget.ToastOptions) {
    const opt: Toast =
      typeof params === 'string'
        ? { message: params, id: Math.floor(Math.random() * 1000) }
        : { ...params, id: Math.floor(Math.random() * 1000) };

    this.toasts.push(opt);
  }

  mounted() {
    Vue.prototype.$blahblah = 'hi';
    toastEvents.$on('add', this.pop);
  }
}
</script>

<style lang="scss" scoped>
@import '../global';

.toaster {
  position: fixed;
  display: flex;
  flex-direction: column;
  top: 0;
  right: 0;
  pointer-events: none;
}

.toast {
  align-self: flex-end;
  position: relative;
  padding: 1em;
  background-color: #fff;
  box-shadow: $shadow;
  margin: 1em 1em 0 0;
  border-radius: 4px;
  overflow: hidden;
  pointer-events: auto;
  max-width: 10em;

  &::before {
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: $blue-gradient;
  }

  &.error {
    &::before {
      background: $red-gradient;
    }
  }
}

.title {
  font-weight: 600;
}
</style>
