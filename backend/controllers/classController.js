const classSchema = require("../schema/classSchema");
const userSchema = require("../schema/userSchema");
const { v4: uuidv4 } = require('uuid');
const sgMail = require("@sendgrid/mail");
require('dotenv').config()
var nodemailer = require('nodemailer');



Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}
module.exports = {createClass: (req, res) => {
        const {className, capacity, checklist} = req.body
        return (
            classSchema
                .findOne({className: className})
                //if question exist...
                .then((theClass) => {
                    if (theClass) {
                        res.status(400).json({
                            message:"class exist"
                        })
                    } else {
                        const clas = new classSchema({
                            className: className,
                            capacity: capacity,
                            checklist: checklist,
                        });
                        res.status(200).json({
                            message:"worked",
                        })
                        clas?.save().then();
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
        );

    }, AddUserToWaitingList: (req,res)=> {
        const {className, phoneNumber,time_range} = req.body
        const date = req.body.date;
        let userExist = false;
        let dateExist = false;
        let userData ;
        const id = uuidv4();
        try {
            userSchema.findOne({phoneNumber: phoneNumber}).then((user) => {
                userData = {
                    userName: user?.userName,
                    phoneNumber: user?.phoneNumber,
                    Email: user?.Email
                }
                classSchema
                    .findOne({className: className})
                    //if question exist...
                    .then((theClass) => {
                        theClass.date.map((singleDate) => {
                            if (singleDate.date === date && singleDate.time_range === time_range) {
                                dateExist = true;
                                singleDate.users?.phoneNumber?.map((userPhone) => {
                                    if (userPhone === phoneNumber) {
                                        userExist = true;

                                        console.log("im the problem")
                                    }
                                })
                                if (userExist === true) {
                                    res.status(400).json({
                                        message: "already exist"
                                    })
                                } else {
                                    singleDate.users.push(userData)

                                    theClass.markModified("date")
                                    theClass.save().then(() => {
                                        res.status(200).json({
                                            message: true
                                        })
                                    }).catch(err => console.log(err))
                                }
                            }
                        })
                    })
            })
        } catch (err){
            res.status(400).json({
                message: err
            })
        }

    }, AddMeeting: (req,res)=> {
        const {className, phoneNumber,time_range, groupSize} = req.body
        const date = req.body.date;
        let userData;
        let dateExist = false;
        const id = uuidv4();
        try {
            userSchema.findOne({phoneNumber: phoneNumber}).then((user) => {
                userData = {userName: user?.userName, phoneNumber: user?.phoneNumber, email: user?.email}
                const data = {date: date, time_range: time_range, users: [userData], approved: "unresolved", _id: id}
                classSchema
                    .findOne({className: className})
                    //if question exist...
                    .then((theClass) => {
                        theClass?.date?.map((singleDate) => {
                            if (singleDate.date === date && singleDate.time_range === time_range) {
                                dateExist = true
                                if (singleDate.approved !== "unresolved") {
                                    theClass.date.push(data);
                                    theClass.save();
                                } else {
                                    res.status(200).json({
                                        message: "exist",
                                    })
                                }
                            }
                        })

                        if (dateExist === false && theClass?.capacity >= groupSize) {
                            if (theClass) {
                                theClass.date.push(data);
                                theClass.save();
                                res.status(200).json({
                                    data: data
                                })
                            } else {
                                res.status(200).json({
                                    message: "class not exist"
                                })
                            }
                        }
                    })

        })
        } catch (err){
            res.status(400).json({
                message: err
            })
        }

    }, GetClassData: (req,res) => {
        const {className} = req.body
        classSchema
            .findOne({className: className}).then((theClass)=> {
            if (theClass){
                res.status(200).json({
                    message:"exist",
                    data: theClass
                })
            } else {
                res.status(200).json({
                    message:"Not exist",
                })
            }
        })
    }, RemoveUserFromDate: (req,res) => {
        const id = uuidv4();
        const {className, phoneNumber,time_range} = req.body
        const date =req.body.date;
        let userData;
        userSchema.findOne({phoneNumber: phoneNumber}).then((user)=> {
            userData = {userName:user?.userName, phoneNumber: user?.phoneNumber, email:user?.email}
        })
        let userExist = false;
        let dateExist = false;
        classSchema
            .findOne({className: className})
            //if question exist...
            .then((theClass) => {
                theClass.date.map((singleDate)=> {
                    if (singleDate.date === date && singleDate.time_range === time_range){
                        singleDate.users = singleDate.users.filter((users) => {
                            return users !== userName
                        });
                        theClass.save().then()
                    }})})}, GetDateData: (req,res)=> {
        const {className} = req.body;
        const date = req.body.date;
        let alldates;
        classSchema
            .findOne({className: className})
            //if question exist...
            .then((theClass) => {
                alldates = theClass.date.filter((singleDate)=> {
                    return singleDate.date = date
                })
                res.status(200).json({
                    dates:alldates,
                })
            })
    }, Approve: (req,res) => {
        const {_id, approved} = req.body;
        classSchema.find().then((classes)=> {
            classes.map((singleClass)=> {
                singleClass.date.map((singleDate)=> {
                    if (singleDate._id === _id){
                        singleDate.approved = approved;
                        singleClass.markModified("date")
                        singleClass.save()
                        res.status(200).json({
                            message:"worked!",
                        })
                    }
                })
            })
        })
    }, GetAllUnResolved: (req,res) => {
        const sendunresolved = []
        const addclasses = []
        classSchema.find().then((ClassArray)=> {
            ClassArray.map((singleClass)=>{
                singleClass.date.map((singleDate)=>{
                    if (singleDate.approved === "unresolved"){
                        sendunresolved.push({...singleDate, className: singleClass.className})
                    }
                })

            })
            res.status(200).json({
                dates:sendunresolved,
            })
        })
    }, AddDateRange: (req,res)=> {
        const {className, phoneNumber} = req.body;
        const date = new Date(req.body.date);
        const time_range = req.body.time_range
        const id = uuidv4();
        const endDate = new Date(req.body?.enddate);
        const arrayDemi = []
        let difference = endDate.getTime() - date.getTime();
        Date.prototype.addDays = function(days) {
            const date = new Date(this.valueOf());
            date.setDate(date.getDate() + days);
            return date;
        }
        let TotalDays = Math.ceil(difference / (1000 * 3600 * 24)); //day diffrence
        let userData;
        userSchema.findOne({phoneNumber: phoneNumber}).then((user)=> {
            userData = {userName: user?.userName, phoneNumber: user?.phoneNumber, Email: user?.Email}
            classSchema.findOne({className: className}).then((singleClass) => {
                let newDate = date
                let ifexist = false;
                for (let i = 0; i < TotalDays; i++) {
                    if (newDate.getDay() >= 5) {
                        newDate = date.addDays(i)
                    } else {
                        newDate = date.addDays(i)
                        const datesimplefide = {
                            day: newDate.getDate(),
                            month: newDate.getMonth() + 1,
                            year: newDate.getFullYear()
                        }
                        const dateEdit = datesimplefide.year + "," + datesimplefide.month + "," + datesimplefide.day;
                        time_range.map((singleTimerange)=>{
                            const insert = {
                                date: dateEdit,
                                time_range: singleTimerange,
                                users: [userData],
                                _id:id,
                                approved:"unresolved"
                            }
                            singleClass.date.forEach((singleDate)=>{
                                if (singleDate.date === insert.date){
                                    if(singleDate.time_range === singleTimerange){
                                        ifexist = true;
                                    }
                                }
                            })
                            if(ifexist=== false) singleClass?.date?.push(insert)
                        })


                    }
                }


                // singleClass?.markModified("date")
                singleClass?.save().then(res.status(200).json({message: true})).catch(err=>console.log(err))
            })
        })

    }, SendClassesAndRanges: (req,res)=> {
        const className = [];
        const classData = []
        classSchema.find().then((classes)=>{
            classes.map((clas)=>{
                const SignleClassTimeRange = [];
                className.push(clas.className);
                clas.date.map((singleDate)=>{
                    SignleClassTimeRange.unshift(singleDate)
                })
                classData.push({
                    className: clas.className,
                    date_data: SignleClassTimeRange,
                    capacity: clas.capacity,
                    checklist:clas.checklist,
                })
            })
            res.status(200).json({
                data: classData
            })
        })
    }, IdAuth: (req,res)=>{
        const id = req.body.id;
        try {
            userSchema.findOne({_id: id}).then((user) => {
                if (user) {
                    res.status(200).json({
                        exist: true,
                        userName: user?.userName,
                        role: user?.role,
                        userId: user?._id,
                        phoneNumber: user?.phoneNumber,
                        email: user?.Email
                    })
                } else {
                    res.status(400).json({
                        exist: false,
                    })
                }
            })
        } catch (err) {
            res.status(400).json({
                message: err,
            })
        }

    }}
