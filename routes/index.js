const app = module.exports = require('express')()
const path = require('path')

app.get('/', (req, res) => {
    console.log(__dirname)
    res.sendFile(path.join(__dirname, 'users.html'))
})

// app.get('/', (req, res) => {
//     console.log(__dirname)
//     res.send({ msg: 'Unbelievable!' })
// })

// app.use('/auth', require('./auth'))
app.use('/users', require('./users'))

app.all('*', (req, res) => {
    res.status(404).send({ msg: 'Not found!' })
})