export default {
  methods: {
    formatCurrency(value){
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 2,
        minimumFractionDigits: 0
      });

      return formatter.format(value);
    }
  }
}