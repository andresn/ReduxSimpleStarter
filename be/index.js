// Main starting point of application

const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');

var corsOptions = {
    // see https://goo.gl/mSvVC9 and https://goo.gl/4r5uMW
    methods: [ 'GET', 'POST', 'PUT', 'DELETE' ],
    credentials: true, // i.e., Access-Control-Allow-Credentials
    origin: 'http://localhost:8080', // i.e., Access-Control-Allow-Origin, see https://goo.gl/mSvVC9 for how to pluralize
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// DB Setup
mongoose.connect('mongodb://localhost:27017/auth'); // second auth is the db name. not sure what the first one is?

// App Setup
const app = express();

// This is what we call middleware in Express
app.use(morgan('combined')); // any incoming request will be passed into morgan (a logging framework for debugging)...
app.use(cors(corsOptions));
app.use(bodyParser.json({ type: '*/*' })); // and also into bodyParser (used to parse incoming requests; specifically, into JSON)

router(app);

// Server Setup
const port = process.env.PORT || 3090;

// http is a native node lib. for working very low level with
// http requests that are incoming. this line says to forward any
// http requests to our express application.
const server = http.createServer(app);
server.listen(port); // tell server to listen to the port we declared above
console.log('Server listening on:', port);
