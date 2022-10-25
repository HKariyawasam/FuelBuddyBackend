//referenced the following code snippet from https://betterprogramming.pub/build-an-authentication-api-with-node-express-and-mongodb-112b448c21f2

function errorHandler(err, req, res, next) {
    if (typeof (err) === 'string') {
        // custom application error
        return res.status(400).json({ message: err });
    }

    if (err.name === 'ValidationError') {
        // mongoose validation error
        return res.status(400).json({ message: err.message });
    }

    if (err.name === 'UnauthorizedError') {
        // jwt authentication error
        return res.status(401).json({ message: 'Token not valid' });
    }

    // default to 500 server error
    return res.status(500).json({ message: err.message });
}

module.exports = {
    errorHandler
}