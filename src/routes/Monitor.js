const express = require('express');
const { saveMonitor, getLastMonitors, generateReport, deleteMonitor, editMonitor } = require('../controllers/Monitor');
const router = express.Router();

router.post('/', saveMonitor);
router.post('/report', generateReport);
router.get('/:dni', getLastMonitors);
router.delete('/:id', deleteMonitor);
router.put('/:id', editMonitor);

module.exports = router;