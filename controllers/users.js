const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')

userRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users.map(user => user.toJSON()))
})

userRouter.get('/:id', async (request, response) => {
    const user = await User.findById(request.params.id)
    response.json(user.toJSON())
})

userRouter.post('/', async (request, response) => {
    const { name, password, email, rollno } = request.body
    
    if(!name || !password || !email || !rollno) {
        return response.status(400).json({ error: 'name, password, email and rollno are required' })
    }

    if(password.length < 3) {
        return response.status(400).json({ error: 'password must be at least 3 characters long' })
    }

    const existingUser = await User.find({ rollno })
    if(existingUser.length) {
        return response.status(400).json({ error: 'user with this rollno already exists' })
    }

    const saltRounds = 10

    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = await User.create ({
        name,
        passwordHash,
        email,
        rollno
    })

    const userForToken = {
        email: user.email,
        id: user.id,
    }

    const token = jwt.sign(
        userForToken, 
        process.env.SECRET, 
        {expiresIn: "2h"}
    )

    user.token = token

    response.json(user)
})

userRouter.delete('/:id', async(request, response) => {
    await User.findByIdAndRemove(request.params.id)
    response.status(204).end() 
})

module.exports = userRouter