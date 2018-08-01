module.exports.login = (req, res) => {
    res.status(200).json({
        login: 'login from controlller'
    })
}


module.exports.register = (req, res) => {
    res.status(200).json({
        login: 'register from controlller'
    })
}

