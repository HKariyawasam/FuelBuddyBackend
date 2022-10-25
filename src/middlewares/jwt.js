const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

//referenced the following code snippetfrom https://betterprogramming.pub/build-an-authentication-api-with-node-express-and-mongodb-112b448c21f2

// get password vars from .env file
dotenv.config();

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

function generateAccessToken(email) {
    return jwt.sign({ data: email }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
}

module.exports = {
    authenticateToken,
    generateAccessToken
}



