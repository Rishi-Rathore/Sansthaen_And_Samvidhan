const nodemailer = require("nodemailer");

const sendMail = async (to, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Sansthaen And Samvidhan" <${process.env.GMAIL_USER}>`,
    to: to,
    subject: "OTP Verification",
    html: `<h2>Your OTP is: <strong>${otp}</strong></h2><p>Valid for 5 minutes.</p>`
  });

  console.log("✅ OTP mail sent to:", to);
};

module.exports = sendMail;
