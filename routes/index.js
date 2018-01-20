const routes = require('express').Router();

routes.use('/taxable', require('./taxable'));

routes.all('*', (req, res,next) => {
  res.send({success: true});
});

module.exports = routes;
