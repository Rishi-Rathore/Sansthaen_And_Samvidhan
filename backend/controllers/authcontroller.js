const sendMail = require("../utils/sendMail");

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const otp = Math.floor(100000 + Math.random() * 900000);

    await sendMail(email, otp);

    res.status(200).json({ msg: "OTP sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "OTP send failed" });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    res.status(200).json({ msg: "OTP verified" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};
