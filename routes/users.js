const app = module.exports = require('express')();
const path = require('path')
// const { loggedIn } = require('app/auth');
// const { changePassword } = require('app/actions').users;

// app.patch('/change-password', loggedIn, (req, res) => {
//     changePassword(req.body, req.user)
//         .then(() => res.send({ msg: 'Password changed' }))
//         .catch((err) => {
//             res.status(400).send({ msg: 'Change password failed', err });
//         })
//         ;
// });
const Joi = require('joi');
// schema used for data validation for our todo document
const schema = Joi.object().keys({
    todo: Joi.string().required()
});

const db = require('../db/db')

const collection = "todo"

app.get('/', (req, res) => {
    console.log(__dirname)
    res.sendFile(path.join(__dirname, 'index.html'))
})

// với url /getTodos, get collection
app.get('/list', (req, res) => {
    db.getDB().collection(collection).find({}).toArray((err, documents) => {
        if (err)
            console.log(err)
        else {
            res.json(documents) // what it does
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
            // console.log(error)
            error.status = 400;
            next(err);
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