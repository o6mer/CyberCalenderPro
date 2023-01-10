const mongoose = require("mongoose");

const user_schema = mongoose.Schema({
    userName: { type: String, required: true },
    Password: { type: String, required: true },
    Email: { type: String, required: true },
    role :  { type: String, required: true, default:"user" },
    phoneNumber :  { type: Number, required: true },
});

module.exports = mongoose.model("MidUser", user_schema);


//date {dd/mm/yy, hour range, [order list],approved: bool}