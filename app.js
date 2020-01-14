const express = require('express');
const app = express();
const morgan  = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


//routes 

const AdminRoutes = require('./api/routes/admin');



// mongodb connection
mongoose.connect('mongodb://localhost:27017/BackendV2', {useNewUrlParser: true, useUnifiedTopology: true});

// listengin for an open even when the connection has been set
mongoose.connection.once('open', () => {
    console.log('connected');
}).on('error', (error) => {
    console.log('connection error ', error);
});



// middlewares


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// // Error Handling 

// //handling cors errors cross origni resource sharing 

app.use((req, res, next) =>{
    res.header('Access-Control-Allow-Origin', '*'); // the * allows all site to access the
    res.header(
        'Access-Control-Allow-Headers', 
        'Origin X-Requested-With, Content-Type, Accept, Authorization'
    );
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATHCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});


// handling errors in out requests


// handling other Errors
app.use((error, req, res, next) =>{
    res.status(error.status || 500);  // the status code 500 is an Internal Server Error 
    res.json({
        error: {
            message: error.message
        }
    });
});



// routes

app.use('/admin', AdminRoutes);








module.exports = app;
