const express = require('express');
const { saveVisit, getQuantity, getLastQuantity, getLastVisits } = require('../controllers/Visit');
const router = express.Router();

router.post('/', saveVisit);
router.get('/quantity/:dni', getQuantity);
router.get('/last/:dni', getLastQuantity);
router.get('/:dni', getLastVisits);

module.exports = router;