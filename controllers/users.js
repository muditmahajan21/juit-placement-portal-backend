const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')

userRouter.get('/', async (request, response) => {
    try {
        const users = await User.find({})
        response.json(users.map(user => user.toJSON()))
    } catch (error) {
        console.log(error)
        response.status(500).json({
            error: 'Server error'
        })
    }
})

userRouter.get('/:id', async (request, response) => {
    try {
        const user = await User.findById(request.params.id)
        response.json(user.toJSON())
    } catch (error) {
        console.log(error)
        response.status(500).json({
            error: 'Server error'
        })
    }
})

userRouter.post('/', async (request, response) => {
    try {
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
            rollno,
            token: ''
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
        
        user.save()

        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.GOOGLE_EMAIL,
                pass: process.env.GOOGLE_PASSWORD
            }
        })

        const data = ({
            from: 'juit.placement.portal@gmail.com',
            to: email,
            subject: 'Email Verification for JUIT Placement Portal',
            html: `
            <h3>PLease click the link below to verify your email <\h3>
            <a href="http://localhost:3001/verify-email?id=${token}">Verify Email</a>
            `
        })

        let info = transporter.sendMail(data, (error, body) => {
            if (error) {
                return response.status(400).json({
                    error: error.message
                })
            }
            
            return response.status(200).json({
                message: 'Verification link sent successfully'
            })
        })

        response.json(user) 
    } catch (error) {
        console.log(error)
        response.status(500).json({
            error: 'Server error'
        })
    }
})

userRouter.delete('/:id', async(request, response) => {
    try {
        await User.findByIdAndRemove(request.params.id)
        response.status(204).end() 
    } catch (error) {
        console.log(error)
        response.status(500).json({
            error: 'Server error'
        })
    }
})

module.exports = userRouter