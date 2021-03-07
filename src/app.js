const path =require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app =express()
const port = process.env.PORT || 3000

//define path for express config
const publicdirectorypath =path.join(__dirname,'../public')
const viewspath =path.join(__dirname,'../templates/views')
const partialspath=path.join(__dirname,'../templates/partials')

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewspath)
hbs.registerPartials(partialspath)
//seup static directory to serve
app.use(express.static(publicdirectorypath))
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name: 'Dhru Dholariya'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me ',
        name: 'Dhru Dholariya'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name: 'Dhru Dholariya',
        helptext: 'This is some helpful text'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
       return res.send({
            error: 'You must provide address'
        })
    }

    // geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
    //     if(error)
    //     {
    //         return res.send({ error })
    //     }
        forecast(req.query.address,(error,forecastdata)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastdata,
               // location,
                address: req.query.address
            })
        })
   // })
})

app.get('/products',(req,res)=>{
    if(!req.query.search)
    {
       return res.send({
            error: 'You must provide search'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Dhru Dholariya',
        errorMessage:'Help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name: 'Dhru Dholariya',
        errorMessage:'Page not found'
    })
})
app.listen(port,()=>{
    console.log('server is up on '+ port)
})

