// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const logger = require('morgan');
// const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const config = require('./config.json');


// Get our API routes
// const api = require('./src/server/routes/api');
const user = require('./routes/user');

const app = express();



// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../dist')));


app.use('/user', user);


app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});


app.get('/', function (req, res){
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.get('*', function (req, res) {
    res.redirect('/');
});


 var port = process.env.NODE_ENV === 'production' ? 80 : 3000;
 var server = app.listen(port, function () {
     console.log('Server listening on port ' + port);
 });
