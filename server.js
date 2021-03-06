// server.js

var express = require('express');
var bodyParser = require('body-parser');
var querystring = require('querystring');
var debug = require('debug')('botkit:webserver');
var http = require('http');
var fs = require('fs');
var hbs = require('express-hbs');

module.exports = function(controller) {

    var webserver = express();
    // Parse request bodies
    webserver.use(bodyParser.json());
    webserver.use(bodyParser.urlencoded({ extended: true }));
    // Setup a static directory 'public', totally optional
    webserver.use(express.static('public'));

    // You can pass in whatever hostname you want as the second argument
    // of the express listen function, it defaults to 0.0.0.0 aka localhost 
    webserver.listen(process.env.PORT || 3000,  null, function() {
        console.log('Express webserver configured and listening!')
    });
 

    // Register our Facebook webhook routes
    // Pass in the express server, and the botkit controller into
    // the routes file to extend both of them 
    require(__dirname + '/components/routes/incoming-webhook')(webserver, controller);
    require(__dirname + '/components/routes/embed')(webserver, controller);
   
    
    controller.webserver = webserver;

    return webserver;

}