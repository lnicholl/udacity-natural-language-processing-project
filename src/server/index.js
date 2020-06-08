const dotenv = require('dotenv');
dotenv.config();

var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
var aylien = require('aylien_textapi')
var textapi = new aylien({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY
    });

// middleware
const app = express()
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());

app.use(express.static('dist'))

console.log(__dirname)


app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

// post
app.post('/aylienapi', async (req, res) => {
    const inputText = req.body;
    console.log(inputText);
    
    try {
        textapi.sentiment({
            'text': inputText 
        }, function(error, response) {
          if (error === null) {
            console.log(response);
            res.send(response);
        }
      });
      
    } catch(error) {
      console.log(error)
      return(error)
    }
  })
