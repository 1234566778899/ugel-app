const Monitor = require('../db/Schemas/Monitor');
const Visit = require('../db/Schemas/Visit')

const saveVisit = async (req, res) => {
    try {
        const { user, school } = req.body;
        const [lastVisit] = await Visit.find({ 'user.dni': user.dni }).sort({ _id: -1 }).limit(1);
        if (lastVisit) {
            const count = await Monitor.count({ visit: lastVisit._id });
            if (count <= 0) {
                return res.status(400).send({ error: 'La última visita no tiene monitoreo' });
            }
        }
        await Visit.create({ user, school });
        return res.status(200).send({ ok: 'Successful' });
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getQuantity = async (req, res) => {
    try {
        const { dni } = req.params;
        const [countVisit, countMonitor] = await Promise.all([
            Visit.count({ "user.dni": dni }),
            Monitor.count({ "user.dni": dni })
        ]);
        return res.status(200).send({ visits: countVisit, monitors: countMonitor });
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getLastQuantity = async (req, res) => {
    try {
        const { dni } = req.params;
        const [visit] = await Visit.find({ "user.dni": dni }).sort({ _id: -1 });
        return res.status(200).send(visit);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: 'Internal Server Error' });
    }
}
const getLastVisits = async (req, res) => {
    try {
        const { dni } = req.params;
        const visits = await Visit.find({ 'user.dni': dni }).sort({ _id: -1 }).limit(20);
        return res.status(200).send(visits);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: 'Internal Server Error' });
    }
}
module.exports = {
    saveVisit,
    getQuantity,
    getLastQuantity,
    getLastVisits
}