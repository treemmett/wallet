<template>
  <input type="text" pattern="\d*" v-model="displayValue" @blur="blurHandler" @keydown.enter="enterHandler" @keydown.esc="escHandler" @focus="inputFocused = true"/>
</template>

<script>
export default {
  props: ['value', 'precission'],
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
        return this.inputFocused ? this.computedValue.toString() : this.formatCurrency(this.computedValue);
      },
      set(modifiedValue){
        // remove all non digit and decimal characters
        let cleanedValue = modifiedValue.replace(/[^\d\.]/g, '');
        let newValue = this.precission ? parseFloat(parseFloat(cleanedValue).toFixed(2)) : parseInt(cleanedValue, 10);
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
