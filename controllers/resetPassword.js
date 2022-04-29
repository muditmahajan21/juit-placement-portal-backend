const resettPasswordRouter = require('express').Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const nodeMailer = require('nodemailer')

resettPasswordRouter.put('/', async (request, response) => {
    try {
        const body = request.body
        const email = body.email

        User.findOne({email}, (error, user) => {
            if (error || !user) {
                return response.status(400).json({
                    error: "No user with this email id exists"
                })
            }

            const userForToken = {
                email: user.email,
                id: user._id,
            }

            const token = jwt.sign(
                userForToken,
                process.env.SECRET,
                {
                    expiresIn: "15m"
                }
            )

            let transporter = nodeMailer.createTransport({
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
                subject: 'Rest Password Link for JUIT Placement Portal',
                html: `
                <h3> Please click the link below to reset your password <\h3>
                <a href="http://localhost:3001/update-password/${token}">Reset Password</a>
            `
            })

            return user.updateOne({resetLink: token}, (error, user) => {
                if (error) {
                    return response.status(400).json({
                        error: 'Reset password link error'
                    })
                } else {
                    transporter.sendMail(data, (error, body) => {
                        if (error) {
                            return response.status(400).json({
                                error: error.message
                            })
                        }

                        return response.status(200).json({
                            message: 'Reset password link sent successfully'
                        })
                    })
                }
            })
        })
    } catch (error) {
        response.status(500).json({
            error: 'Server error'
        })
    }
})

module.exports = resettPasswordRouter