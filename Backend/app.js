require('dotenv').config();
const express = require('express')
const app = express();
const https = require('https');
const fs = require('fs');
const cors = require('cors');
const hsts = require('./middleware/hsts');
const mongoose = require('mongoose');
const path = require('path')
var rfs = require('rotating-file-stream')
const helmet = require('helmet');
const morgan = require('morgan');

// create a rotating write stream
const accessLogStream = rfs.createStream('access.log', {
    interval: '1d', // rotate daily
    path: path.join(__dirname, 'log')
});
// setup the logger
app.use(morgan('combined', { stream: accessLogStream }))
// Helmet implementation
app.use(helmet());
// DB
mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log('Db connected...'));

// Middleware
app.use(cors({ origin: 'http://localhost:4200', optionsSuccessStatus: 200 }));
app.use(express.json());
app.use(hsts);

// Implementing Cors
app.use((reg, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,Authorization');
    res.setHeader('Access-Control-Allow-Methods', '*');
    next();
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/user'));
app.use('/api/posts', require('./routes/posts'));

// Listen
https
    .createServer(
        {
            key: fs.readFileSync('./keys/privatekey.pem'),
            cert: fs.readFileSync('./keys/certificate.pem'),
            passphrase: 'apds',
        },
        app

    )
    .listen(3000);