<template>
  <div class="fab-wrapper" v-on="$listeners">
    <div class="fab">
      <slot />
    </div>

    <transition :duration="300">
      <div v-if="$slots.menu" class="menu-wrapper" @click.stop>
        <div class="menu">
          <slot name="menu" />
        </div>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
@import '../colors';

.fab-wrapper {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  z-index: 6;
}

.fab,
.menu {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
}

.fab {
  background: $orange-gradient;
  width: 2em;
  height: 2em;
  color: #fff;
  cursor: pointer;
  border-radius: 100vh;
  transition: box-shadow 0.15s ease-in-out;
  box-shadow: 0 1px 5px rgba(#000, 0.3);

  &:hover {
    box-shadow: 0 5px 20px rgba(#000, 0.3);
  }
}

.menu-wrapper {
  position: absolute;
  right: calc(100% - 1.5em);
  z-index: -1;
  top: 50%;
  transform: translateY(-50%);
  padding: 1em;
  padding-right: 0;
  overflow: hidden;
  pointer-events: none;

  &.v-enter-active,
  &.v-leave-active {
    /deep/ .menu {
      transition: transform 0.3s ease-in-out;
    }
  }

  &.v-enter,
  &.v-leave-to {
    /deep/ .menu {
      transform: translateX(100%);
    }
  }

  /deep/ .menu {
    padding: 0.25em;
    padding-right: 1em;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 3px 10px 2px rgba(0, 0, 0, 0.1);
    pointer-events: auto;

    .icon {
      display: flex;
      align-items: center;
      padding: 5px;
      margin-right: 0.25em;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.2s ease-in-out;

      &:last-child {
        margin: 0;
      }

      &:hover {
        background-color: darken(#fff, 8%);
      }

      svg {
        color: #767676;
        height: 20px;
        width: 20px;
      }
    }
  }
}
</style>
