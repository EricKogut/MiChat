
//Imports for the server
var app = require('express')();
var http = require('http').createServer(app);
const express = require('express')
var cors = require('cors')
//Import for the dotenv file
require('dotenv').config();

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended: true}));
//////////////////////////////////
//use npm start to start the app//

app.get('/hello', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

//Declaring static webpage
app.use('/', express.static('./static'));


//PORT
port = process.env.PORT || 5000; //If the port is outline in the env file use that
app.listen(port,() => console.log(`Listening on port ${port}`))
