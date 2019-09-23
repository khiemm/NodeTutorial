const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const path = require('path')
const Joi = require('joi');

const db = require('./db')
const collection = "todo"

// schema used for data validation for our todo document
const schema = Joi.object().keys({
    todo: Joi.string().required()
});

app.use(bodyParser.json());

// read file index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

// với url /getTodos, get collection
app.get('/getTodos', (req, res) => {
    db.getDB().collection(collection).find({}).toArray((err, documents) => {
        if (err)
            console.log(err)
        else {
            console.log(documents)
            res.json(documents) // what it does
        }
    })
})

// call from index.html
app.put('/:id', (req, res, next) => {
    const todoID = req.params.id
    const userInput = req.body

    Joi.validate(userInput, schema, (err, result) => {
        if (err) {
            const error = new Error("Invalid Input");
            error.status = 400;
            next(error);
        }
        else {
            db.getDB().collection(collection).findOneAndUpdate({ _id: db.getPrimaryKey(todoID) }, { $set: { todo: userInput.todo } }, { returnOriginal: false }, (err, result) => {
                if (err) {
                    const error = new Error("Failed to update Todo Document");
                    error.status = 400;
                }
                else {
                    console.log(result)
                    res.json({ result: result, msg: "Successfully updated Todo!!!", error: null });
                }
            })
        }
    })
})

app.post('/', (req, res, next) => {
    // Document to be inserted
    const userInput = req.body;

    // Validate document
    // If document is invalid pass to error middleware
    // else insert document within todo collection
    Joi.validate(userInput, schema, (err, result) => {
        if (err) {
            const error = new Error("Invalid Input");
            error.status = 400;
            next(error);
        }
        else {
            db.getDB().collection(collection).insertOne(userInput, (err, result) => {
                if (err) {
                    const error = new Error("Failed to insert Todo Document");
                    error.status = 400;
                    // next(error);
                }
                else
                    res.json({ result: result, document: result.ops[0], msg: "Successfully inserted Todo!!!", error: null });
            });
        }
    })
});

// Middleware for handling Error
// Sends Error Response Back to User
app.use((err, req, res, next) => {
    res.status(err.status).json({
        error: {
            msg: err.message
        }
    });
})

app.delete('/:id', (req, res) => {
    // Primary Key of Todo Document
    const todoID = req.params.id;
    // Find Document By ID and delete document from record
    db.getDB().collection(collection).findOneAndDelete({ _id: db.getPrimaryKey(todoID) }, (err, result) => {
        if (err)
            console.log(err);
        else
            res.json(result);
    });
});

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