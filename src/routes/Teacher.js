const express = require('express');
const { getTeachers } = require('../controllers/Teacher');
const router = express.Router();

router.get('/', getTeachers);

module.exports = router;