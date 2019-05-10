<template>
  <div class="budget">
    <div class="group">
      <div class="head-wrapper">
        <div class="head">
          <div class="name">Housing</div>
          <chevron-down />
        </div>
      </div>
      <div class="category-list">
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
    </div>

    <div class="group">
      <div class="head-wrapper">
        <div class="head">
          <div class="name">Transportation</div>
          <chevron-down />
        </div>
      </div>
      <div class="category-list">
        <div class="category">
          <div class="name">Auto Loan</div>
          <input />
          <div class="used">$100.00</div>
        </div>
        <div class="category">
          <div class="name">Fuel</div>
          <input />
          <div class="used">$58.34</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ChevronDown from '@/components/icons/ChevronDown.vue';

@Component({
  components: {
    ChevronDown
  }
})
export default class Budget extends Vue {}
</script>

<style lang="scss" scoped>
@import '../global';

.budget {
  padding: 2em;
}

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
