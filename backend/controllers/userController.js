const userSchema = require("../schema/userSchema");
// const bcrypt = require("bcryptjs")
const sgMail = require('@sendgrid/mail')

module.exports = {
    Login: (req, res) => {
        const {email, password} = req.body;
        userSchema.findOne({Email: email}).then(async (user) => {
            if (user?.Password === password) {
                res.status(200).json({
                    message: true,
                    userName: user?.userName,
                    role: user?.role,
                    userId: user?._id,
                    phoneNumber: user?.phoneNumber,
                    email:user?.Email

                })
            } else {
                res.status(400).json({
                    message: false,
                })
            }

        })
    },
    Signup: (req, res) => {
        const {userName, Password, Email, role, PhoneNumber} = req.body;

        userSchema.findOne({userName: userName}).then((user) => {
            if (user) {
                res.status(200).json({
                    message: "user already exist",
                })
            } else {
                const newUser = new userSchema({
                    userName: userName,
                    Password: Password,
                    Email: Email,
                    phoneNumber: PhoneNumber
                });
                newUser?.save().then(
                    res.status(200).json({
                        message: "user created!",
                        role: user?.role
                    })
                );
            }
        })
    },
    ChangeSpecs:(req,res)=>{
        const {id,userName,Password,Email,phoneNumber} = req.body
        try {
            userSchema.findOne({_id: id}).then((user) => {

                if (user) {
                    user.userName = userName;
                    user.Email = Email;
                    user.phoneNumber = phoneNumber;
                    if (Password) {
                        user.Password = Password
                    }
                    user.save().then(() => res.status(200).json({message: "worked"}))
                }

            })
        } catch (err){
            console.log(err)
        }
}
}
