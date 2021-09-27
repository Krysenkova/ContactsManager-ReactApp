const mongoose = require("mongoose");
const Schema = mongoose.Schema

const userSchema = new Schema({
    user_id: {type: String, required: true},
    password: {type: String, required: true},
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    is_admin: {type: Boolean, required: true}
})
module.exports = mongoose.model('User', userSchema)