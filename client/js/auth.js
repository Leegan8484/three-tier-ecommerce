// =============================
// Backend API URL
// =============================

const API_URL = "/api/auth";

// =============================
// Show / Hide Password
// =============================

const togglePassword = document.getElementById("togglePassword");

if (togglePassword) {

    togglePassword.addEventListener("click", () => {

        const password = document.getElementById("password");

        if (password.type === "password") {
            password.type = "text";
            togglePassword.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
        } else {
            password.type = "password";
            togglePassword.innerHTML = '<i class="fa-solid fa-eye"></i>';
        }

    });

}

// =============================
// Login
// =============================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        try {

            const response = await fetch(`${API_URL}/login`, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email,
                    password
                })

            });

            const data = await response.json();

           if (response.ok) {

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    alert("Login Successful");

    // Redirect based on user role
    if (data.user.role === "admin") {

        window.location.href = "admin/dashboard.html";

    } else {

        window.location.href = "index.html";

    }

} else {

    alert(data.message);

}

        } catch (error) {

            console.error(error);

            alert("Server Error");

        }

    });

}

// =============================
// Register
// =============================

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const full_name = document.getElementById("full_name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        if (password !== confirmPassword) {

            alert("Passwords do not match");

            return;

        }

        try {

            const response = await fetch(`${API_URL}/register`, {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify({

                    full_name,
                    email,
                    password

                })

            });

            const data = await response.json();

            if (response.ok) {

                alert("Registration Successful");

                window.location.href = "login.html";

            } else {

                alert(data.message);

            }

        } catch (error) {

            console.error(error);

            alert("Server Error");

        }

    });

}

// =============================
// Logout (use later)
// =============================

function logout() {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "login.html";

}
