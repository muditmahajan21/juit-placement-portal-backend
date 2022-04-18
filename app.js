const express = require('express')
const app = express()
const userRouter = require('./controllers/users')
const config = require('./utils/config');
const mongoose = require('mongoose')

const url = config.MONGODB_URI
console.log('Connecting to MongoDB')

mongoose
    .connect(url)
    .then((res) => {
        console.log('Connected to MongoDB')
    })
    .catch((error) => {
        console.log('Error connecting to MongoDB:', error.message)
    })

app.use(express.json())

app.use('/users', userRouter)

module.exports = app