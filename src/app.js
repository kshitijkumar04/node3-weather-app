const forecast= require('./utils/forecast');
const geolocation = require('./utils/geolocation');
const path = require('path')
const express = require('express');
const hbs = require('hbs');
const app = express();


const indexPath = path.join(__dirname, '../public');
const partialsPath = path.join(__dirname,'../templates/partials')

const port= process.env.PORT || 3000;
//setup handle bar engine and views location
app.set('view engine','hbs');
app.set('views', path.join(__dirname, '../templates/views'))
hbs.registerPartials(partialsPath)



app.use(express.static(indexPath));

app.get('/weather', (req,res)=>{
    if(!req.query.address){
        return res.send({error: 'Please provide a location'})
    }
    geolocation(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error});
        }
        forecast(latitude,longitude,(err,result)=>{
            if(err){
                return res.send({err});
            }
            res.json({
                location: req.query.address,
                weather: `Current temperature ${result}`,
            });
        })
    })
})

app.get('/', (req,res)=>{
    res.render('index',{
        title : 'Welcome to Weather App!!',
        footer_content : "Created by HackerMan"
    })
})




//if we dont use the below line, then url/about will not work but url/about.html will work
//app.use('/about', express.static(aboutPath));

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About the WeatherMan!!',
        footer_content : "Created by HackerMan"
    })
})

app.get('/about/*',(req,res)=>{
    res.render('error',{
        title : 'Welcome to Weather App!!',
        error_title:'Not found in About'
    })
})

app.get('*', (req,res)=>{
    res.render('error',{ 
        title : 'Welcome to Weather App!!',
        error_title:'Page not found'
    });
})


app.listen(port, ()=>{
    console.log('listening on port 3000');
});