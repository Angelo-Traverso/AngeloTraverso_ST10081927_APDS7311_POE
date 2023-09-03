const express = require('express');
const app = express();

app.get('/', (req, res)=>{

    res.send('Hello World Express')
});

app.get('/test', (req,res)=>{

    res.send('Hello World Express /test')
});

module.exports = app;