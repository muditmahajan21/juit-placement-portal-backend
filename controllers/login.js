const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
    const { email, password } = request.body

    const currUser = await User.findOne({ email })

    const passwordCorrect = currUser === null ? false : await bcrypt.compare(password, currUser.passwordHash)

    if(!(currUser && passwordCorrect)) {
        return response.status(401).json({
            error: 'invalid username or password'
        })
    }

    const userForToken = {
        email: currUser.email,
        id: currUser._id,
    }

    const token = jwt.sign(
        userForToken, 
        process.env.SECRET, 
        {   
            expiresIn: "2h"
        }
    )
    
    currUser.token = token

    response.status(200).send({
        token,
        email: currUser.email,
        name: currUser.name,
    })
})

module.exports = loginRouter