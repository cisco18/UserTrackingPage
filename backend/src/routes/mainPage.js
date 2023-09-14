const express = require('express');
const router = express.Router();

const {
    handleAuth
} = require('../controllers/auth')


router.use('/', async (req, res, next) => {
    res = await handleAuth(req, res)
    next();
})


router.post('/', (req, res) => {
    if (res.statusCode == 200) {
        return res.json({ info: 'Data from the server fetched correctly' })
    }
    // This will catch all the other codes like 201, to be changed if app is expanded
    return res.json({ error: "Internal server error" });
});




module.exports = router;