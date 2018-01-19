const routes = require('express').Router();

routes.all('*', (req, res,next) => {
  res.send({success: true});
});

module.exports = routes;
