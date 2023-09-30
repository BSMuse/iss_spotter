const request = require('request');

const fetMyIP = (callback) => {
  const url = `https://api.ipify.org?format=json`;

  request(url, (error, response, body) => {
    if (error) {
      console.error('Error:', error);
      callback(error, null); // Call the callback with an error
      return;
    }
  
    if (response.statusCode !== 200) {
      console.error('HTTP Status Code:', response.statusCode);
      callback('HTTP Status Code: ' + response.statusCode, null); // Call the callback with an error
      return;
    }
  
    // Parse the JSON string into a JavaScript object
    const data = JSON.parse(body);
  
    // Now you can access the properties of the JSON object
    callback(null, data.ip); // Call the callback with the IP address
  });
}

const fetCoordsByIP = (ip, callback) => {
  const url = `http://ipwho.is/${ip}`
  request(url, (error, response, body) => {
    const data = JSON.parse(body);
    if (error) {
      console.error('Error:', error);
      callback(error, null); 
      return;
    }
  
    if (!data.success) {
      console.error(data.message);
      callback(data.message, null); 
      return;
    }

    const coordinates = { latitude: data.latitude, longitude: data.longitude} 
  
    callback(null, coordinates); 
  });
}

const fetISSFlyoverTimes = (coordinates, callback) => {
  const longitude = coordinates.longitude 
  const latitude = coordinates.latitude
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`
  
  request(url, (error, response, body) => {
    if (error) {
      console.error('Error:', error);
      callback(error, null); // Call the callback with an error
      return;
    }
  
    if (response.statusCode !== 200) {
      console.error('HTTP Status Code:', response.statusCode);
      callback('HTTP Status Code: ' + response.statusCode, null); // Call the callback with an error
      return;
    }
  
    // Parse the JSON string into a JavaScript object
    const data = JSON.parse(body);
  
    // Now you can access the properties of the JSON object
    callback(null, data.response); // Call the callback with the IP address
  });
}

const nextISSTimesForMyLocation = function(callback) {
  fetMyIP((error, ip) => {
    if (error) {
      console.error('Error:', error);
      callback(error, null);
    } else {
      console.log('IP Address:', ip);
      fetCoordsByIP(ip, (error, coordinates) => {
        if (error) {
          console.error('Error:', error);
          callback(error, null);
        } else {
          console.log('Coordinates:', coordinates);
          fetISSFlyoverTimes(coordinates, (error, times) => {
            if (error) {
              console.error('Error:', error);
              callback(error, null);
            } else {
              console.log('Flyover Times:', times);
              callback(null, times);
            }
          });
        }
      });
    }
  });

  
};


module.exports = { nextISSTimesForMyLocation }

