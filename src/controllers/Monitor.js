const moment = require('moment');
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
        const monitors = await Monitor.find({ 'user.dni': dni }).sort({ _id: -1 }).limit(20);
        return res.status(200).send(monitors)
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: 'Error on server' });
    }
}

const generateReport = async (req, res) => {
    try {
        const { dni } = req.body;

        const monitors = await Monitor.find({ 'user.dni': dni });

        if (!monitors.length) {
            return res.status(200).send({ totalReports: 0 });
        }
        const reportData = {
            user: monitors[0].user.name,
            school: monitors[0].school.code,
            totalReports: monitors.length,
            reportsOverTime: monitors.reduce((acc, monitor) => {
                const month = moment(monitor.createdAt).format('MMM');
                acc[month] = (acc[month] || 0) + 1;
                return acc;
            }, {})
        };

        return res.status(200).send(reportData);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: 'Error on server' });
    }
};

module.exports = {
    saveMonitor,
    getLastMonitors,
    generateReport
}