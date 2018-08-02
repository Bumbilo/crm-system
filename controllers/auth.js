const User = require('../models/User');

module.exports.login = (req, res) => {
    res.status(200).json({
        login: {
            email: req.body.email,
            password: req.body.password
        }
    })
}

module.exports.register = async (req, res) => {
    const candidate = await User.findOne({email: req.body.email})

    if(candidate) {
        // User is created (return error)
        res.status(409).json({
            message: 'Такой email уже занят!'
        })
    } else {
        // Create user
    }
}