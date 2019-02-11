<template>
  <dashboard>
    <draggable
      class="budget"
      :options="{ animation: 100, ghostClass: 'ghost' }"
      @sort="sort"
    >
      <budget-group
        v-for="group in budget.groups"
        :key="group.id"
        :group="group"
      />
    </draggable>

    <div class="sidebar">
      <div class="card">
        <div class="date">
          <span
            class="icon"
            @click="$store.commit('changeDate', { direction: -1 })"
          >
            <icon-angle-left />
          </span>
          <div class="selector">
            <div class="month">{{ $store.state.date.prettyMonth }}</div>
            <div class="year">{{ $store.state.date.year }}</div>
          </div>
          <span
            class="icon"
            @click="$store.commit('changeDate', { direction: 1 })"
          >
            <icon-angle-right />
          </span>
        </div>

        <div class="summary">
          <div class="summary-item">
            <div class="title">Budgetted</div>
            <div class="value">{{ formatCurrency(budget.budgetted) }}</div>
          </div>

          <div class="summary-item">
            <div class="title">Used</div>
            <div class="value">{{ formatCurrency(budget.used) }}</div>
          </div>

          <div class="summary-item">
            <div class="title">Available</div>
            <div class="value">{{ formatCurrency(budget.available) }}</div>
          </div>
        </div>
      </div>
    </div>
  </dashboard>
</template>

<script>
import { mapGetters } from 'vuex';
import draggable from 'vuedraggable';
import group from '../components/budget/group';
import dashboard from '../layouts/dashboard';
import IconAngleLeft from '../components/icons/IconAngleLeft';
import IconAngleRight from '../components/icons/IconAngleRight';

export default {
  name: 'Budget',
  components: {
    'budget-group': group,
    dashboard,
    draggable,
    IconAngleLeft,
    IconAngleRight
  },
  computed: {
    ...mapGetters(['budget'])
  },
  methods: {
    sort(e) {
      this.$store.commit('sortGroup', {
        from: e.oldIndex,
        to: e.newIndex
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../colors';

.budget {
  padding: 1em;
  padding-right: 25em;
  box-sizing: border-box;
  overflow: auto;
  height: 100%;

  /deep/ .ghost {
    opacity: 0;
  }
}

.sidebar {
  position: absolute;
  top: 0;
  right: 0;
  width: 25em;
  height: 100%;
  padding: 0 1em;
  box-sizing: border-box;
  pointer-events: none;
  overflow-y: auto;

  .card {
    background-color: #fff;
    width: 100%;
    border-radius: 6px;
    padding: 1em;
    margin: 1em 0;
    box-sizing: border-box;
    pointer-events: auto;
    box-shadow: 0 5px 20px rgba(#000, 0.1);
  }

  .date {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    font-weight: 500;
    user-select: none;

    .icon {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 30px;
      color: #aaa;
      width: 1em;
      height: 1em;
      border-radius: 50%;
      transition: color 0.15s ease, background-color 0.15s ease-in-out;
      cursor: pointer;

      &:hover {
        background-color: #eee;
        color: darken(#aaa, 10%);
      }
    }

    .selector {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 4em;
    }

    .month {
      text-transform: uppercase;
    }
  }

  .summary {
    margin-top: 1em;
    border-top: 1px solid #ddd;

    .summary-item {
      display: flex;
      margin: 0.5em 0;
    }

    .title {
      font-size: 18px;
      margin-right: auto;
    }
  }
}
</style>

<style lang="scss" scoped>
@import '../colors';

@media (max-width: $break) {
  .sidebar {
    display: none;
  }

  .budget {
    padding: 1em;
  }
}
</style>
