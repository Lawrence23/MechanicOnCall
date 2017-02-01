// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

// Get our API routes
const api = require('./server/routes/api');

const app = express();

// DB Connection
const db = mongoose.connect('mongodb://lawry:lawry@ds141209.mlab.com:41209/mechanic-on-call');
mongoose.connection.once('connected', function() {
    console.log("Connected to database -**** Mechanic_on_Call **** ");
});

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
app.use('/api/v1', api);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.all('/*', function(request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    //  response.header("Access-Control-Allow-Origin", "10.9.12.250");
    response.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    response.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    if (request.method == 'OPTIONS') {
        response.status(200).end();
    } else {
        next();
    }
});



/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '7000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));
