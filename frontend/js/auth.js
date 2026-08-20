// ===============================
// LOGIN PASSWORD SHOW / HIDE
// ===============================

const loginPassword = document.getElementById("loginPassword");
const loginPasswordToggle = document.getElementById("loginPasswordToggle");

if (loginPassword && loginPasswordToggle) {
    loginPasswordToggle.addEventListener("click", function () {

        if (loginPassword.type === "password") {
            loginPassword.type = "text";
            loginPasswordToggle.textContent = "🙈";
        } else {
            loginPassword.type = "password";
            loginPasswordToggle.textContent = "👁";
        }

    });
}


// ===============================
// REGISTER PASSWORD SHOW / HIDE
// ===============================

const registerPassword = document.getElementById("password");
const registerPasswordToggle = document.getElementById("togglePassword");

if (registerPassword && registerPasswordToggle) {
    registerPasswordToggle.addEventListener("click", function () {

        if (registerPassword.type === "password") {
            registerPassword.type = "text";
            registerPasswordToggle.textContent = "🙈";
        } else {
            registerPassword.type = "password";
            registerPasswordToggle.textContent = "👁";
        }

    });
}


// ===============================
// LOGIN FORM
// ===============================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value;

        if (!email || !password) {
            alert("Please enter your email and password.");
            return;
        }

        try {

            const response = await fetch(
                "http://127.0.0.1:5000/api/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(data.message || "Login failed");
                return;
            }

            localStorage.setItem(
                "careerAIUser",
                JSON.stringify(data.user)
            );

            alert("Login successful! 🎉");

            window.location.href = "dashboard.html";

        } catch (error) {

            console.error("Login Error:", error);

            alert(
                "Cannot connect to CareerAI server."
            );
        }

    });
}


// ===============================
// REGISTER FORM
// ===============================

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        const college = document.getElementById("college").value.trim();
        const course = document.getElementById("course").value;
        const year = document.getElementById("year").value;

        if (!name || !email || !password || !college || !course || !year) {
            alert("Please fill all fields.");
            return;
        }

        try {

            const response = await fetch(
                "http://127.0.0.1:5000/api/auth/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        password: password,
                        college: college,
                        course: course,
                        year: year
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(data.message || "Registration failed");
                return;
            }

            alert("Registration successful! 🎉");

            window.location.href = "login.html";

        } catch (error) {

            console.error("Registration Error:", error);

            alert(
                "Cannot connect to CareerAI server."
            );
        }

    });
}