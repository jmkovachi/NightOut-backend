const express = require('express');
router = express.Router();
const pl = require('../Util/placesWrapper.js');


/*
We take the location specified in req parameters and use that to query the
Google Places API for our desired location.
*/
router.post('/places', (req,res) => {
  console.log(req);
  pl.placesQuery(req.body.location.split(' ').join('%20')).then(result => {
    res.send(JSON.stringify(result.results[0].geometry.location));
  })
  .catch(error => {
    res.send(error);
  });
});


module.exports = router;
