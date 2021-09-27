const mongoose = require('mongoose')

const Schema = mongoose.Schema

const contactSchema = new Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    street: {type: String, required: true},
    zip: {type: String, required: true},
    city: {type: String, required: true},
    state: {type: String, required: true},
    country: {type: String, required: true},
    is_private: {type: Boolean, required: true},
    owner: {type: String, required: true},
    lon: {type: String, required: true},
    lat: {type: String, required: true}
})

module.exports = mongoose.model('Contact', contactSchema)