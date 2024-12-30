const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    userMail: {
      type: String,
      required: true,
    },
    videosUrl: {
      type: [String],
    },
  },
  { collection: "Videos" }
);

module.exports = mongoose.model("Videos", userSchema);
