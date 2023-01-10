const express = require('express')
const router = express.Router();

const { createClass, AddUserToWaitingList, GetClassData,RemoveUserFromDate, AddMeeting, GetDateData} = require('../controllers/classController');

router.post('/addclass', createClass)
router.post('/addusertoclass', AddUserToWaitingList) //check if exist else push to waiting list
router.post('/getclassdata', GetClassData) // get all the free class time for date...
router.post('/addMeeting', AddMeeting) // add meeting
router.post('/removeuser', RemoveUserFromDate)//remove user from waiting list
router.post("/getdatedata",GetDateData) //get all data for cirten date by class




module.exports = router;