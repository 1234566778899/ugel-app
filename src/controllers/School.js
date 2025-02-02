const School = require('../db/Schemas/School');

const getSchools = async (req, res) => {
    try {
        const data = await School.find();
        return res.status(200).send(data);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: 'Error on server' });
    }
}

module.exports = {
    getSchools
}