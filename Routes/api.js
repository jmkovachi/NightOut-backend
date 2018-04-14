const express = require('express');
router = express.Router();
const pl = require('../Util/placesWrapper.js');
const parser = require('body-parser');

router.get('/places', (req,res) => {
  pl.placesQuery(req.body).then(result => {
    res.send(result);
  })
  .catch(error => {
    res.send(error);
  });
});


module.exports = router;
