const { Schema, model } = require('mongoose');

const VisitSchema = Schema({
    user: {
        name: String,
        dni: String,
    },
    school: {
        code: String,
        name: String,
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
    },
    monitors: Number,
    isDeleted: { type: Boolean, default: false }
}, {
    timestamps: true
})

module.exports = model('visit', VisitSchema)