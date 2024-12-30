const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserProfileSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    userMail: {
      type: String,
      required: true,
    },
    userCity: {
      type: String,
      required: true,
    },
    noOfCCTV: {
      type: Number,
      required: true,
    },
  },
  { collection: "Profiles" }
);
module.exports = mongoose.model("UserProfile", UserProfileSchema);
