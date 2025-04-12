const Monitor = require('../db/Schemas/Monitor');

const saveMonitor = async (req, res) => {
    try {
        const { teacher, user, school, area, grade, section, level, performances, startAt, visit } = req.body;
        await Monitor.create({ teacher, user, school, area, grade, performances, section, level, startAt, visit });
        return res.status(200).send({ ok: 'Successful' })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: 'Error on server' });
    }
}
const getLastMonitors = async (req, res) => {
    try {
        const { dni } = req.params;
        if (dni && dni !== 'undefined') {
            const monitors = await Monitor.find({ 'user.dni': dni, isDeleted: false }).sort({ _id: -1 }).limit(20);
            return res.status(200).send(monitors)
        }
        const monitors = await Monitor.find({ isDeleted: false }).sort({ _id: -1 }).limit(20);
        return res.status(200).send(monitors)
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: 'Error on server' });
    }
}

const generateReport = async (req, res) => {
    try {
        const { district, startDate, endDate, ie, teacher } = req.body;
        const query = {};
        if (district) {
            query['school.district'] = district;
        }
        if (startDate && endDate) {
            query['createdAt'] = {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            }
        }
        if (ie.name) {
            query['school.name'] = ie.name;
            query['school.code'] = ie.code;
        }
        if (teacher) {
            query['teacher.dni'] = teacher;
        }
        const monitors = await Monitor.aggregate([
            {
                "$match": {
                    ...query,
                    isDeleted: false
                }
            },
            {
                "$unwind": "$performances"
            },
            {
                "$unwind": "$performances.aspectos"
            },
            {
                "$group": {
                    "_id": {
                        "desempenio": "$performances.desempenio",
                        "puntos": "$performances.aspectos.points"
                    },
                    "cantidad": { "$sum": 1 }
                }
            },
            {
                "$group": {
                    "_id": "$_id.desempenio",
                    "total": { "$sum": "$cantidad" },
                    "conteo": {
                        "$push": {
                            "puntos": "$_id.puntos",
                            "cantidad": "$cantidad"
                        }
                    }
                }
            },
            {
                "$project": {
                    "_id": 0,
                    "desempenio": "$_id",
                    "total": 1,
                    "conteo": {
                        "$arrayToObject": {
                            "$concatArrays": [
                                [
                                    { "k": "1", "v": 0 },
                                    { "k": "2", "v": 0 },
                                    { "k": "3", "v": 0 },
                                    { "k": "4", "v": 0 }
                                ],
                                {
                                    "$map": {
                                        "input": "$conteo",
                                        "as": "c",
                                        "in": {
                                            "k": { "$toString": "$$c.puntos" },
                                            "v": "$$c.cantidad"
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            },
            {
                "$project": {
                    "desempenio": 1,
                    "total": 1,
                    "conteo": 1,
                    "porcentaje": {
                        "$arrayToObject": {
                            "$map": {
                                "input": { "$objectToArray": "$conteo" },
                                "as": "c",
                                "in": {
                                    "k": "$$c.k",
                                    "v": {
                                        "$multiply": [
                                            { "$divide": ["$$c.v", "$total"] },
                                            100
                                        ]
                                    }
                                }
                            }
                        }
                    }
                }
            },
            {
                $sort: {
                    desempenio: 1
                }
            }
        ]);
        return res.status(200).send(monitors);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: 'Error on server' });
    }
};

const deleteMonitor = async (req, res) => {
    try {
        const { id } = req.params;
        const monitor = await Monitor.findOne({ _id: id });
        monitor.isDeleted = true;
        await monitor.save();
        return res.status(200).send({ ok: 'Successfull' });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: 'Error on server' });
    }
}

const editMonitor = async (req, res) => {
    try {
        const { id } = req.params;
        const { performances } = req.body;
        const monitor = await Monitor.findOne({ _id: id });
        monitor.performances = performances;
        await monitor.save();
        return res.status(200).send({ ok: 'Successfull' });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: 'Error on server' });
    }
}
module.exports = {
    saveMonitor,
    getLastMonitors,
    generateReport,
    deleteMonitor,
    editMonitor
}