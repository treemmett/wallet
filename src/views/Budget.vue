<template>
  <div class="budget">
    <budget-group
      v-for="group in budget"
      :key="group.id"
      :group-name="group.name"
      :categories="group.categories"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import BudgetGroup from '@/components/BudgetGroup.vue';

@Component({
  components: {
    BudgetGroup
  }
})
export default class Budget extends Vue {
  @Getter('budget')
  budget: Rudget.BudgetGroup[];

  created() {
    this.$store.dispatch('loadBudget');
  }
}
</script>

<style lang="scss" scoped>
@import '../global';

.budget {
  padding: 2em;
}
</style>
