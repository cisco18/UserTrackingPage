const express = require('express');
const router = express.Router();
const {updateScrolled} = require('../controllers/updateUser');

router.put('/update/', updateScrolled);

module.exports = router;
