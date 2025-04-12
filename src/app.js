const express = require('express')
const app = express();
const cors = require('cors')
require('./db/index')
app.use(express.json());
const port = process.env.PORT || 4000;

app.use(cors());

app.get('/', (req, res) => {
    res.send('v.1.0.14')
})

app.use('/api/users', require('./routes/User'));
app.use('/api/visits', require('./routes/Visit'));
app.use('/api/schools', require('./routes/School'));
app.use('/api/monitors', require('./routes/Monitor'));
app.use('/api/teachers', require('./routes/Teacher'));

app.listen(port, () => {
    console.log('server running on port: ' + port);
})