const jwt = require('jsonwebtoken')
const generateToken = (_id)=>{
    const secretKey = global.config.security.secretKey
    const expiresIn = global.config.security.expiresIn
    const token = jwt.sign({
        data: _id,
        exp: expiresIn
    },secretKey)
    return token
}

module.exports = {
    generateToken
}