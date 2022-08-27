const mongoose = require("mongoose");

const StudentDetailsSchema = new mongoose.Schema({

  StudentName: { type: String},
  StudentClass: { type: String },
  StudentImage: { type: String},
  StudentAddress:{type:String}


});


module.exports = mongoose.model("studentDetails", StudentDetailsSchema);
