const request = require('request');

let forecast = (latitude, longitude, callback)=>{
    url = `http://api.weatherstack.com/current?access_key=e8e4cab9f017a62dd87e76febb66823d&query=${encodeURI(latitude)},${encodeURI(longitude)}`;
    request({url, json:true}, (error,{body})=>{
        if(error){
            callback('Check your device connection',undefined);
        } else {
            callback(undefined, body.current.temperature);
        }
    })
}

module.exports = forecast;