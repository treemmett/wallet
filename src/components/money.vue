<template>
  <input type="text" pattern="\d*" v-model="displayValue" @blur="blurHandler" @keydown.enter="enterHandler" @keydown.esc="escHandler" @focus="inputFocused = true"/>
</template>

<script>
const MoneyParser = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
});

export default {
  props: ['value'],
  data(){
    return {
      inputFocused: false,
      computedValue: this.value
    }
  },
  methods: {
    blurHandler(){
      this.inputFocused = false;

      if(this.computedValue !== this.value){
        this.$emit('change', this.computedValue);
      }
    },
    enterHandler(e){
      e.target.blur();
    },
    escHandler(e){
      this.computedValue = this.value;
      e.target.blur();
    }
  },
  computed: {
    displayValue: {
      get(){
        return this.inputFocused ? this.computedValue.toString() : MoneyParser.format(this.computedValue);
        // return this.inputFocused ? this.computedValue.toString() : '$' + this.computedValue.toFixed(2).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,');
      },
      set(modifiedValue){
        // remove all non digit and decimal characters
        let newValue = parseInt(modifiedValue.replace(/[^\d\.]/g, ''), 10);
        if(isNaN(newValue)){
          newValue = 0;
        }

        this.computedValue = newValue;
        this.$emit('input', newValue);
      }
    }
  },
  watch: {
    value(newValue, oldValue){
      this.computedValue = newValue;
    }
  }
}
</script>
