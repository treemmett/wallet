const auth = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require(__root + 'config');

auth.post('/', (req, res, next) => {
  //Check if all fields are present
  if(!req.body.email || !req.body.password){
    res.status(400).send({error: 'missing_required_input', message: 'Missing required input'});
    return next();
  }

  //Connect to db collection
  const users = req.app.locals.db.collection('users');

  //Find user with email
  users.findOne({email: req.body.email}, (err, user) => {
    if(err){
      return next(err);
    }

    //Check if user does not exist
    if(!user){
      res.status(400).send({error: 'invalid_credentials', message: 'Email or password is incorrect'});
      return next();
    }

    //Check hash
    bcrypt.compare(req.body.password, user.hash, (err, match) => {
      if(err){
        return next(err);
      }

      //Check if hash is incorrect
      if(!match){
        res.status(400).send({error: 'invalid_credentials', message: 'Email or password is incorrect'});
        return next();
      }

      //Calculate epoch
      const epoch = new Date().getTime();

      //Generate uniquid ID
      const uuid = Buffer.from(epoch.toString()).toString('base64').replace(/=/g, '');

      //Generate token
      const token = jwt.sign({email: req.body.email, jti: uuid}, config.jwt.secret, {expiresIn: config.jwt.expiresIn});

      //Add token to users token list
      users.update({email: req.body.email}, {$push: {tokens: {jti: uuid}}}, (err, count, obj) => {
        if(err){
          return next(err);
        }

        //Add token to header and send response
        res.set('Access-Token', token).send({success: true});
        return next()
      });
    });
  });
});

auth.post('/register', (req, res, next) => {
  //Check if all fields are present
  if(!req.body.email || !req.body.password){
    res.status(400).send({error: 'missing_required_input', message: 'Missing required input'});
    return next();
  }

  //Connect to db collection
  const users = req.app.locals.db.collection('users');

  //Check if email has already registered
  users.count({email: req.body.email}, (err, count) => {
    if(count){
      res.status(400).send({error: 'email_in_use', message: 'Email is already registered'});
      return next();
    }

    //Generate hash of password
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if(err){
        return next(err);
      }

      //Calculate epoch
      const epoch = new Date().getTime();

      //Generate uniquid ID
      const uuid = Buffer.from(epoch.toString()).toString('base64').replace(/=/g, '');

      //Create token
      const token = jwt.sign({email: req.body.email, jti: uuid}, config.jwt.secret, {expiresIn: config.jwt.expiresIn});

      //Add user to database
      users.insertOne({
        email: req.body.email,
        hash: hash,
        created: Math.floor(epoch / 1000),
        tokens: [
          {jti: uuid}
        ]
      }, (err, data) => {
        if(err){
          return next(err);
        }

        //Send token
        res.set('Access-Token', token).send({success: true});
        return next();
      });
    });
  });
});

module.exports = auth;
