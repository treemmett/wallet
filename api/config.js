module.exports = {
  database: {
    url: 'mongodb://localhost:27017',
    name: 'wallet'
  },
  jwt: {
    expiresIn: '1h',
    secret: 'mySecretKey'
  },
  methodNotAllowed: function(req, res, next){
    //Check if response has already been sent
    if(!res.headersSent){
      res.status(405).send({error: 'method_not_allowed', message: 'Method not allowed'});
    }

    return next();
  }
}
