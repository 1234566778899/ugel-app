const express = require('express');
const { saveVisit, getQuantity, getLastVisits, getLastVisit, deleteVisit } = require('../controllers/Visit');
const router = express.Router();

router.post('/', saveVisit);
router.get('/quantity/:dni', getQuantity);
router.get('/last/:dni', getLastVisit);
router.get('/:dni', getLastVisits);
router.delete('/:id', deleteVisit);

module.exports = router;