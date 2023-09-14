const prequest = require('postman-request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidG9sZWRvanI3IiwiYSI6ImNsbWU5a2hjMzFtY2QzaHM1N3Z5cnRvdDgifQ.p-_4bNGlkJ5ebkA9Ciu8UA&limit=1'
    prequest({url, json: true}, (error, resp, {features}) => {
            if (error){
                callback("Unable to connect to location service!", undefined)
            } else if (features.length === 0) {
                callback("No Matching Results. Try another Search. Try Again", undefined)
            }
            else {
                callback(undefined, {
                    latitude: features[0].center[1],
                    longitude: features[0].center[0],
                    location: features[0].text
                })             
            }
        })
}   

module.exports = geocode
