const { Schema, model } = require('mongoose');

const MonitorSchema = Schema({
    user: {
        fullname: String,
        job: String,
        dni: String,
        email_personal: String,
        cellphone: String,
        email_ie: String
    },
    teacher: {
        code: String,
        name: String,
        dni: String,
        job: String,
        condition: String,
        cellphone: String
    },
    school: {
        code: String,
        name: String,
        place: String,
        district: String
    },
    grade: String,
    area: String,
    section: String,
    level: String,
    weight: Number,
    performances: [
        {
            desempenio: String,
            aspectos: [
                {
                    name: String,
                    evidencia: String,
                    points: Number
                }
            ]
        }
    ],
    visit: { type: Schema.ObjectId, ref: 'visit' },
    startAt: Date,
    isDeleted: { type: Boolean, default: false },
    type: String,
}, {
    timestamps: true
})

module.exports = model('monitor', MonitorSchema)