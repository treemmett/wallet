const routes = require('express').Router();

routes.use('/auth', require('./auth'));
routes.use('/budget', require('./budget'));
routes.use('/taxable', require('./taxable'));

module.exports = routes;
