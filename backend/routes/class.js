const express = require('express')
const router = express.Router();

const {
    Approve, createClass, AddUserToWaitingList,
    GetClassData, RemoveUserFromDate, AddMeeting, GetDateData, GetAllUnResolved, AddDateRange, SendClassesAndRanges
} = require('../controllers/classController');

router.post('/addclass', createClass)//--tested
router.post('/addusertoclass', AddUserToWaitingList) //check if exist else push to waiting list --tested
router.post('/getclassdata', GetClassData) // get all the class Data --tested
router.post('/addMeeting', AddMeeting) // add meeting --tested
router.post('/removeuser', RemoveUserFromDate)//remove user from waiting list
router.post("/getdatedata", GetDateData) //get all data for cirten date by class --tested
router.post("/approve", Approve) // --tested
router.get("/unresolved", GetAllUnResolved) // --tested
router.post("/adddaterange", AddDateRange)
router.post("/classesData", SendClassesAndRanges) //send all classes and time_ranges -- tested


module.exports = router;