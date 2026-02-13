document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");
  if (!form) return; // 🔴 ERROR FIX (yahi main issue tha)

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const message = document.getElementById("message");

    message.style.color = "red";
    message.textContent = "";

    if (!username || !email || !password || !confirmPassword) {
      message.textContent = "All fields required";
      return;
    }

    if (password !== confirmPassword) {
      message.textContent = "Passwords do not match";
      return;
    }

    try {
      const res = await fetch("https://sansthaen-and-samvidhan1.onrender.com/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        message.textContent = data.msg || "Registration failed";
        return;
      }

      message.style.color = "green";
      message.textContent = "Registered successfully! Redirecting...";

      setTimeout(() => {
        window.location.href = "log in.html";
      }, 1200);

    } catch (err) {
      message.textContent = "Server not responding";
    }
  });
});
