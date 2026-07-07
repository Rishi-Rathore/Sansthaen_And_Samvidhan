const nodemailer = require("nodemailer");

const sendMail = async (to, otp) => {
  const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
      user: "b126f8001@smtp-brevo.com",
      pass: process.env.BREVO_PASS,
    },
  });

  await transporter.sendMail({
    from: '"Sansthaen And Samvidhan" <rishirathour999@gmail.com>',
    to: to,
    subject: "OTP Verification",
    html: `<h2>Your OTP is: <strong>${otp}</strong></h2><p>Valid for 5 minutes.</p>`
  });

  console.log("✅ OTP mail sent to:", to);
};

module.exports = sendMail;
