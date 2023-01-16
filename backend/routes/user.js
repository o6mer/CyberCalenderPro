const express = require('express')
const router = express.Router();

const {Login, Signup,ChangeSpecs} = require('../controllers/userController');

router.post('/login', Login)
router.post('/signup', Signup)
router.post('/changespecs', ChangeSpecs)



module.exports = router;