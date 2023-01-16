const express = require('express')
const router = express.Router();

const {Login, Signup,Email} = require('../controllers/userController');

router.post('/login', Login)
router.post('/signup', Signup)




module.exports = router;