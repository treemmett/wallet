const budget = require('express').Router();
const ObjectID = require('mongodb').ObjectID;

budget.use((req, res, next) => {
  //Check if user has document in budget collection
  const budgetDb = req.app.locals.db.collection('budget');

  budgetDb.count({email: req.user.email}, (err, count) => {
    if(err){
      return next(err);
    }

    //Continue if document is already setup
    if(count){
      return next();
    }

    //Template budget for new users
    const templateBudget = [{
      name: 'Home',
      _id: new ObjectID(),
      categories: [
        {
          name: 'Rent',
          amount: 1000,
          _id: new ObjectID()
        },{
          name: 'Utilities',
          amount: 100,
          _id: new ObjectID()
        }
      ]
    },{
      name: 'Transportation',
      _id: new ObjectID(),
      categories: [
        {
          name: 'Auto Loan',
          amount: 200,
          _id: new ObjectID()
        },{
          name: 'Fuel',
          amount: 100,
          _id: new ObjectID()
        }
      ]
    }];

    //Create budget document for user
    budgetDb.insertOne({
      email: req.user.email,
      budget: templateBudget,
      transactions: []
    }, (err, data) => {
      return next(err);
    });

  });
});

budget.get('/', (req, res, next) => {

  //Select budget from users document
  const budgetDb = req.app.locals.db.collection('budget');
  budgetDb.findOne({email: req.user.email}, (err, data) => {
    res.send(data.budget);
  });
});

module.exports = budget;
