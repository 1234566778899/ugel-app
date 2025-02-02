const { Schema, model } = require('mongoose');

const TeacherSchema = Schema({
    name: String,
    lname: String,
    dni: String
}, {
    timestamps: true
})

module.exports = model('teacher', TeacherSchema)