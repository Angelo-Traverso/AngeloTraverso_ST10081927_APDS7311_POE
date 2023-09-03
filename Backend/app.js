//Contains endpoints

const express = require('express');
const app = express();
//Added
const urlprefix = '/api'
// // ---------------------------------------------------------------//
// // Is performed on each HTTP GET Request  with path ('/') relative to site root
// app.get('/', (req, res)=>{

//     // Response.send - sends response after request is made
//     res.send('Hello World Express')
// });

// app.get('/test', (req,res)=>{

//     res.send('Hello World Express /test')
// });
// // ---------------------------------------------------------------//


app.get(urlprefix + '/', (req, res) => {

res.send("Hello world!")

});

app.get(urlprefix + '/orders', (req, res) => {

    const orders = [
        {
            id:"1",
            name:"Orange"

        },
        {
            id:"2",
            name:"Banana"
        },
        {
            id:"3",
            name:"Pear"
        }
    ]
    res.json(

        {
            message:"Fruits",
            orders: orders

        }
    )
});

//app.get()


/* exporting module so that it can be used
   from other parts of the application*/
module.exports = app;