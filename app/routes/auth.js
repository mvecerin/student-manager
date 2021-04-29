const User = require('../models/User');
let router = require('express').Router();
const jwt = require('jsonwebtoken');
const {SECRET} = require('../../config');

function createToken(user) {

    let token = jwt.sign({
        fName: user.fName,
        lName: user.lName,
        email: user.email,
        subject: user.subject,
        _id: user._id
    },
    SECRET,
    {
        expiresIn: 300000
    });
    return token;
}

// POST /api/auth/login
router.post('/login', (req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    User.getUserByEmail(email, (err, user) => {
        if(err) {
            throw err;
        }
        if(!user) {
            return res.status(404).json({success: false, msg: 'User not found'});
        }
        User.comparePassword(password, user.password, (err, result) => {
            if(err) {
                throw err;
            }
            if(result) {
                let token = createToken(user);
                res.json({
                    success: true,
                    token: token
                });
            } else {
                res.status(403).json({success: false, msg: 'Incorrect password'});
            }
        });
    });
});

// POST /api/auth/signup
router.post('/signup', (req,res) => {
    let newUser = new User({
        fName : req.body.fName,
        lName : req.body.lName,
        password : req.body.password,
        email: req.body.email
    });

    User.addUser(newUser, (err, user) => {
        if(err) {
            console.log(err)
            res.json({success: false, msg: 'Signup failed'});
        } else {
            res.json({success: true, insertId: user._id});
        }
    })
});

module.exports = router;