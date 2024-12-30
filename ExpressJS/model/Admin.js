const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    adminMail: {
      type: String,
      required: true,
    },
    adminName: {
      type: String,
    },
    adminPass: {
      type: String,
      required: true,
    },
    adminCity: {
      type: String,
    },
  },
  { collection: "Admin" }
);

module.exports = mongoose.model("Admin", userSchema);
