const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient
const app = express();

//Set app settings
app.use(express.json());
app.use(bodyParser.json());

//Set response headers
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-cache, no-store');
  res.set('Connection', 'close');
  res.removeHeader('Date');
  res.removeHeader('X-Powered-By');
  return next();
});

//Use all routes
app.use('/api', require('./routes'));



//Create MongoDB connection
const url = 'mongodb://localhost:27017';
const dbName = 'wallet';
MongoClient.connect(url, (err, client) => {
  //Kill server if connection failed
  if(err){
    console.error('Failed to connect to database. ' + err.stack);
    process.exit(err);
  }

  const db = client.db(dbName);

  app.locals.db = db;

  //Start server
  app.listen(8080, _ => console.log('API listening on port 8080'));
});
