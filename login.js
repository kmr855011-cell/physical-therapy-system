console.log("JavaScript Connected");

// =========================
// DOM Elements
// =========================

const loginForm = document.querySelector(".login-form");

const usernameInput = document.querySelector("#username");
const passwordInput = document.querySelector("#password");

const usernameError = document.querySelector("#username-error");
const passwordError = document.querySelector("#password-error");

const loginButton = document.querySelector(".login-btn");
const togglePassword = document.querySelector(".toggle-password");

// =========================
// Functions
// =========================

function clearErrors() {

    usernameError.textContent = "";
    passwordError.textContent = "";

}

function showError(input, message) {

    if (input === usernameInput) {
        usernameError.textContent = message;
    }

    if (input === passwordInput) {
        passwordError.textContent = message;
    }

}

function validateForm() {

    clearErrors();

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    let isValid = true;

    if (username === "") {

        showError(usernameInput, "يرجى إدخال اسم المستخدم");

        isValid = false;
    }

    if (password === "") {

        showError(passwordInput, "يرجى إدخال كلمة المرور");

        isValid = false;
    }

    return isValid;

}

// =========================
// Events
// =========================

loginForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const isValid = validateForm();

    if (!isValid) {
        return;
    }

    loginButton.disabled = true;
    loginButton.textContent = "جاري تسجيل الدخول...";

    console.log("Username:", usernameInput.value);
    console.log("Password:", passwordInput.value);

    // مؤقتًا لمحاكاة الاتصال بالسيرفر
    setTimeout(function () {

        loginButton.disabled = false;
        loginButton.textContent = "تسجيل الدخول";

        alert("تم تسجيل الدخول بنجاح");

    }, 1000);

});

// =========================
// Toggle Password
// =========================

togglePassword.addEventListener("click", function () {

    if (passwordInput.type === "password") {

        passwordInput.type = "text";
        togglePassword.textContent = "👁";

    } else {

        passwordInput.type = "password";
        togglePassword.textContent = "👁";

    }

});