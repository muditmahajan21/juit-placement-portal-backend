const jwt = require('jsonwebtoken')
const config = process.env

const verifyToken = (request, response, next) => {
    const token = request.body.token || request.query.token  || request.headers["x-access-token"]

    if(!token) {
        return response.status(403).send("A token is needed for auth")
    }
    try {
        const decodedToken = jwt.verify(token, config.SECRET)
        request.user = decodedToken
    } catch (error) {
        return response.status(401).send("Invalid Token")
    }
    return next()
}

module.exports = verifyToken