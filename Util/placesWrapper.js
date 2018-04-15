var request = require("request");

var placesQuery = (query) => {
  return new Promise ((resolve, reject) => {
    var options = { method: 'GET',
      url: 'https://maps.googleapis.com/maps/api/place/textsearch/json',
      qs:
       { query: 'Athens,%20GA',
         key: process.env.PLACES_API_KEY },
      headers:
       { 'Postman-Token': '3d99d48a-842b-4e54-9940-2541b8c8a80f',
         'Cache-Control': 'no-cache' } };

    request(options, function (error, response, body) {
      if (error) reject(error);
      resolve(body);
    });
  });
}

module.exports.placesQuery = placesQuery;
