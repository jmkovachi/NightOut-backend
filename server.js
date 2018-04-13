var express = require('express');
var app = express();
const dotenv = require('dotenv');

app.use(express.json());

app.listen(4000);

app.get('/', (req, res) => {
  res.send('hi');
  // Use the key for later.
  var key = process.env.PLACES_API_KEY;
})

console.log('Listening on port 4000');

/**
 * Exports express
 * @public
 */
module.exports = app;
