const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/0bbdafab0f01ff69a408107cae73740e/' + latitude + ',' + longitude + '?units=si'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined,  {
                summary:body.daily.data[0].summary,
                temp: body.currently.temperature,
                rain: 'There is a ' + body.currently.precipProbability + '% chance of rain.',
                humidity: body.daily.data[0].humidity,
                pressure: body.daily.data[0].pressure,
                windSpeed: body.daily.data[0].windSpeed,
                tempMin: body.daily.data[0].temperatureMin,
                tempMax: body.daily.data[0].temperatureMax,
                icon: body.daily.icon
            })
        }
    })
}

module.exports = forecast