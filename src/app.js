const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    address = 'Delhi'
    geocode(address, (error, { latitude, longitude, location } = {}) => {
        forecast(latitude, longitude, (error, {summary,temp,rain,humidity,windSpeed,pressure,tempMin,tempMax,icon}) => {
            var place = location.split(",")
            
            if (icon == 'clear-day') {
                image = 'img/icons/clear-day.png';
            } else if (icon == 'clear-night') {
                image = 'img/icons/clear-night.png';
            } else if (icon == 'partly-cloudy-day') {
                image = 'img/icons/partly-cloudy-day.png';
            } else if (icon == 'partly-cloudy-night') {
                image = 'img/icons/partly-cloudy-night.png';
            } else if (icon == 'cloudy') {
                image = 'img/icons/cloudy.png';
            } else if (icon == 'rain') {
                image = 'img/icons/rain.png';
            } else if (icon == 'sleet') {
                image = 'img/icons/sleet.png';
            } else if (icon == 'snow') {
                image = 'img/icons/snow.png';
            } else if (icon == 'wind') {
                image = 'img/icons/wind.png';
            } else if (icon == 'fog') {
                image = 'img/icons/fog.png';
            } 

                res.render('index', {
                    placeName : place[0],
                    address : location,
                    summary,
                    rain,
                    temp : Math.round(temp),
                    humidity: humidity + "%",
                    pressure : pressure + "mb",
                    tempMin: Math.round(tempMin),
                    tempMax: Math.round(tempMax),
                    windSpeed: Math.round(windSpeed) + " km/h",
                    image
                })        
        })
    })    
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, {summary,temp,rain,humidity,windSpeed,pressure,tempMin,tempMax,icon}) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                summary,temp,rain,humidity,pressure,tempMin,tempMax,icon,windSpeed,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})