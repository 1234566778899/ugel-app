const Teacher = require('../db/Schemas/School');

const getTeachers = async (req, res) => {
    try {
        const data = await Teacher.find();
        return res.status(200).send(data);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: 'Error on server' });
    }
}

module.exports = {
    getTeachers
}