const express = require('express')
const router = express.Router();

const { createClass, AddUserToWatingList, GetClassData,RemoveUserFromDate, AddMeeting} = require('../controllers/classController');

router.post('/addclass', createClass)
router.post('/addusertoclass', AddUserToWatingList) //check if exist else push to waiting list
router.post('/getclassdata', GetClassData) // get all the free class time for date...
router.post('/addMeeting', AddMeeting) // add meeting
router.post('/removeuser', RemoveUserFromDate)//remove user from waiting list




module.exports = router;