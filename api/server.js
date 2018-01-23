const express = require('express');
const app = express();

//Set app settings
app.use(express.json());

//Set response headers
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-cache, no-store');
  res.set('Connection', 'close');
  res.removeHeader('Date');
  res.removeHeader('X-Powered-By');
  return next();
});

app.use('/api', require('./routes'));

app.listen(8080, _ => console.log('API listening on port 8080'));
