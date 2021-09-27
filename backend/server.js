const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

const userRoute = require('./routs/user_route')
const contactRoute = require('./routs/contacts_route')

const app = express();

app.use(bodyParser.json());

app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
    next()
})
app.use('/api/users', userRoute);
app.use('/api/contacts', contactRoute);


/*
app.use((err, req, res, next) => {
    if(res.headerSent) {
        return next(error);
    }
    res.status(error.code||500)
    res.json({message: error.message || 'An unknown error has occurred'})
})
*/

mongoose.connect('mongodb+srv://advis_user:oY7u4H7BOmBF3JBX@cluster0.er59f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
    .then(()=> {app.listen(5000);})
    .catch(err => {console.log(err)})


