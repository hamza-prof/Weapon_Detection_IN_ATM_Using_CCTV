const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    userMail: {
      type: String,
      required: true,
    },
    userPassword: {
      type: String,
      required: true,
    },
  },
  { collection: "Users" }
);

module.exports = mongoose.model("User", userSchema);
