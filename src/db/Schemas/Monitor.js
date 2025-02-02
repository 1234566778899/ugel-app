const { Schema, model } = require('mongoose');

const MonitorSchema = Schema({
    user: {
        name: String,
        lname: String,
        cargo: String,
        dni: String
    },
    teacher: {
        code: String,
        name: String,
    },
    school: {
        code: String,
        name: String,
        province: String,
        district: String
    },
    grade: String,
    area: {
        code: String,
        name: String
    },
    section: String,
    level: String,
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
    startAt: Date
}, {
    timestamps: true
})

module.exports = model('monitor', MonitorSchema)