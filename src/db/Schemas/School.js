const { Schema, model } = require('mongoose');

const SchoolSchema = Schema({
    code: String,
    name: String,
    district: String,
    province: String
}, {
    timestamps: true
})

module.exports = model('school', SchoolSchema)