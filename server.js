var express = require('express');
var app = express();
require('dotenv').config();
var pl = require('./Util/placesWrapper.js');
var api = require('./Routes/api.js');

app.use(express.json());

app.listen(process.env.PORT || 4000);

app.get('/', (req,res) => {
  res.send('hello world');
});

app.use('/api', api);

console.log('Listening on port ' + (process.env.PORT || 4000));

/**
 * Exports express
 * @public
 */
module.exports = app;
