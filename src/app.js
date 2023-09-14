const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define Paths for Express Config
const publicDirPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup Handlebars enginer an views location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: ' Weather App',
        name: 'Carlos Toledo'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: ' About Page',
        name: 'Carlos Toledo'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: ' Help Page',
        message: 'Here to help!',
        name: 'Carlos Toledo'
    })
})

app.get('/weather',  (req, res) => {

    if(!req.query.address){
        return res.send({
            error:'Must Provide an Address.'
        })
    }

    geocode(req.query.address, (error, {longitude,latitude,location} = {}) => {
        if (error){
            return res.send({error})
        }
        forecast(longitude, latitude, (error, forecastData) => {
            if (error){
                return res.send({error})
            }    
            
            res.send({
                forcast: forecastData,
                location,
                address: req.query.address
                })
          })
    })

    
})

app.get('/help/*', (req, res) => {
    res.render('404', { 
        title: 'Help 404 Page',
        error: 'Help Article Not Found.',
        name: 'Carlos Toledo'
    })

})

app.get('*', (req, res) => {
    res.render('404',{
        title: '404 Page',
        error: "Page Not Found.",
        name: 'Carlos Toledo'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})