// REGISTER
document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const message = document.getElementById("message");

  message.style.color = "red";
  message.textContent = "";

  try {
    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      message.textContent = data.msg || "Server error";
      return;
    }

    // ✅ OTP SENT
    message.style.color = "green";
    message.textContent = "OTP sent successfully";

    localStorage.setItem("email", email);
    document.getElementById("otpSection").style.display = "block";

  } catch (err) {
    message.textContent = "Server error";
  }
});


// VERIFY OTP
document.getElementById("verifyOtpBtn").addEventListener("click", async () => {
  const otp = document.getElementById("otp").value.trim();
  const email = localStorage.getItem("email");
  const message = document.getElementById("message");

  try {
    const res = await fetch("http://localhost:5000/api/auth/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp })
    });

    const data = await res.json();

    if (!res.ok) {
      message.style.color = "red";
      message.textContent = data.msg || "Invalid OTP";
      return;
    }

    // ✅ SUCCESS
    message.style.color = "green";
    message.textContent = "Registration successful! Redirecting...";

    localStorage.removeItem("email");

    setTimeout(() => {
      window.location.href = "log in.html";
    }, 1500);

  } catch (err) {
    message.textContent = "Server error";
  }
});
