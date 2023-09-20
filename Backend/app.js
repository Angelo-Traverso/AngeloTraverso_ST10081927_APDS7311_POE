require('dotenv').config();
const express = require('express')
const app = express();
const https = require('https');
const fs = require('fs');
const cors = require('cors');
const hsts = require('./middleware/hsts');
const mongoose = require('mongoose');

// DB
mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log('Db connected...'));

// Middleware

app.use(cors({ origin: 'https://localhost:3000', optionsSuccessStatus: 200 }));
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







// const express = require('express')

// const app = express()

// const urlprefix = '/api'

// const mongoose = require('mongoose')

// const Fruit = require('./models/fruits')

// const fs = require('fs')

// const cert = fs.readFileSync('keys/certificate.pem')

// const options = {

//     server: { sslCA: cert }
// };

// app.use(express.json())

// const connectionString = 'mongodb+srv://st10081927:wVC6u6ybtrtOvhcG@cluster0.tqg6wuh.mongodb.net/?retryWrites=true&w=majority';

// const fruitRoutes = require('./routes/fruit')
// const userRoutes = require('./routes/user')

// app.use((reg,res,next)=>
// {
//     res.setHeader('Access-Control-Allow-Origin', '*')
//     res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Reuested-With,Content-Type,Accept,Authorization')
//     res.setHeader('Access-Control-Allow-Methods', '*')
//     next()
// })

// mongoose.connect(connectionString)
//     .then(() => {
//         console.log('Connected :=)')
//     })
//     .catch(() => {
//         console.log('Not Connected :=(')
//     }, options);



// app.use(urlprefix + '/fruits', fruitRoutes)
// app.use(urlprefix + 'user', userRoutes)

// module.exports = app;











// //Contains endpoints

// const express = require('express');
// const app = express();
// //Added
// const urlprefix = '/api'
// // // // ---------------------------------------------------------------//
// // // // Is performed on each HTTP GET Request  with path ('/') relative to site root
// // // app.get('/', (req, res)=>{

// // //     // Response.send - sends response after request is made
// // //     res.send('Hello World Express')
// // // });

// // // app.get('/test', (req,res)=>{

// // //     res.send('Hello World Express /test')
// // // });
// // // // ---------------------------------------------------------------//


// // app.get(urlprefix + '/', (req, res) => {

// // res.send("Hello world!")

// // });

// // app.get(urlprefix + '/orders', (req, res) => {

// //     const orders = [
// //         {
// //             id:"1",
// //             name:"Orange"

// //         },
// //         {
// //             id:"2",
// //             name:"Banana"
// //         },
// //         {
// //             id:"3",
// //             name:"Pear"
// //         }
// //     ]
// //     res.json(

// //         {
// //             message:"Fruits",
// //             orders: orders

// //         }
// //     )
// // });

// //app.get()


// /* exporting module so that it can be used
//    from other parts of the application*/
// module.exports = app;