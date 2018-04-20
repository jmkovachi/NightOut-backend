var transform = (db_markers) => {
  return new Promise ((resolve, reject) => {
    try {
      resolve(db_markers.map(marker => {
        return {
          coordinate : {
            latitude : marker.location.coordinates[0],
            longitude : marker.location.coordinates[1],
          },
          key : marker.key,
          color : marker.color,
          callout : marker.callout,
          username : marker.username,
          eventType : marker.eventType,
          plan : marker.plan,
        };
      }));
    }
    catch(error) {
      reject(error);
    }
  });
};

module.exports.transform = transform;
