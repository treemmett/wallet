import Vue from 'vue';

declare module 'vue/types/vue' {
  interface Vue {
    $toast(params: string | Rudget.ToastOptions): void;
  }
}
