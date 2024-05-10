const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMail = async (to, otp) => {
  try {
    const msg = {
      to: to,
     from: process.env.SENDGRID_FROM_EMAIL
,


      subject: "OTP Verification",
      html: `
        <h2>Your OTP is: ${otp}</h2>
        <p>This OTP is valid for 5 minutes.</p>
      `
    };

    await sgMail.send(msg);
    console.log("OTP mail sent successfully");
  } catch (error) {
    console.error("SendGrid mail error:", error.response?.body || error);
  }
};

module.exports = sendMail;
