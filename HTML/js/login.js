document.getElementById("loginForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;
  const errorMessage = document.getElementById("errorMessage");

  errorMessage.textContent = "";

  try {
    const res = await fetch("https://sansthaen-and-samvidhan1.onrender.com/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      errorMessage.textContent = data.msg || "Login failed";
      return;
    }

    localStorage.setItem("token", data.token);
    alert("Login successful");
    window.location.href = "dashboard.html";

  } catch (err) {
    errorMessage.textContent = "Server error";
  }
});

// 🔹 Forgot password redirect
document.getElementById("forgotPassword").addEventListener("click", function (e) {
  e.preventDefault();
  window.location.href = "forgot.html";
});
