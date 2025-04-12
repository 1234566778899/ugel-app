const express = require('express');
const { getSchools } = require('../controllers/School');
const router = express.Router();

router.get('/', getSchools);

module.exports = router;