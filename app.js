/* global */
const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const configEnv = require('./config.env');
const Promise = require('bluebird');

mongoose.connection.on('open',  () => {
});
mongoose.connection.on('error', () => {
});

const mongoConnectionString = configEnv.mongodbConnString;
mongoose.Promise = Promise;
mongoose.connect(mongoConnectionString);

const api = require('./routes/api');
let app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());


app.use('/api', api);

module.exports = app;