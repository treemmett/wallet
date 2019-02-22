<template>
  <div class="background">
    <div class="card">
      <div class="brand">
        <div class="logo">Rudget</div>
      </div>
      <form>
        <form-input label="Email" type="text" required />
        <form-input label="Password" type="password" required />
        <input type="submit" class="button" value="Login" />
      </form>
    </div>
  </div>
</template>

<script>
import FormInput from '../components/FormInput';

export default {
  name: 'Login',
  components: {
    FormInput
  }
};
</script>

<style lang="scss" scoped>
@import '../colors';

.background {
  height: 100%;
  padding: 5em;
  box-sizing: border-box;
}

.card {
  position: relative;
  background-color: #fff;
  width: 100%;
  max-width: 28em;
  padding: 1em;
  padding-bottom: 3em;
  margin: auto;
  box-shadow: 0 40px 40px 20px rgba(#000, 0.05);
  border-radius: 6px;
  box-sizing: border-box;
}

.brand {
  display: flex;
  justify-content: center;
  margin-bottom: 2em;
}

.logo {
  font-size: 32px;
  font-family: Quicksand;
  color: $orange;
  background: $orange-gradient;
  margin: 0 auto;
  display: inline-block;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

form {
  padding: 0 15%;

  input[type='submit'] {
    display: block;
    width: 100%;
    background-color: #fff;
    padding: 1em 0;
    border-radius: 6px;
    font-size: 14px;
    border: 2px solid $green;
    color: $green;
    transition: 0.15s ease-in-out;
    transition-property: background-color, border-color;
    cursor: pointer;
    font-weight: 600;

    &:hover,
    &:focus {
      background-color: $green;
      color: #fff;
      outline: none;
    }
  }
}
</style>
