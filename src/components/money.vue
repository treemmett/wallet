<template>
  <input
    v-model="displayValue"
    type="text"
    pattern="\d*"
    @blur="blurHandler"
    @keydown.enter="enterHandler"
    @keydown.esc="escHandler"
    @focus="inputFocused = true"
  />
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0
    },
    precission: Boolean
  },
  data() {
    return {
      inputFocused: false,
      computedValue: this.value
    };
  },
  computed: {
    displayValue: {
      get() {
        return this.inputFocused
          ? this.computedValue.toString()
          : this.formatCurrency(this.computedValue);
      },
      set(modifiedValue) {
        // remove all non digit and decimal characters
        const cleanedValue = modifiedValue.replace(/[^\d.]/g, '');
        let newValue = this.precission
          ? parseFloat(parseFloat(cleanedValue).toFixed(2))
          : parseInt(cleanedValue, 10);
        if (Number.isNaN(newValue)) {
          newValue = 0;
        }

        this.computedValue = newValue;
        this.$emit('input', newValue);
      }
    }
  },
  watch: {
    value(newValue) {
      this.computedValue = newValue;
    }
  },
  methods: {
    blurHandler() {
      this.inputFocused = false;

      if (this.computedValue !== this.value) {
        this.$emit('change', this.computedValue);
      }
    },
    enterHandler(e) {
      e.target.blur();
    },
    escHandler(e) {
      this.computedValue = this.value;
      e.target.blur();
    }
  }
};
</script>
