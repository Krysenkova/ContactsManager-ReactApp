const User = require('../models/user_model')
const HttpError = require("../models/http_error");

//works
exports.getUsers = async function (req, res, next) {
    let users = User.find({}, '-password').exec()
    users.then(result => this.setState(result)).catch(err => console.log("Failed" + err))
    res.json({users: (await users).map(u => u.toObject())})

}

//works
exports.login = async function (req, res, next) {
    const {
        user_id, password
    } = req.body;
    let user

    try {
        user = await User.findOne({user_id: user_id})
    } catch (err) {
        const error = new HttpError("Login failed", 500)
        return next(error)
    }

    if (!user || user.password !== password) {
        const error = new HttpError("Invalid Login", 500)
        console.log("Invalid login")
        return next(error)
    } else
        res.json({message: 'Logged in!'})
}

exports.findUserByName = async function (req, res, next) {
    const userName = req.params.user_id;
    console.log("UN: " + userName)
    let user;
    try {
        user = await User.findOne({user_id: userName}).exec()
    } catch (err) {
        console.log("User is not found")
    }
    res.json({user: user.toObject()});
}