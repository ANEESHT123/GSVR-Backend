const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  mobile: String,
  service: String,
  message: String,
  resumePath: String,
});

module.exports = mongoose.model("Application", ApplicationSchema);
