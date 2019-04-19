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
          <div class="button-group">
            <Button label="Register" color="green" />
            <Button label="Login" solid color="blue" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Input from '@/components/Input.vue';
import Button from '@/components/Button.vue';

@Component({
  components: {
    Button,
    Input
  }
})
export default class Login extends Vue {}
</script>

<style lang="scss" scoped>
@import 'src/global';

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
  background-color: $brand-green;
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

  .button-group {
    display: flex;
    justify-content: space-between;
    margin-top: 1em;

    > *:only-child,
    > *:not(:first-child) {
      margin-left: auto;
    }
  }
}
</style>
