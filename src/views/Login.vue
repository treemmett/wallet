<template>
  <div class="view">
    <div class="card">
      <div class="half">
        <div class="brand">
          <div class="logo">Rudget</div>
        </div>
      </div>
      <div class="half">
        <div class="form">
          <h2>Login</h2>
          <Input label="Email" />
          <Input label="Password" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Input from '@/components/Input.vue';

@Component({
  components: {
    Input
  }
})
export default class Login extends Vue {}
</script>

<style lang="scss" scoped>
.view {
  padding: 5em;
}

.card {
  display: flex;
  position: relative;
  background-color: #fff;
  width: 100%;
  box-sizing: border-box;
  border-radius: 5px;
  overflow: hidden;
}

.half {
  position: relative;
  width: 50%;
  box-sizing: border-box;
}

.brand {
  text-align: center;
  background-color: #297c45;
  padding: 2em 1em;
  height: 100%;

  .logo {
    color: #fff;
    font-size: 38px;
    font-weight: 500;
  }
}

.form {
  padding: 2em 3em;

  h2 {
    margin: 0;
  }
}
</style>
