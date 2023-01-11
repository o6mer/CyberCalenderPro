const express = require('express')
const router = express.Router();

const {
    Approve, createClass, AddUserToWaitingList, ClassPerDay,
    GetClassData, RemoveUserFromDate, AddMeeting, GetDateData, GetAllUnResolved, AddDateRange
} = require('../controllers/classController');

router.post('/addclass', createClass)
router.post('/addusertoclass', AddUserToWaitingList) //check if exist else push to waiting list
router.post('/getclassdata', GetClassData) // get all the free class time for date...
router.post('/addMeeting', AddMeeting) // add meeting
router.post('/removeuser', RemoveUserFromDate)//remove user from waiting list
router.post("/getdatedata", GetDateData) //get all data for cirten date by class
router.post("/classperday", ClassPerDay) //get all data for cirten date by class
router.post("/approve", Approve)
router.get("/unresolved", GetAllUnResolved)
router.post("/adddaterange", AddDateRange)


module.exports = router;