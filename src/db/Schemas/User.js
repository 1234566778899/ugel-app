const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    username: String,
    password: String,
    fullname: String,
    email_personal: String,
    email_ie: String,
    job: String,
    dni: String,
    celular: String
}, {
    timestamps: true
})

module.exports = model('user', UserSchema)