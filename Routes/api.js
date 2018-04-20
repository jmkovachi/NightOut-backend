const express = require('express');
router = express.Router();
const pl = require('../Util/placesWrapper.js');
const transformer = require('../Util/transformer.js');

/*
We take the location specified in req parameters and use that to query the
Google Places API for our desired location.
*/
router.post('/places', (req,res) => {
  console.log('hi');
  var db = req.db;
  var location;

  pl.placesQuery(req.body.location).then(result => {
    return new Promise((resolve, reject) => {
      result = JSON.parse(result);
      resolve(result.results[0].geometry.location);
    })
  })
  .then(loc => {
    location = loc;
    return db.collection('markers').find({}, { username : req.body.username }).toArray();
  })
  .then(markers => {
    return transformer.transform(markers); //transform markers so react can handle them
  })
  .then(markers => {
    console.log(markers);
    res.json({ markers : markers, location : location });
  })
  .catch(error => {
    console.log(error);
    res.send(error);
  });
});

router.post('/addmarkers', (req, res) => {
  var db = req.db;
  var markers = req.body.markers;
  markers = markers.map(marker => {
    var newMarker = {
      location : {
        type : 'Point',
        coordinates : [marker.coordinate.latitude, marker.coordinate.longitude]
      },
      key : marker.key,
      color : marker.color,
      callout : marker.callout,
      username : marker.username, //need to add this username in react component state
      eventType : marker.eventType,
      plan : marker.plan, //not implemented on frontend side yet
    };
    return newMarker;
  });
  markers.forEach((marker, index, array) => {
    console.log(marker);
    db.collection('markers')
      .update(
        marker,
        marker,
        { upsert : true }
      )
      .then(result => {
        //console.log(result);
        if (index === markers.length-1) {
          console.log('hi');
          res.sendStatus(200);
        }
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  });

  /*db.collection('markers').insertMany(markers)
                          .then(result => {
                            res.send(200);
                          })
                          .catch(err => {
                            res.send(400);
                          });*/
});


module.exports = router;
