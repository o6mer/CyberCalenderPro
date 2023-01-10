const classSchema = require("../schema/classSchema");


module.exports = {
    createClass: (req, res) => {
        const {className, capacity, checklist} = req.body
        return (
            classSchema
                .findOne({className: className})
                //if question exist...
                .then((theClass) => {
                    if (theClass) {
                        console.log("exist")
                    } else {
                        const clas = new classSchema({
                            className: className,
                            capacity: capacity,
                            checklist: checklist,
                        });
                        clas?.save().then();
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
        );

    },
    AddUserToWatingList: (req,res)=> {
        const {className, userName, date,time_range} = req.body
        let userExist = false;
        let dateExist = false;
        classSchema
            .findOne({className: className})
            //if question exist...
            .then((theClass) => {
                theClass.date.map((singleDate)=> {
                    if (singleDate.date === date && singleDate.time_range === time_range){
                        dateExist = true;
                        singleDate.users.map((users)=> {
                            if (users === userName){
                                userExist = true;
                                return;
                            }
                        })
                        if (userExist === true){
                            console.log("already exist")
                        } else {
                            singleDate.users.unshift(userName)
                            theClass.save()
                        }
                    }
                })
            })},
    AddMeeting: (req,res)=> {
        const {className, userName, date,time_range} = req.body
        const data = {date:date,time_range:time_range,users: [userName], approved: false}
        let dateExist = false;
        classSchema
            .findOne({className: className})
            //if question exist...
            .then((theClass) => {
                theClass.date.map((singleDate)=> {
                    if (singleDate.date === date && singleDate.time_range === time_range) {
                        dateExist = true
                        res.status(200).json({
                            message:"exist",
                        })
                    }
                })
                if (dateExist === false) {
                    if (theClass) {
                        theClass.date.push(data);
                        theClass.save();
                    } else {
                        console.log("class not exist")
                    }
                }
            })
    },
    GetClassData: (req,res) => {
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
    },
    RemoveUserFromDate: (req,res) => {
        const {className, userName, date,time_range} = req.body
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
                        theClass.save()
                    }})})},




}