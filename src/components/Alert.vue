<template>
  <transition-group class="alert-wrapper">
    <div
      v-for="a in alerts"
      :key="a.id"
      class="card"
      :class="{ error: a.error }"
    >
      <div class="close" @click="dismissAlert(a.id)">
        <icon-close />
      </div>
      <h5 v-if="a.title">{{ a.title }}</h5>
      <span>{{ a.msg }}</span>
    </div>
  </transition-group>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import IconClose from './icons/IconClose';

export default {
  components: {
    IconClose
  },
  computed: mapState({
    alerts: 'alerts'
  }),
  methods: mapActions(['dismissAlert'])
};
</script>

<style lang="scss" scoped>
@import '../colors';

.alert-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1000;
  overflow: auto;
  max-height: 100%;
}

.card {
  position: relative;
  padding: 1em;
  background-color: #fff;
  box-shadow: 0 5px 20px rgba(#000, 0.1), 0 10px 40px rgba(#000, 0.1);
  margin: 1.5em;
  border-radius: 6px;
  overflow: hidden;
  pointer-events: auto;
  width: 12.5em;
  max-width: 100vw;

  &::before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: $blue-gradient;
  }

  &:hover {
    .close {
      opacity: 1;
    }
  }

  &.error {
    &::before {
      background: $orange-gradient;
    }
  }

  h5 {
    margin: 0;
    margin-bottom: 1em;
  }
}

.close {
  position: absolute;
  opacity: 0;
  top: 0.75em;
  right: 0.75em;
  padding: 0.25em;
  transition: 0.15s ease-in-out;
  transition-property: opacity background-color;
  z-index: 1;
  border-radius: 50%;
  color: #aaa;
  background: radial-gradient(#fff 25%, rgba(#fff, 0));
  cursor: pointer;

  &:hover {
    color: #777;
    background-color: darken(#fff, 8%);
  }
}
</style>
