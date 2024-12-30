const { mongoose } = require("mongoose");
const Schema = mongoose.Schema;

const CCTVSChema = new Schema(
  {
    userMail: String,
    ips: [String], // Array of CCTV IP addresses
  },
  { collection: "Cctvs" }
);
module.exports = mongoose.model("CCTV", CCTVSChema);
