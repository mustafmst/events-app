//evironmental variables
var environment = 'Dev';
var port = 8000;

//dependencies
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var dbConfiguration = require('./config/database')(environment);
//configuration
mongoose.connect(dbConfiguration.url);
require('./config/passport')(passport);
//express setup

app.use('/css', express.static(__dirname+'/node_modules/bootstrap/dist/css'));
app.use('/fonts', express.static(__dirname+'/node_modules/bootstrap/dist/fonts'))
app.use('/js', express.static(__dirname+'/node_modules/bootstrap/dist/js'));

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());

app.set('view engine', 'ejs');

app.use(session({secret: 'to tajemnica'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./app/routes')(app, passport);
//run application
app.listen(port);
console.log('App is using db :'+dbConfiguration.url);
console.log('App is listening on port: '+port);
