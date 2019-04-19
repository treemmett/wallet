<template>
  <div class="view">
    <div class="card">
      <div class="half">
        <transition>
          <div v-if="$route.name === 'login'" key="login" class="brand left">
            <div class="logo">Rudget</div>
          </div>
          <div v-else key="registration" class="brand right">
            <div class="logo">TOS</div>
          </div>
        </transition>
      </div>
      <div class="half">
        <transition>
          <div v-if="$route.name === 'login'" key="login" class="form left">
            <h2>Login</h2>
            <Input label="Email" />
            <Input label="Password" />
            <div class="button-group">
              <Button
                label="Register"
                color="green"
                @click.native="$router.push({ name: 'registration' })"
              />
              <Button label="Login" solid color="blue" />
            </div>
          </div>
          <div v-else-if="$route.name === 'registration'" key="registration" class="form right">
            <h2>Registration</h2>
            <div class="split">
              <Input label="First Name" />
              <Input label="Last Name" />
            </div>
            <Input label="Email" />
            <Input label="Password" />
            <Input label="Confirm Password" />
            <div class="button-group">
              <Button label="Login" color="green" @click.native="$router.push({ name: 'login' })" />
              <Button label="Create Account" solid color="blue" />
            </div>
          </div>
        </transition>
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
  height: 25em;
}

.half {
  position: relative;
  width: 50%;
  box-sizing: border-box;
  overflow: hidden;
}

.left,
.right {
  position: absolute;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  transition: transform 0.5s $curve;

  &.left {
    &.v-enter,
    &.v-leave-to {
      transform: translate(-100%);
    }
  }

  &.right {
    &.v-enter,
    &.v-leave-to {
      transform: translate(100%);
    }
  }
}

.brand {
  text-align: center;
  background-color: $brand-green;
  padding: 2em 1em;

  .logo {
    color: #fff;
    font-size: 38px;
    font-weight: 500;
  }
}

.form {
  padding: 2em 3em;
  display: flex;
  flex-direction: column;

  h2 {
    margin: 0;
  }

  .split {
    display: inline-flex;
    justify-content: space-between;

    > * {
      width: calc(50% - 0.5em);
    }
  }

  .button-group {
    display: flex;
    justify-content: space-between;
    margin-top: auto;
    padding-top: 1em;

    > *:only-child,
    > *:not(:first-child) {
      margin-left: auto;
    }
  }
}
</style>
