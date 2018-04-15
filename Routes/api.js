const express = require('express');
router = express.Router();
const pl = require('../Util/placesWrapper.js');


/*
We take the location specified in req parameters and use that to query the
Google Places API for our desired location.
*/
router.post('/places', (req,res) => {
  pl.placesQuery(req.body.location).then(result => {
    result = JSON.parse(result);
    res.json(result.results[0].geometry.location);
  })
  .catch(error => {
    console.log(error);
    res.send(error);
  });
});


module.exports = router;
