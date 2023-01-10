const mongoose = require("mongoose");

const class_schema = mongoose.Schema({
    className: { type: String, required: true },
    capacity: { type: Number, required: false },
    checklist: { type: Array, required: false },
    date : { type: Array, required: false },
});

module.exports = mongoose.model("class", class_schema);
//check if class exist

//date scheme:

//date {dd/mm/yy, hour range, [order list],approved: bool}