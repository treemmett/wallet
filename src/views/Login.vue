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
          <form v-if="$route.name === 'login'" key="login" class="form left">
            <h2>Login</h2>
            <Input v-model="email" label="Email" />
            <Input label="Password" />
            <div class="button-group">
              <Button
                label="Register"
                color="green"
                @click.native="$router.push({ name: 'registration' })"
              />
              <Button label="Login" solid color="blue" />
            </div>
          </form>
          <form
            v-else-if="$route.name === 'registration'"
            key="registration"
            class="form right"
            @submit.prevent="register"
          >
            <h2>Registration</h2>
            <div class="split">
              <Input label="First Name" name="firstName" />
              <Input label="Last Name" name="lastName" />
            </div>
            <Input v-model="email" label="Email" name="email" />
            <Input v-model="password" label="Password" type="password" name="password" />
            <Input label="Confirm Password" type="password" name="confirmPassword" />
            <div class="button-group">
              <Button label="Login" color="green" @click.native="$router.push({ name: 'login' })" />
              <Button label="Create Account" solid color="blue" type="submit" />
            </div>
          </form>
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
export default class Login extends Vue {
  private email: string = '';

  private password: string = '';

  register(e: Event) {
    const form = e.target as HTMLFormElement;
    const { elements } = form as any;

    // get form values
    const values = {
      email: elements.email.value,
      password: elements.password.value,
      firstName: elements.firstName.value,
      lastName: elements.lastName.value
    };

    // check if passwords match
    if (values.password !== elements.confirmPassword.value) {
      this.$toast('Password do not match');
      return;
    }

    this.$api({
      method: 'POST',
      url: '/user',
      data: {
        email: values.email,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName
      }
    })
      .then(() => {
        this.$toast('Account has been created.');
      })
      .catch(err => {
        this.$toast({ message: err.response.data.message || 'Something went wrong', error: true });
      });
  }
}
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
