const CCTV = require("../model/CCTV");
async function updateCCTVIps(req, res) {
  const email = req.params.email;
  const { ips } = req.body; // Expect an array of IPs

  console.log(email, ips);

  const updatedCCTV = await CCTV.findOneAndUpdate(
    { userMail: email },
    { $set: { ips } }
  );

  if (!updatedCCTV) {
    return res.status(404).json({ message: "CCTV data not found" });
  }

  res.json(updatedCCTV);
}

module.exports = { updateCCTVIps };
