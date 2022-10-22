const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();
const unless = require('express-unless')
const auth = require('./src/middlewares/jwt')
const errors = require('./src/middlewares/errorHandler')

const port = process.env.PORT || 4000;
const URL = process.env.URL;

app.use(express.urlencoded({ extended: false }))
app.use(cors({ // enables CORS 
    credentials: true, 
    origin: true, 
    methods: ['GET','POST','PUT','DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'] 
  }));
app.use(express.json());

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const server = app.listen(port, () => {
    console.log(`Server Is Running on Port: ${port}`);
});

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("Mongodb Connection success!");
})

// auth.authenticateToken.unless = unless
// app.use(auth.authenticateToken.unless({
//     path: [
//         { url: '/api/v1/users/login', methods: ['POST'] },
//         { url: '/api/v1/users/register', methods: ['POST'] }
//     ]
// }))

//users route
let users = require('./src/routes/UserRoutes')
app.use('/api/v1/users', users);
app.use(errors.errorHandler);

//station route
let stations = require('./src/routes/StationRoutes')
app.use('/api/v1/stations', stations);

//station route
let queues = require('./src/routes/QueueRoutes')
app.use('/api/v1/queues', queues);
