const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/34820b60a88eb95ab736a3f5420a5d1d/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '?units=si';

request({url: url, json: true}, (error, response) => {
    if(error){
        callback('Unable to connect to the servers...', undefined);
    }else if(response.body.error){
        callback('Unable to reach the location...Check your Search', undefined);
    }
    else{
        callback(undefined, response.body.daily.data[0].summary + ' The Temperature is ' + response.body.currently.temperature + ' centigrade. The high today is ' + response.body.daily.data[0].temperatureHigh + ' centigrade, with a low of ' + response.body.daily.data[0].temperatureLow + ' centigrade. There is ' + response.body.currently.precipProbability*100 + '% chance of Rain.');
    }    
})
}

module.exports = forecast;