const { nextISSTimesForMyLocation } = require('./iss.js')  

nextISSTimesForMyLocation((error, times) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  for (const time of times) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(time.risetime);
    console.log(`Next pass at ${datetime} for ${time.duration} seconds!`);
  }
});


