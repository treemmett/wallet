const auth = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

auth.post('/register', (req, res, next) => {
  //Check if all fields are present
  if(!req.body.email || !req.body.password || !req.body.confirm_password){
    res.status(400).send({error: 'missing_required_input', message: 'Missing required input'});
    return next();
  }

  //Check if password matches
  if(req.body.password !== req.body.confirm_password){
    res.status(400).send({error: 'invalid_input', message: 'Passwords do not match'});
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
        res.status(500).send({error: 'server_error', message: 'A server error occured. Please try again later'});
        return next(err);
      }

      //Calculate epoch
      const epoch = new Date().getTime();

      //Generate uniquid ID
      const uuid = Buffer.from(epoch.toString()).toString('base64').replace(/=/g, '');

      //Create token
      const token = jwt.sign({email: req.body.email, jti: uuid}, 'mySecretKey', {expiresIn: '1h'});

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
          res.status(500).send({error: 'server_error', message: 'A server error occured. Please try again later'});
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
