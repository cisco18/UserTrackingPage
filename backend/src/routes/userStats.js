const express = require('express');
const router = express.Router();
const {getStats} = require('../controllers/userStats');

router.get('/all/', getStats);


module.exports = router;
