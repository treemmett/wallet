const transactions = require('express').Router();
const ObjectID = require('mongodb').ObjectID;
const config = require(__root + 'config');

transactions.route('/')
.get((req, res, next) => {
  //Select transactions from database
  const budgetDb = req.app.locals.db.collection('budget');
  budgetDb.findOne({email: req.user.email}, (err, data) => {
    if(err){
      return next(err);
    }

    res.send(data.transactions);
  });
})
.post((req, res, next) => {
  //Check if all data is present
  if(!req.body.amount || !req.body.category || !req.body.date || !req.body.payee){
    res.status(400).send({error: 'missing_required_input', message: 'Missing required input'});
    return next();
  }

  //Check if data type is correct
  if(isNaN(req.body.amount)){
    res.status(400).send({error: 'invalid_data_type', message: 'Data type is incorrect'});
    return next();
  }

  //Compile data to push
  const data = {
    _id: new ObjectID(),
    //Round amount to the second decimal
    amount: Math.round(Number(req.body.amount) * 100) / 100,
    category: req.body.category.trim(),
    date: req.body.date.trim(),
    payee: req.body.payee.toString().trim()
  }

  //Add optional parameters
  if(req.body.notes){
    data.notes = req.body.notes.trim()
  }

  //Add transaction to database
  const budgetDb = req.app.locals.db.collection('budget');
  budgetDb.findOneAndUpdate({email: req.user.email}, {$push: {transactions: data}}, (err, obj) => {
    if(err){
      return next(err);
    }

    //Check if there was no update
    if(!obj.value){
      res.status(500).send({error: 'database_error', message: 'Failed to save to database. Try again in a few minutes'});
      return next();
    }

    //Send data with _id
    res.send(data);
  });

})
.all(config.methodNotAllowed);

module.exports = transactions;