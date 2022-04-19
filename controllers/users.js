const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

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

    const user = new User ({
        name,
        passwordHash,
        email,
        rollno
    })

    const savedUser = await user.save()

    response.json(savedUser)
})

module.exports = userRouter

module.exports = userRouter