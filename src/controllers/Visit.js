const Monitor = require('../db/Schemas/Monitor');
const School = require('../db/Schemas/School');
const Teacher = require('../db/Schemas/Teacher');
const Visit = require('../db/Schemas/Visit')

const saveVisit = async (req, res) => {
    try {
        const { user, school } = req.body;
        // const [lastVisit] = await Visit.find({ 'user.dni': user.dni, isDeleted: false }).sort({ _id: -1 }).limit(1);
        // if (lastVisit) {
        //     const count = await Monitor.count({ visit: lastVisit._id });
        //     if (count <= 0) {
        //         return res.status(400).send({ error: 'La última visita no tiene monitoreo' });
        //     }
        // }
        await Visit.create({ user, school });
        return res.status(200).send({ ok: 'Successful' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getQuantity = async (req, res) => {
    try {
        const { dni } = req.params;
        if (dni && dni !== 'undefined') {
            const [countVisit, countMonitor] = await Promise.all([
                Visit.count({ "user.dni": dni, isDeleted: false }),
                Monitor.count({ "user.dni": dni, isDeleted: false })
            ]);
            return res.status(200).send({ visits: countVisit, monitors: countMonitor });
        }
        const [countVisit, countMonitor] = await Promise.all([
            Visit.count({ isDeleted: false }),
            Monitor.count({ isDeleted: false })
        ]);
        return res.status(200).send({ visits: countVisit, monitors: countMonitor });
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getLastVisit = async (req, res) => {
    try {
        const { dni } = req.params;
        if (dni && dni !== 'undefined') {
            const [visit] = await Visit.find({ "user.dni": dni, isDeleted: false }).sort({ _id: -1 }).limit(1);
            return res.status(200).send(visit);
        }
        const [visit] = await Visit.find({ isDeleted: false }).sort({ _id: -1 }).limit(1);
        return res.status(200).send(visit);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: 'Internal Server Error' });
    }
}
const getLastVisits = async (req, res) => {
    try {
        const { dni } = req.params;
        if (dni !== 'undefined') {
            const visits = await Visit.find({ 'user.dni': dni, isDeleted: false }).sort({ _id: -1 }).limit(20);
            return res.status(200).send(visits);
        }
        const visits = await Visit.find({ isDeleted: false }).sort({ _id: -1 }).limit(20);
        return res.status(200).send(visits);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: 'Internal Server Error' });
    }
}

const deleteVisit = async (req, res) => {
    try {
        const { id } = req.params;
        const visit = await Visit.findOne({ _id: id });
        visit.isDeleted = true;
        await visit.save();
        return res.status(200).send({ ok: 'Successfull' });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: 'Error on server' });
    }
}
module.exports = {
    saveVisit,
    getQuantity,
    getLastVisit,
    getLastVisits,
    deleteVisit
}