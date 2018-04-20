var express = require('express');
var app = express();
require('dotenv').config();
var api = require('./Routes/api.js');
var mongo = require('./Config/db.js');

app.use(express.json());

app.listen(process.env.PORT || 4000);

app.get('/', (req,res) => {
  res.send('hello world');
});

app.use((req, res, next) => {
  mongo.returnMongo((process.env.DB || '127.0.0.1:27017'))
       .then(db => {
         req.db = db.db('test');
         next();
       })
       .catch(err => {
         console.log(err);
         res.send(err);
       });
});

app.use('/api', api);

console.log('Listening on port ' + (process.env.PORT || 4000));

/**
 * Exports express
 * @public
 */
module.exports = app;
