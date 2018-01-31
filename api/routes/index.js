const routes = require('express').Router();

routes.use('/budget', require('./budget'));
routes.use('/taxable', require('./taxable'));

routes.all('*', (req, res,next) => {
  res.send({success: true});
});

module.exports = routes;
