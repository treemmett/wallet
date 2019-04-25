<template>
  <button class="btn" :class="{ outline, solid, [color]: color }" :type="type" @click="toast">
    <div class="label">{{ label }}</div>
  </button>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class Button extends Vue {
  @Prop({ default: 'button' })
  readonly type!: 'button' | 'submit' | 'reset';

  @Prop(Boolean)
  readonly outline!: boolean;

  @Prop(Boolean)
  readonly solid!: boolean;

  @Prop(String)
  readonly color!: 'blue' | 'green' | 'red';

  @Prop(String)
  readonly label!: string;

  toast() {
    this.$toast({ message: this.label, title: 'button' });
  }
}
</script>

<style lang="scss" scoped>
@import 'src/global';

@mixin color($color) {
  color: $color;

  &.outline {
    border-color: $color;
  }

  &:hover,
  &:focus {
    background-color: lighten($color, 40%);
  }

  &:active {
    background-color: lighten($color, 30%);
  }
}

@mixin solid($color) {
  background-color: $color;
  color: #fff;

  &:hover,
  &:focus {
    background-color: lighten($color, 10%);
    // box-shadow: 0 1px 1px rgba(lighten($color, 25%), 5%),
    //   0 1px 3px rgba(lighten($color, 20%), 5%);
  }

  &:active {
    background-color: lighten($color, 15%);
    // box-shadow: 0 4px 6px rgba(lighten($color, 25%), 5%),
    //   0 1px 3px rgba(lighten($color, 20%), 5%);
  }
}

.btn {
  display: inline-block;
  border: 1px solid transparent;
  outline: none;
  padding: 10px 16px;
  background-color: #fff;
  font-size: 14px;
  min-width: 5em;
  border-radius: 4px;
  text-transform: uppercase;
  cursor: pointer;
  transition: 0.2s $curve;
  transition-property: background-color, box-shadow;
  position: relative;
  user-select: none;
  min-width: 5em;
  font-weight: 600;
  box-sizing: content-box;

  &:hover,
  &:focus {
    background-color: darken(#fff, 5%);
  }

  &:active {
    background-color: darken(#fff, 10%);
  }

  &.outline {
    border-color: #ccc;
  }

  &.blue {
    @include color($blue);
  }
  &.green {
    @include color($green);
  }
  &.red {
    @include color($red);
  }

  &.solid {
    &.blue {
      @include solid($blue);
    }
    &.green {
      @include solid($green);
    }
    &.red {
      @include solid($red);
    }
  }
}
</style>
