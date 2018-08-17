const local = require('./config/local');

// Utility
const express = require('express');
const Resource = require('express-resource');
const path = require('path');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const errorhandler = require('errorhandler');
const compress = require('compression');
const methodOverride = require('method-override');
const helmet = require('helmet');

var logger = require('./util/logger.js');


// Init express
var app = new express();


// Port
app.set('port', local.port);

app.on('error', function(err) {
    console.error(err);
});


// Configuration
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(compress());

app.use(helmet());

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//app.use(require("connect-assets")(local.connectAssets));
app.use(methodOverride('X-HTTP-Method-Override'));
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(cookieParser(local.cookie.key));

app.use(express.static(path.join(__dirname, 'public')));


// Enviroment Configuration

if (app.get('env') === 'development') {
    app.use(require('morgan')('short', {
        stream: logger.stream
    }));
    app.use(errorhandler());
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
} else {
    app.enable('view cache');
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });
}

// Route
var api = {
    index: require('./routes/index'),
    blocks: require('./routes/blocks'),
};

app.get('/api/blocks', api.blocks.index);

app.get('/', api.index.handleRouting);
app.get('*', api.index.handleRouting);

module.exports.app = app;