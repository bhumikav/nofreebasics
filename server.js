var express  = require('express');
var app      = express();
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var cfenv = require('cfenv');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var configDB = require('./config/database.js');//import the connection URL for your database

mongoose.connect(configDB.mlurl); // connect to your database

require('./config/passport')(passport); // pass passport for configuration

app.use(express.static(__dirname + '/public'));
// set up our express application
app.use(morgan('dev')); //log to console
app.use(cookieParser()); //read cookies
app.use(bodyParser()); // get info from html forms

app.set('view engine', 'ejs'); // set up ejs (Embeddble JS) for templating
var port = (process.env.VCAP_APP_PORT || 3000);
var host = (process.env.VCAP_APP_HOST || 'localhost');

//for passport
app.use(session({ secret: 'ilovejessicaalbaandshelovesme!' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); //flash messages stored in session

require('./app/routes.js')(app, passport);

app.listen(port, host, function() {
    console.log('Server ip: ' + host + ' port ' + port);
});