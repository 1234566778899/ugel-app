const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    username: String,
    password: String,
    name: String,
    lname: String,
    cargo: String,
    dni: String,
    celular: String
}, {
    timestamps: true
})

module.exports = model('user', UserSchema)