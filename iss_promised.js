const request = require('request-promise-native'); 

const fetchMyIP = () => {
    return request(`https://api.ipify.org?format=json`);
} 

const fetchCoordsByIP = (body) => {
  const ip = JSON.parse(body).ip
  return request(`http://ipwho.is/${ip}`)
} 

const fetchISSFlyOverTimes = (body) => {
  const longitude = JSON.parse(body).longitude
  const latitude = JSON.parse(body).latitude
  return request(`https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`)
}

const passTime = (data) => {
  for (const time of data) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(time.risetime);
    console.log(`Next pass at ${datetime} for ${time.duration} seconds!`);
  }
};

const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  .then((data) => {
    const { response } = JSON.parse(data);
    return response;
  });
}

module.exports = { 
  nextISSTimesForMyLocation
};