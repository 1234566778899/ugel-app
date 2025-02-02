const { Schema, model } = require('mongoose');

const VisitSchema = Schema({
    user: {
        name: String,
        lname: String,
        cargo: String,
        dni: String
    },
    school: {
        code: String,
        name: String,
        province: String,
        district: String
    },
    monitors: Number
}, {
    timestamps: true
})

module.exports = model('visit', VisitSchema)