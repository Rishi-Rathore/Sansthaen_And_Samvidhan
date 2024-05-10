<script src="dashboard.js"></script>

<script src="register.js"></script>
const token = localStorage.getItem("token");

if (!token) {
  alert("Login first");
  window.location.href = "login.html";
}

fetch("http://localhost:5000/api/auth/profile", {
  headers: {
    Authorization: "Bearer " + token
  }
})
  .then(res => res.json())
  .then(data => {
    console.log(data);
  })
  .catch(() => {
    alert("Session expired");
    localStorage.removeItem("token");
    window.location.href = "login.html";
  });
  
