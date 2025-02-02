const express = require('express');
const { saveMonitor, getLastMonitors, generateReport } = require('../controllers/Monitor');
const router = express.Router();

router.post('/', saveMonitor);
router.post('/report', generateReport);
router.get('/:dni', getLastMonitors);

module.exports = router;