const classSchema = require("../schema/classSchema");
const userSchema = require("../schema/userSchema");

// <<<<<<< HEAD

// function toDate(date) {
//     const currentTime = date;
//     currentTime.setDate(currentTime.getDate() - currentTime.getDay());
//     const month = currentTime.getMonth() + 1
//     const day = currentTime.getDate()
//     const year = currentTime.getFullYear()
//     return (day + "/" + month + "/" + year);
// }
// function getDay(date){
//     const currentTime = date;
//     currentTime.setDate(currentTime.getDate() - currentTime.getDay());
//     const month = currentTime.getMonth() + 1
//     const day = currentTime.getDate()
//     return day
// }
// Date.prototype.addDays = function(days) {
//     var date = new Date(this.valueOf());
//     date.setDate(date.getDate() + days);
//     return date;
// }
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
        const {className, phoneNumber,time_range} = req.body
        const date = req.body.date;
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
        const {className, phoneNumber,time_range, groupSize} = req.body
        const date = req.body.date;
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
                if (dateExist === false && theClass.capacity > groupSize) {
                    if (theClass) {
                        theClass.date.push(data);
                        theClass.save();
                    }
                else {
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
                    }})})},
    GetDateData: (req,res)=> {
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
    },
    ClassPerDay: (req,res) => {
        const date= req.body.date;
        let alldates;
        classSchema
            .find()
            //if question exist...
            .then((theClass) => {
                theClass.map((singleClass)=>{
                singleClass.date.map((singleDate)=> {
                    if (singleDate.date === date){
                        alldates.push(singleDate)
                    }
                })
            })
                res.status(200).json({
                    dates:alldates,
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
                         res.status(200).json({
                             message:"worked!",
                         })
                     }
                 })
             })
        })
    },
    GetAllUnResolved: (req,res) => {
        classSchema.find({date: {approved : "unresolved"}}).then((unresolved)=> {
            console.log(unresolved)

function toDate(date) {
  const currentTime = date;
  currentTime.setDate(currentTime.getDate() - currentTime.getDay());
  const month = currentTime.getMonth() + 1;
  const day = currentTime.getDate();
  const year = currentTime.getFullYear();
  return day + "/" + month + "/" + year;
}
function getDay(date) {
  const currentTime = date;
  currentTime.setDate(currentTime.getDate() - currentTime.getDay());
  const month = currentTime.getMonth() + 1;
  const day = currentTime.getDate();
  return day;
}
Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

var date = new Date();

module.exports = {
  createClass: (req, res) => {
    const { className, capacity, checklist } = req.body;
    return (
      classSchema
        .findOne({ className: className })
        //if question exist...
        .then((theClass) => {
          if (theClass) {
            console.log("exist");
          } else {
            const clas = new classSchema({
              className: className,
              capacity: capacity,
              checklist: checklist,
            });

            res.status(200).json({
              message: "worked",
            });
            clas?.save().then();
          }
        })
    },
    AddDateRange: (req,res)=> {
        const {time_range,className, phoneNumber} = req.body;
        const date = new Date(req.body.date);
        const endDate = new Date(req.body?.enddate);
        let difference = endDate.getTime() - date.getTime();
        Date.prototype.addDays = function(days) {
            const date = new Date(this.valueOf());
            date.setDate(date.getDate() + days);
            return date;
        }
        let TotalDays = Math.ceil(difference / (1000 * 3600 * 24)); //day diffrence
        console.log(TotalDays)
        let userData;
        userSchema.findOne({phoneNumber: phoneNumber}).then((user)=> {
            userData = {userName:user?.userName, phoneNumber: user?.phoneNumber, Email:user?.Email}
        console.log(userData)

        .catch((err) => {
          console.log(err);

        })
    );
  },
  AddUserToWaitingList: (req, res) => {
    const { className, phoneNumber, time_range } = req.body;
    const date = req.body.date;
    let userExist = false;
    let dateExist = false;
    let userData;
    const id = ObjectId();
    userSchema.findOne({ phoneNumber: phoneNumber }).then((user) => {
      userData = {
        userName: user?.userName,
        phoneNumber: user?.phoneNumber,
        email: user?.email,
      };
    });

    classSchema
      .findOne({ className: className })
      //if question exist...
      .then((theClass) => {
        theClass.date.map((singleDate) => {
          if (
            singleDate.date === date &&
            singleDate.time_range === time_range
          ) {
            dateExist = true;
            singleDate.users.phoneNumber.map((userPhone) => {
              if (userPhone === phoneNumber) {
                userExist = true;
              }
            });
            if (userExist === true) {
              console.log("already exist");
            } else {
              singleDate.users.unshift(userData);
              theClass.save();
            }
          }
        });
      });
  },
  AddMeeting: (req, res) => {
    const { className, phoneNumber, time_range, groupSize } = req.body;
    const date = req.body.date;
    let userData;
    let dateExist = false;
    const id = ObjectId();
    userSchema.findOne({ phoneNumber: phoneNumber }).then((user) => {
      userData = {
        userName: user?.userName,
        phoneNumber: user?.phoneNumber,
        email: user?.email,
      };
    });
    const data = {
      date: date,
      time_range: time_range,
      users: [userData],
      approved: "unresolved",
      _id: id,
    };
    classSchema
      .findOne({ className: className })
      //if question exist...
      .then((theClass) => {
        theClass.date.map((singleDate) => {
          if (
            singleDate.date === date &&
            singleDate.time_range === time_range
          ) {
            dateExist = true;
            res.status(200).json({
              message: "exist",
            });
          }
        });
        if (dateExist === false && theClass.capacity > groupSize) {
          if (theClass) {
            theClass.date.push(data);
            theClass.save();
          } else {
            console.log("class not exist");
          }
        }
      });
  },
  GetClassData: (req, res) => {
    const { className } = req.body;
    classSchema.findOne({ className: className }).then((theClass) => {
      if (theClass) {
        res.status(200).json({
          message: "exist",
          data: theClass,
        });
      } else {
        res.status(200).json({
          message: "Not exist",
        });
      }
    });
  },
  RemoveUserFromDate: (req, res) => {
    const id = ObjectId();
    const { className, phoneNumber, time_range } = req.body;
    const date = req.body.date;
    let userData;
    userSchema.findOne({ phoneNumber: phoneNumber }).then((user) => {
      userData = {
        userName: user?.userName,
        phoneNumber: user?.phoneNumber,
        email: user?.email,
      };
    });
    let userExist = false;
    let dateExist = false;
    classSchema
      .findOne({ className: className })
      //if question exist...
      .then((theClass) => {
        theClass.date.map((singleDate) => {
          if (
            singleDate.date === date &&
            singleDate.time_range === time_range
          ) {
            singleDate.users = singleDate.users.filter((users) => {
              return users !== userName;
            });
            theClass.save().then();
          }
        });
      });
  },
  GetDateData: (req, res) => {
    const { className } = req.body;
    const date = req.body.date;

    let alldates;
    classSchema
      .findOne({ className: className })
      //if question exist...
      .then((theClass) => {
        alldates = theClass.date.filter((singleDate) => {
          return (singleDate.date = date);
        });
        res.status(200).json({
          dates: alldates,
        });
      });
  },
  ClassPerDay: (req, res) => {
    const date = req.body.date;
    let alldates;
    classSchema
      .find()
      //if question exist...
      .then((theClass) => {
        theClass.map((singleClass) => {
          alldates = singleClass.date.filter((singleDate) => {
            return (singleDate.date = date);
          });
          res.status(200).json({
            dates: alldates,
          });
        });
      });
  },
  Approve: (req, res) => {
    const { _id, approved } = req.body;
    classSchema.find().then((classes) => {
      classes.map((singleClass) => {
        singleClass.date.map((singleDate) => {
          if (singleDate._id === _id) {
            singleDate.approved = approved;
            singleDate.save();
            res.status(200).json({
              message: "worked!",
            });
          }
        });
      });
    });
  },

  GetAllUnResolved: (req, res) => {
    classSchema
      .find({ date: { approved: "unresolved" } })
      .then((unresolved) => {
        console.log(unresolved);
        res.status(200).json({
          dates: unresolved,
        });
      });
  },
  AddDateRange: (req, res) => {
    const { time_range, className, phoneNumber } = req.body;
    const date = new Date(req.body.date);
    const endDate = new Date(req.body.enddate);
    let difference = endDate.getTime() - date.getTime();
    Date.prototype.addDays = function (days) {
      const date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);
      return date;
    };
    let TotalDays = Math.ceil(difference / (1000 * 3600 * 24)); //day diffrence
    console.log(TotalDays);
    let userData;
    userSchema.findOne({ phoneNumber: phoneNumber }).then((user) => {
      userData = {
        userName: user?.userName,
        phoneNumber: user?.phoneNumber,
        Email: user?.Email,
      };
      console.log(userData);
    });
    classSchema.find({ className: className }).then((singleClass) => {
      console.log(singleClass);
      let newDate = date;
      for (let i = 0; i < TotalDays; i++) {
        if (newDate.getDay() >= 5) {
          console.log(newDate.getDay());
          newDate = date.addDays(i);
        } else {
          newDate = date.addDays(i);
          console.log("thios is new date", newDate.getDay());
          console.log(newDate);
          singleClass?.date?.push(newDate, time_range, userData, id);

          // console.log(singleClass)
          // singleClass?.save()
        }
      }
    });
  },
};
