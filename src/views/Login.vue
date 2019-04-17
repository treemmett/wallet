<template>
  <div class="view">
    <div class="card">
      <div class="half">
        <div class="brand">Rudget</div>
      </div>
      <div class="half">
        <Input />
        <Input />
        <Input />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Input from '@/components/Input.vue';

@Component({
  components: {
    Input
  }
})
export default class Login extends Vue {}
</script>

<style lang="scss" scoped>
.view {
  padding: 5em;
}

.card {
  display: flex;
  position: relative;
  background-color: #fff;
  width: 100%;
  box-sizing: border-box;
  border-radius: 5px;
  overflow: hidden;
}

.half {
  // float: left;
  position: relative;
  // height: 100%;
  padding: 2em 1em;
  width: 50%;
  box-sizing: border-box;

  &:first-child {
    background-color: #297c45;
  }
}

.brand {
  color: #fff;
  font-size: 38px;
  font-weight: 500;
  text-align: center;
}
</style>
