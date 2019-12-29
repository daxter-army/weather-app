const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// console.log(__dirname);
// console.log(path.join(__dirname, '../public'));

const app = express();                      //loading express module
const port = process.env.PORT || 3000

//Define paths for express configs
const publicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

//Setting up handlebar engines and providing customized path
app.set('view engine', 'hbs');              //loading hbs in express
app.set('views', viewsPath);                //setting customized path (default is views)
hbs.registerPartials(partialsPath);         //providing paths to partials

app.use(express.static(publicDirectory));    //accessing root directory

app.get('', (req, res) => {                 //template
    res.render('index', {
        title: 'Weather App',
        name: 'Mehul Singh Teya'
    });
})

app.get('/help',(req, res) => {             //like app.com/help
    res.render('help', {
        title: 'Help Section',
        name: 'Mehul Singh Teya'
    });
})

app.get('/about',(req, res) => {             //like app.com/help
    res.render('about', {
        title: 'About Us Section',
        name: 'Mehul Singh Teya'
    });
})

app.get('/weather',(req, res) => {             //like app.com/help
    if(!req.query.address) {
        return res.send({
            error: "You must provide address for search..."
        });
    }

    geocode(req.query.address, (error, {latitude, longitude, location } = {}) => {
        if(error){
            return res.send({error});
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: "Help article Not Found",
        name: 'daxter_army'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: "Page not Found",
        name: 'daxter_army'
    })
})

app.listen(port, () => {
    console.log('Server is up on port port');
});       //Switching on the server