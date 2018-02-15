const express = require('express');
const bodyParser = require('body-parser');
const expJwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const ms = require('ms');
const MongoClient = require('mongodb').MongoClient
const app = express();
const config = require('./config');

//Set app settings
app.use(express.json());
app.use(bodyParser.json());
global.__root = __dirname + '/';

//Require token
app.use(expJwt({
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

  //Duplicate token and update expiration
  if(req.user){
    const payload = JSON.parse(JSON.stringify(req.user));
    payload.exp = Math.floor((ms(config.jwt.expiresIn) + new Date().getTime()) / 1000);

    //Sign new token
    const newToken = jwt.sign(payload, config.jwt.secret);
    res.set('Access-Token', newToken);
  }

  return next();
});

//Intercept before response is sent
app.use((req, res, next) => {
  res.realSend = res.send;

  //Response interceptors
  res.send = function(data){

    //Change _id key to id
    if(typeof data === 'object'){
      const dataJson = JSON.stringify(data);
      data = JSON.parse(dataJson.replace(/"_id":/gi, '"id":'));
    }

    res.realSend(data);
    return next();
  }
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

    //Check if user exists
    if(!user){
      done(null, true);
    }

    //Calculate current time for token check
    const epoch = Math.floor(new Date().getTime() / 1000);

    let tokenInvalid = true;

    //Loop through all tokens in user profile
    for(let i = 0; i < user.tokens.length; i++){

      //Check if current token matches token that is received
      if(payload.jti === user.tokens[i].jti){
        //Continue middleware to reduce delay, but continue checking all tokens
        tokenInvalid = false;
        done();
        continue;
      }

      //Continue check if token has no expiration
      if(!user.tokens[i].exp){
        continue;
      }

      //Check if token has expired
      if(epoch > user.tokens[i].exp){

        //Remove token from DB
        usersDb.update(
          {
            _id: user._id
          },
          {
            $pull: {
              'tokens': {
                jti: user.tokens[i].jti
              }
            }
          }
        );
      }
    }

    //Return invalid token if no valid token was found
    if(tokenInvalid){
      return done(null, true);
    }

  });
}
