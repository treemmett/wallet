const budget = require('express').Router();

budget.get('/', (req, res, next) => {
  const exampleBudget = [{
    name: 'Home',
    id: 0,
    subcategories: [
      {
        name: 'Rent',
        spending: 1000,
        id: 3
      },
      {
        name: 'Utilities',
        spending: 100,
        id: 8
      }
    ]
  },
  {
    name: 'Transportation',
    id: 1,
    subcategories: [
      {
        name: 'Auto Loan',
        spending: 200,
        id: 17
      },
      {
        name: 'Gas',
        spending: 100,
        id: 19
      },
      {
        name: 'Insurance',
        spending: 70,
        id: 6
      }
    ]
  }]

  res.send(exampleBudget);
});

module.exports = budget;
