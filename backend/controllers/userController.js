const userSchema = require("../schema/userSchema");
const bcrypt = require("bcryptjs")

module.exports = {
    Login: (req,res)=> {
        const {userName,Password} = req.body;
        userSchema.findOne({userName: userName}).then(async(user)=> {
           if (Password === Password){
               res.status(200).json({
                   message:true,
                   userName:user?.userName,
                   role:user?.role,
                   userId: user._id,

               })
           } else {
               res.status(400).json({
                   message:false,
               })
           }

        })
    },
    Signup: (req,res) => {
        const {userName,Password, Email, role, PhoneNumber} = req.body;

        userSchema.findOne({userName:userName}).then((user)=> {
            if (user){
                res.status(200).json({
                    message:"user already exist",
                })
            } else {
                const newUser = new userSchema({
                    userName: userName,
                    Password: Password,
                    Email: Email,
                    phoneNumber : PhoneNumber
                });
                newUser?.save().then(
                    res.status(200).json({
                        message:"user created!",
                        role:user?.role
                    })
                );
            }
        })
    }
}