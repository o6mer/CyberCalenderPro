const express = require('express')
const router = express.Router();

const {
    Approve, createClass, AddUserToWaitingList,
    GetClassData, RemoveUserFromDate, AddMeeting, GetDateData, GetAllUnResolved, AddDateRange, SendClassesAndRanges
} = require('../controllers/classController');

router.post('/addclass', createClass)//--tested
router.post('/addusertoclass', AddUserToWaitingList) //check if exist else push to waiting list
router.post('/getclassdata', GetClassData) // get all the free class time for date...
router.post('/addMeeting', AddMeeting) // add meeting --tested
router.post('/removeuser', RemoveUserFromDate)//remove user from waiting list
router.post("/getdatedata", GetDateData) //get all data for cirten date by class
router.post("/approve", Approve)
router.get("/unresolved", GetAllUnResolved)
router.post("/adddaterange", AddDateRange)
router.post("/classesData", SendClassesAndRanges) //send all classes and time_ranges -- tested


module.exports = router;