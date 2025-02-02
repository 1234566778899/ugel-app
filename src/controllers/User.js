const User = require("../db/Schemas/User");

const login = async (req, res) => {
    try {

        const { username, password } = req.body;
        const user = await User.findOne({ username, password });
        if (!user) {
            return res.status(401).send({ error: 'El nombre de usuario o contraseña son incorrectas' });
        }
        return res.status(200).send(user);
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    login
}

