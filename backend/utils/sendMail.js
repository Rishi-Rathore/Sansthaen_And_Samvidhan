const axios = require("axios");

const sendMail = async (to, otp) => {
  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "Sansthaen And Samvidhan",
          email: "rishirathour999@gmail.com",
        },
        to: [{ email: to }],
        subject: "OTP Verification",
        htmlContent: `<h2>Your OTP is: <strong>${otp}</strong></h2><p>Valid for 5 minutes.</p>`,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    console.log("✅ OTP mail sent to:", to, "| Message ID:", response.data.messageId);
  } catch (error) {
    console.log("❌ SEND OTP ERROR:", error.response ? error.response.data : error.message);
    throw error;
  }
};

module.exports = sendMail;