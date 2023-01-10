const userSchema = require("../schema/classSchema");
const bcrypt = require("bcryptjs")

module.exports = {
    Login: (req,res)=> {
        const {userName,Password} = req.body;
        userSchema.findOne({userName: userName}).then(async(user)=> {
           if (await bcrypt.compare(user?.Password,Password)){
               res.status(200).json({
                   userName:user?.userName,
                   id: user._id
               })
           } else {
               res.status(200).json({
                   message:false,
               })
           }

        })
    },
    Signup: (req,res) => {
        const {userName,Password, Email} = req.body;
        const Hashed = bcrypt.hash(Password,12)
        userSchema.findOne({userName:userName}).then((user)=> {
            if (user){
                res.status(200).json({
                    message:"user already exist",
                })
            } else {
                const newUser = new userSchema({
                    userName: userName,
                    Password: Hashed,
                    Email: Email,
                });
                newUser?.save().then(
                    res.status(200).json({
                        message:"user created!",
                    })
                );
            }
        })
    }
}