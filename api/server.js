const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('express-jwt');
const MongoClient = require('mongodb').MongoClient
const app = express();
const config = require('./config');

//Set app settings
app.use(express.json());
app.use(bodyParser.json());
global.__root = __dirname + '/';

//Require token
app.use(jwt({
  secret: config.jwt.secret,
  isRevoked: checkToken
}).unless({path: [
  /^\/api\/auth\/?$/,
  /^\/api\/auth\/register\/?$/
]}));

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

//Error handling
app.use((err, req, res, next) => {
  //Check if error was caused by JWT
  if(err.name === 'UnauthorizedError'){
    res.status(401).send({error: 'invalid_token'});
    return next();
  }

  res.status(500).send({
    error: 'server_error',
    message: 'Something went wrong. Try again in a few minutes'
  });
  return next();
});

//Create MongoDB connection
MongoClient.connect(config.database.url, (err, client) => {
  //Kill server if connection failed
  if(err){
    console.error('Failed to connect to database. ' + err.stack);
    process.exit(err);
  }

  const db = client.db(config.database.name);

  app.locals.db = db;

  //Start server
  app.listen(8080, _ => console.log('API listening on port 8080'));
});

//Function to check if auth token is revoked
function checkToken(req, payload, done){
  //Connect to db collection
  const usersDb = req.app.locals.db.collection('users');

  //Find user with email
  usersDb.findOne({email: payload.email}, (err, user) => {
    if(err){
      done(err);
    }

    //Check if token is in list of valid tokens
    for(let i = 0; i < user.tokens.length; i++){
      console.log(i);
      if(payload.jti === user.tokens[i].jti){
        return done();
      }
    }

    return done(null, true);
  });
}
