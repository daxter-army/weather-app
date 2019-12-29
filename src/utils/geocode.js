const request = require('request');

const geocode = (address, callback) => {
    
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZGF4dGVyLWFybXkiLCJhIjoiY2s0aWtiNmo1MWgxNDNtbzJmaXd6NnE5dyJ9.A-M7Xl5OJhBPJoepB2wiGw';

    request({url: url, json: true}, (error, response) => {
        if(error){
            callback('Unable to connect to Location Services...', undefined);
        }
        else if(response.body.features.length === 0){
            callback('Unable to find the location...Check your Search...', undefined);
        }
        else{
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            } )
        }
    })

}

module.exports = geocode;