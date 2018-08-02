const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const User = require('../models/User');

module.exports.login = async (req, res) => {
    const candidate = await User.findOne({
        email: req.body.email
    })
    if (candidate) {
        //  Check password, user is 
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password);
        if (passwordResult) {
            // Generate token passwords are equel
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id
            }, keys.jwt, {
                expiresIn: 60 * 60
            });
            // Response success(send token)
            res.status(200).json({
                token: `Bearer ${token}`
            })
        } else {
            // Passwords aren't equel
            res.status(401).json({
                message: 'Пароли не своподают!'
            })
        }
    } else {
        // User isn't
        res.status(404).json({
            message: 'Пользователь с таким email не найден!'
        })
    }
}

module.exports.register = async (req, res) => {
    const candidate = await User.findOne({
        email: req.body.email
    });
    if (candidate) {
        // User is created (return error)
        res.status(409).json({
            message: 'Такой email уже занят!'
        })
    } else {
        // Generate hash
        const salt = bcrypt.genSaltSync(10)
        const password = req.body.password
        // Create user
        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(password, salt)
        })
        // Save user in DB
        try {
            await user.save();
            res.status(201).json(user)
        } catch (error) {
            console.log(error);
        }
    }
}