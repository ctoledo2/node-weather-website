const prequest = require('postman-request')

const forecast = (longitude,latitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=7579cf38f536388248da6359fbf4bd6a&query='+latitude+','+longitude+'&units=f'
    prequest({url, json: true}, (error, resp, {error2, current}) => {
        if (error){
            callback("Unable to connect to weather service!",undefined)
        } else if (error2){
            callback("Unable to find location. Try Again!",undefined)
        } else {
            const {weather_descriptions:description , temperature:temp,feelslike} = current
            callback(undefined, description[0]+". It is currently "+temp+" degrees Fahrenheit out. It feels like " + feelslike +" degrees Fahrenheit out.")
        }
    })
}


module.exports = forecast