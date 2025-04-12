const { Schema, model } = require('mongoose');

const TeacherSchema = Schema({
    name: String,
    dni: String,
    cellphone: String,
    email: String,
    job: String,
    condition: String,
    school: { type: Schema.Types.ObjectId, ref: 'school' }
}, {
    timestamps: true
})

module.exports = model('teacher', TeacherSchema)