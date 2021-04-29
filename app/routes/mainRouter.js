const mainRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const {SECRET} = require('../../config');

// Public
mainRouter.use('/auth', require('./auth'));

// Middleware for protected routes
mainRouter.use((req, res, next) => {

    let token = req.headers['token'];
    if(token) {
        jwt.verify(token, SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({
                    success: false,
                    message: 'Wrong token'
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(403).json({
            success: false,
            message: 'No token'
        });
    }
})

// Protected
mainRouter.use('/students', require('./students'));
mainRouter.use('/lessons', require('./lessons'));
mainRouter.use('/scores', require('./scores'));
mainRouter.use('/users', require('./users'));

mainRouter.get('*', (req, res) => res.status(404).json({message: 'Wrong API call'}));

module.exports = mainRouter;
