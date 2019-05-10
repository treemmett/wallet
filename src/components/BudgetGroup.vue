<template>
  <div class="group">
    <div class="head-wrapper">
      <div class="head" :class="{ collapsed }">
        <div class="name">{{ groupName }}</div>
        <chevron-down @click.native="collapsed = !collapsed" />
      </div>
    </div>
    <transition @before-leave="beforeLeave" @leave="leave" @enter="enter" @after-enter="afterEnter">
      <div v-if="!collapsed" class="category-list">
        <div class="category">
          <div class="name">Rent</div>
          <input />
          <div class="used">$1000.00</div>
        </div>
        <div class="category">
          <div class="name">Insurance</div>
          <input />
          <div class="used">$74.32</div>
        </div>
        <div class="category">
          <div class="name">Utilities</div>
          <input />
          <div class="used">$103.43</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ChevronDown from './icons/ChevronDown.vue';

@Component({ components: { ChevronDown } })
export default class BudgetGroup extends Vue {
  private collapsed: boolean = false;

  @Prop(String)
  readonly groupName!: string;

  enter(el: HTMLElement) {
    // check if we're in the middle of an exit transition
    console.log(el.style);

    // store computed height of element
    const { height } = el.getBoundingClientRect();

    // force height to zero
    el.style.height = '0px';

    // force repaint
    // eslint-disable-next-line no-unused-expressions
    getComputedStyle(el).height;

    // set height to computed height
    el.style.height = `${height}px`;
  }

  afterEnter(el: HTMLElement) {
    el.style.removeProperty('height');
  }

  beforeLeave(el: HTMLElement) {
    // get height of group
    const { height } = el.getBoundingClientRect();

    el.style.height = `${height}px`;

    // force repaint
    // eslint-disable-next-line no-unused-expressions
    getComputedStyle(el).height;
  }

  leave(el: HTMLElement) {
    el.style.height = '0px';
  }
}
</script>

<style lang="scss" scoped>
@import '../global';

.group {
  @include card;
  margin-bottom: 1em;
}

.head-wrapper {
  padding: 0 1.5em;
}

.head {
  display: flex;
  align-items: center;
  padding: 1em 0;
  border-bottom: 1px solid #ccc;
  transition: border-bottom-color 0.2s $curve;

  &.collapsed {
    border-bottom-color: transparent;
  }

  .name {
    font-size: 22px;
  }

  svg {
    height: 32px;
    width: 32px;
    cursor: pointer;
    color: #888;
  }
}

.category-list {
  transition: height 0.65s $curve;
  overflow: hidden;
}

.category {
  display: flex;
  align-items: center;
  padding: 0.75em 2em;

  &:hover input {
    border-color: #ccc;
  }

  input {
    font-family: $font-stack;
    outline: none;
    padding: 5px;
    border-radius: 4px;
    border: 0;
    font-size: 16px;
    width: 4em;
    margin-right: 1em;
    border: 1px solid transparent;
    transition: 0.2s $curve;
    transition-property: box-shadow, border-color;

    &:focus,
    &:active {
      box-shadow: 0 0 3px 0 $blue;
      border-color: $blue;
    }
  }

  .used {
    width: 4em;
    text-align: right;
  }
}

.name {
  margin-right: auto;
  font-size: 20px;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
