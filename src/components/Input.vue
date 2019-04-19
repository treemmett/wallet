<template>
  <label class="wrapper" :class="{ 'has-value': hasValue }">
    <div class="main">
      <div class="label">{{ label }}</div>
      <input class="input" @blur="blur" />
    </div>
  </label>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class Input extends Vue {
  hasValue: boolean = false;

  @Prop(String)
  readonly label!: string;

  blur(e: Event) {
    this.hasValue = !!(e.target as HTMLInputElement).value;
  }
}
</script>

<style lang="scss" scoped>
@import '../global';

$fontSize: 16px;

.wrapper {
  display: block;
  padding-top: 10px;
}

.main {
  position: relative;
  border-radius: 4px;
  border: 1px solid #ccc;
  transition: border-color 0.2s $curve, box-shadow 0.2s $curve;
}

.label {
  position: absolute;
  bottom: 0.8em;
  left: calc(0.9em - 5px);
  font-size: 16px;
  font-size: $fontSize;
  color: #777;
  background-color: rgba(#fff, 0);
  padding: 0 5px;
  pointer-events: none;
  transition: 0.2s $curve;
  transition-property: background-color, color, transform;
  transform-origin: 0 0 0;
}

.input {
  font-size: $fontSize;
  border: 0;
  padding: 0.8em 0.9em;
  width: 100%;
  box-sizing: border-box;
  outline: none;
  font-family: $font-stack;
  border-radius: 4px;
}

.wrapper:focus-within {
  .main {
    box-shadow: 0 0 3px 0 $blue;
    border-color: $blue;
  }

  .label {
    transform: translateY(-100%) scale(0.8);
    color: darken($blue, 5%);
    background-color: #fff;
  }
}

.wrapper.has-value .label {
  transform: translateY(-100%) scale(0.8);
  background-color: #fff;
}
</style>
