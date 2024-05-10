document.getElementById("registerForm").addEventListener("submit", function (e) {
    e.preventDefault(); 

    
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const message = document.getElementById("message");

    
    if (password !== confirmPassword) {
        message.textContent = "Passwords do not match!";
    } else if (username === "" || email === "" || password === "") {
        message.textContent = "All fields are required!";
    } else {
        message.style.color = "green";
        message.textContent = "Registration Successful!";
        
    }
});
