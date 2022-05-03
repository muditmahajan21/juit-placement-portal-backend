const express = require('express')
const app = express()
const logger = require("morgan");
const cors = require('cors');

const userRouter = require('./controllers/users')
const placementUpdatesRouter = require('./controllers/placementUpdates')
const loginRouter = require('./controllers/login')
const companyDataRouter = require('./controllers/companyData')
const resetPasswordRouter = require('./controllers/resetPassword')
const updatePasswordRouter = require('./controllers/updatePassword')
const verifyEmailRouter = require('./controllers/verifyEmail')

const auth = require('./middleware/auth')

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
app.use(cors())
app.use(logger('dev'))

app.use('/login', loginRouter)
app.use('/users', userRouter)
app.use('/reset-password', resetPasswordRouter)
app.use('/update-password', updatePasswordRouter)
// app.use(auth)

app.use('/placementUpdates', placementUpdatesRouter)
app.use('/companyData', companyDataRouter)
app.use('/verify-email', verifyEmailRouter)

app.use('*', (request, response) => {
    response.json({message: 'Not Valid Url'})
})

module.exports = app