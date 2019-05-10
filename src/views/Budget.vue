<template>
  <div class="budget">
    <budget-group group-name="Housing" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BudgetGroup from '@/components/BudgetGroup.vue';

@Component({
  components: {
    BudgetGroup
  }
})
export default class Budget extends Vue {}
</script>

<style lang="scss" scoped>
@import '../global';

.budget {
  padding: 2em;
}
</style>
