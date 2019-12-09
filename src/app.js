const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geocode')
var app = express()
const port = process.env.PORT || 3000

var publicFolderPath = path.join(__dirname, '../public')
var templatesPath = path.join(__dirname, '../templates/views')
var partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', templatesPath)
app.use(express.static(publicFolderPath))
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Suresh Patil'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Suresh Patil'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Suresh Patil'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'you must provide address to get the weather forecast!!'
        })
    }

    geoCode.getGeoCode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error)
            return res.send({
                error
            })
        geoCode.getForecast(latitude, longitude, (error, forecastResponse) => {
            if (error)
                return res.send({
                    error
                })
            res.send({
                location,
                forecast: `Current temperature is ${forecastResponse.currentTemperature} degree celcius with ${forecastResponse.rain} chance of rain`,
                address: req.query.address
            })
        })
    })

})

app.get('/help/*', (req, res) => {
    res.render('errorpage', {
        title: '404',
        name: 'Suresh Patil',
        message: 'help content not found'
    })
})


app.get('*', (req, res) => {
    res.render('errorpage', {
        title: '404',
        name: 'Suresh Patil',
        message: 'page not found'
    })
})

app.listen(port, () => {
    console.log('Listening on port ' + port)
})