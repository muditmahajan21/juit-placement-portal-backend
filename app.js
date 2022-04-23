const express = require('express')
const app = express()
const logger = require("morgan");

const userRouter = require('./controllers/users')
const placementUpdatesRouter = require('./controllers/placementUpdates')
const loginRouter = require('./controllers/login')
const companyDataRouter = require('./controllers/companyData')

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
app.use(logger('dev'))

app.use('/users', userRouter)
app.use('/placementUpdates', placementUpdatesRouter)
app.use('/login', loginRouter)
app.use('/companyData', companyDataRouter)

app.use('*', (request, response) => {
    response.json({message: 'Not Valid Url'})
})

module.exports = app