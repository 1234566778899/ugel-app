const { Schema, model } = require('mongoose');

const SchoolSchema = Schema({
    code: String,
    name: String,
    levels: [String],
    district: String,
    place: String,
    teachers: [
        {
            name: String,
            dni: String,
            cellphone: String,
            email: String,
            job: String,
            condition: String,
        }
    ]
}, {
    timestamps: true
})

module.exports = model('school', SchoolSchema)