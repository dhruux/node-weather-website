const request = require('request')

const forecast = (address,callback)=>{
    const url = 'https://api.weatherapi.com/v1/current.json?key=949344d477c1473cb8f93057210103&q='+encodeURIComponent(address)+'&aqi=yes'
    request({url,json: true},(error,{body})=>{
    if(error)
    {
        callback('unable to connect to weather services',undefined)
    }
    else if(body.error){
        callback('unable to find the location',undefined)
    }
    else{
       // const location1 = ;
        //const forecastdata1 ='It will be '+ body.current.condition.text+' today.It is currently ' + body.current.temp_c+ ' degrees out and There is a ' + body.current.precip_mm+'% chance of rain';
        callback(undefined,{
            location : body.location.name+',' + body.location.region +',' + body.location.country,
            forecastdata: 'It will be '+ body.current.condition.text+' today.It is currently ' + body.current.temp_c+ ' degrees out and There is a ' + body.current.precip_mm+'% chance of rain'
        })
    }
})
}

module.exports= forecast