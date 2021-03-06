var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

import * as Swig from 'swig';


//assign the swig view engine to handle .html files
var swig = Swig;

var mongoose = require('mongoose');
//Connect To Mongoose to MongoLab Online Server 
//Mongolab provides URL as   mongodb://<dbuser>:<dbpassword>@ds044229.mlab.com:44229/teammeetings
//Create a user and add details 

mongoose.connect('mongodb://harman666666:123456@ds044229.mlab.com:44229/teammeetings')

app.engine('html', swig.renderFile); //=> Change view engine to swig

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html'); //==> Changed view engine from hjs to html

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users); //This is how you put routes in a different folder.

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
