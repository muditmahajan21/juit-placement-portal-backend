const verifyEmailRouter = require('express').Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const user = require('../models/user')

verifyEmailRouter.get('/', async (request, response) => {
    try {
        token = request.query.id
        if(token) {
            jwt.verify(token, process.env.SECRET, async (error, decodedData) => {
                if(error) {
                    return response.status(400).json({
                        error: 'Invalid token'
                    })
                }

                const user = await User.findOne({"token": token})
                if(!user) {
                    return response.status(400).json({
                        error: 'User with this token does not exist'
                    })
                }
                user.verified = true
                user.save()
                return response.status(200).json({
                    message: 'Your email has been verified successfully'
                })
            })
        }
    } catch (error) {
        console.log(error)
        response.status(500).json({
            error: 'Server error'
        })
    }
})

module.exports = verifyEmailRouter