const request = require('request')

const getGeoCode = (address, callback) => {
    var url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1Ijoic3VyaXdpcCIsImEiOiJjano5b2VzbWwwNXpiM25sa2o5OTBoMmkxIn0.SqDsCysx6tSyB9rDxpHd3A'
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('unable to connect to geo service', undefined)
        }
        else if (body.features.length === 0) {
            callback('Unable to find location', undefined)
        }
        else {
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    });
}

const getForecast = (latitude, longitude, callback) => {
    var url = 'https://api.darksky.net/forecast/b37c1b38262b9f94bf97b05c389e38c3/' + longitude + ',' + latitude

    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connecto forecast service!', undefined)
        }
        else if (body.error) {
            callback('Invalid location', undefined)
        }
        else {
            callback(undefined, {
                currentTemperature: body.currently.temperature,
                rain: body.currently.precipProbability
            })
        }

    });
}

module.exports = {
    getGeoCode: getGeoCode,
    getForecast: getForecast
}