const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: "b126f8001@smtp-brevo.com", // Yeh wala mail yahan aayega
    pass: process.env.BREVO_PASS,     // Render dashboard par aapki SMTP Key
  },
});

const sendOtp = async (email, otp) => {
  await transporter.sendMail({
    from: "b126f8001@smtp-brevo.com", // Aur yahan bhi yahi mail aayega
    to: email,
    subject: "OTP Verification",
    text: `Your OTP is ${otp}`,
    html: `<h2>Your OTP is: <strong>${otp}</strong></h2><p>Valid for 5 minutes.</p>`
  });

  console.log("✅ OTP mail sent to:", email);
};

module.exports = sendOtp;