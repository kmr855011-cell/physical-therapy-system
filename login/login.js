console.log("JavaScript Connected");

// =========================
// DOM Elements
// =========================

const loginForm = document.querySelector(".login-form");
const usernameInput = document.querySelector("#username");
const passwordInput = document.querySelector("#password");
const usernameError = document.querySelector("#username-error");
const passwordError = document.querySelector("#password-error");
const loginError = document.querySelector("#login-error");
const loginButton = document.querySelector(".login-btn");
const togglePassword = document.querySelector(".toggle-password");

// ✅ إضافة متغير للأيقونة بدلاً من النص
const toggleIcon = document.querySelector("#toggle-icon");

/* ==========================================================
                        MOCK USERS DATABASE
========================================================== */

const mockUsers = [
    {
        username: "secretary",
        password: "12345",
        role: "secretary",
        displayName: "سكرتير الاستقبال",
        redirectUrl: "secretary.html"
    },
    {
        username: "doctor",
        password: "12345",
        role: "doctor",
        displayName: "د. أحمد",
        redirectUrl: "doctor.html"
    },
    // ✅ إضافة مستخدم Admin
    {
        username: "admin",
        password: "admin123",
        role: "admin",
        displayName: "المدير",
        redirectUrl: "admin.html"
    }
];

// =========================
// Functions
// =========================

function clearErrors() {
    usernameError.textContent = "";
    passwordError.textContent = "";
    loginError.textContent = "";
}

function authenticateUser(username, password) {
    return mockUsers.find(function (user) {
        return user.username === username && user.password === password;
    });
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
    if (!isValid) return;

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    const matchedUser = authenticateUser(username, password);

    if (!matchedUser) {
        loginError.textContent = "اسم المستخدم أو كلمة المرور غير صحيحة";
        return;
    }

    loginButton.disabled = true;
    loginButton.textContent = "جاري تسجيل الدخول...";

    setTimeout(function () {
        sessionStorage.setItem("currentUser", JSON.stringify(matchedUser));
        window.location.href = matchedUser.redirectUrl;
    }, 800);
});

// =========================
// Toggle Password (✅ باستخدام أيقونات Bootstrap)
// =========================

togglePassword.addEventListener("click", function () {
    if (passwordInput.type === "password") {
        passwordInput.type = "text";

        toggleIcon.className = "bi bi-eye-slash";
        togglePassword.setAttribute("aria-label", "إخفاء كلمة المرور");
    } else {
        passwordInput.type = "password";
       
        toggleIcon.className = "bi bi-eye";
        togglePassword.setAttribute("aria-label", "إظهار كلمة المرور");
    }
});