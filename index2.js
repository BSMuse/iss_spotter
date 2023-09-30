const { nextISSTimesForMyLocation } = require('./iss_promised')

const printPassTimes = (times) => {
  for (const time of times) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(time.risetime);
    console.log(`Next pass at ${datetime} for ${time.duration} seconds!`);
  }
}

nextISSTimesForMyLocation()
  .then((passTimes) => {
  printPassTimes(passTimes);
})
