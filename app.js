let express = require('express');
let path = require('path');
let mongoose = require('mongoose');
let http = require('http');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let configEnv = require('./config.env');

mongoose.connection.on('open', function (ref) {
    console.log('Connected to mongo server.');
});
mongoose.connection.on('error', function (err) {
    console.log('Could not connect to mongo server!');
    console.log(err);
});

let mongoConnectionString = configEnv.mongodbConnString;

mongoose.connect(mongoConnectionString);

let api = require('./routes/api');
let app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());


app.use('/api', api);

module.exports = app;