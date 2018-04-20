var MongoClient = require('mongodb').MongoClient;

var returnMongo = (url) => {
  return new Promise ((resolve, reject) => {
    MongoClient.connect('mongodb://' + url)
               .then(db => {
                 resolve(db);
               })
               .catch(err => {
                 reject(err);
               });
  });
};

module.exports.returnMongo = returnMongo;
