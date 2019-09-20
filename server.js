const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const path = require('path')
const Joi = require('joi');
const db = require('./db/db')

// schema used for data validation for our todo document
const schema = Joi.object().keys({
    todo: Joi.string().required()
});

const routes = require('./routes');

app.use(bodyParser.json());

// Middleware for handling Error
// Sends Error Response Back to User
app.use((err, req, res, next) => {
    res.status(err.status).json({
        error: {
            msg: err.message
        }
    });
})

app.use(routes)

db.connect((err) => {
    if (err) {
        console.log(err)
        console.log('unable to connect to database')
        process.exit(1)
    }
    else {
        app.listen(3000, () => {
            console.log('connected to database, app listening on port 3000')
        })
    }
})