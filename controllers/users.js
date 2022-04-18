const userRouter = require('express').Router()

userRouter.get('/', async (req, res) => {
    res.json({message: 'Hello World'})
})

userRouter.get('*', async (req, res) => {
    res.json({message: 'Not Valid Url'})
})

module.exports = userRouter