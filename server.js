console.log('hi');

var express = require('express');

var app = express();

app.use(express.json());

app.listen(4000);

app.get('/', (req, res) => {
  res.send('hi');
})

console.log('Listening on port 4000');

/**
 * Exports express
 * @public
 */
module.exports = app;
