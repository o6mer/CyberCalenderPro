const classSchema = require("../schema/classSchema");
const userSchema = require("../schema/userSchema");

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

    },
    AddUserToWaitingList: (req,res)=> {
        const {className, phoneNumber, date,time_range} = req.body
        let userExist = false;
        let dateExist = false;
        let userData ;
        const id = ObjectId()
        userSchema.findOne({phoneNumber: phoneNumber}).then((user)=> {
            userData = {userName:user?.userName, phoneNumber: user?.phoneNumber, email:user?.email}
        })

        classSchema
            .findOne({className: className})
            //if question exist...
            .then((theClass) => {
                theClass.date.map((singleDate)=> {
                    if (singleDate.date === date && singleDate.time_range === time_range){
                        dateExist = true;
                        singleDate.users.phoneNumber.map((userPhone)=> {
                            if (userPhone === phoneNumber){
                                userExist = true;
                                return;
                            }
                        })
                        if (userExist === true){
                            console.log("already exist")
                        } else {
                            singleDate.users.unshift(userData)
                            theClass.save()
                        }
                    }
                })
            })},
    AddMeeting: (req,res)=> {
        const {className, phoneNumber, date,time_range} = req.body
        let userData;
        let dateExist = false;
        const id = ObjectId()
        userSchema.findOne({phoneNumber: phoneNumber}).then((user)=> {
            userData = {userName:user?.userName, phoneNumber: user?.phoneNumber, email:user?.email}
        })
        const data = {date:date,time_range:time_range,users: [userData], approved: "unresolved", _id:id}
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
        const id = ObjectId()
        const {className, phoneNumber, date,time_range} = req.body
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
                        theClass.save()
                    }})})},
    GetDateData: (req,res)=> {
        const {className, date} = req.body;
        let alldates ;
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
    },
    ClassPerDay: (req,res) => {
        const { date} = req.body;
        let alldates;
        classSchema
            .find()
            //if question exist...
            .then((theClass) => {
                theClass.map((singleClass)=>{
                alldates = singleClass.date.filter((singleDate)=> {
                    return singleDate.date = date
                })
                res.status(200).json({
                    dates:alldates,
                })
            })
            })
    },
    Approve: (req,res) => {
      const {_id, approved} = req.body;
         classSchema.find().then((classes)=> {
             classes.map((singleClass)=> {
                 singleClass.date.map((singleDate)=> {
                     if (singleDate._id === _id){
                         singleDate.approved = approved;
                         singleDate.save()
                     }
                 })
             })
        })
    },
    GetAllUnResolved




}