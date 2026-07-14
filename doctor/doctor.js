console.log("Doctor Dashboard Loaded");

/* =========================
   SELECTORS
========================= */

const patientSearch = document.querySelector("#patient-search");
const patientsCount = document.querySelector("#patients-count");
const profileBtn = document.querySelector(".profile-btn");
const profileDropdown = document.querySelector(".profile-dropdown");
const notificationBtn = document.querySelector(".notification-btn");
const notificationDropdown = document.querySelector(".notification-dropdown");
const logoutBtn = document.querySelector(".logout-btn");
const patientsTableBody = document.querySelector("#patients-table-body");

/* =========================
   DATABASE
========================= */

const patients = [
    { id: 1, name: "محمد أحمد", age: 32, diagnosis: "خشونة الركبة", phone: "01012345678", sessions: 6, totalSessions: 12, status: "نشط" },
    { id: 2, name: "أحمد علي", age: 28, diagnosis: "قطع رباط صليبي", phone: "01123456789", sessions: 4, totalSessions: 10, status: "معلق" },
    { id: 3, name: "يوسف سمير", age: 41, diagnosis: "انزلاق غضروفي", phone: "01234567890", sessions: 10, totalSessions: 10, status: "منتهي" }
];

/* ==========================================================
                        TOAST
========================================================== */

function showToast(message, type = "info", icon = "bi-check-circle") {
    let container = document.querySelector("#toast-container");
    if (!container) {
        container = document.createElement("div");
        container.id = "toast-container";
        container.className = "toast-container";
        document.body.appendChild(container);
    }
    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `<i class="bi ${icon}"></i><span>${message}</span>`;
    container.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add("show"));
    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

function getStatusClass(status) {
    switch (status) {
        case "نشط": return "active";
        case "معلق": return "pending";
        case "منتهي": return "inactive";
        default: return "";
    }
}

/* =========================================================
   PATIENTS TABLE
========================================================= */

function renderPatientsTable(data = patients) {
    let html = "";
    data.forEach(patient => {
        html += `
        <tr>
            <td>${patient.name}</td>
            <td>${patient.diagnosis}</td>
            <td>${patient.phone}</td>
            <td><span class="status ${getStatusClass(patient.status)}">${patient.status}</span></td>
            <td>
                <button class="primary-btn open-patient-btn" data-id="${patient.id}">
                    <i class="bi bi-folder2-open"></i>
                    فتح الملف
                </button>
            </td>
        </tr>
        `;
    });
    updatePatientsCount(data.length);
    patientsTableBody.innerHTML = html;
}

function updatePatientsCount(count) {
    if (!patientsCount) return;
    patientsCount.textContent = `إجمالي المرضى : ${count}`;
}

function renderEmptyState() {
    patientsTableBody.innerHTML = `
    <tr>
        <td colspan="5">
            <div class="empty-state">
               <i class="bi bi-search"></i>
               <h3>لا يوجد مرضى</h3>
               <p>لم يتم العثور على نتائج.</p>
            </div>
        </td>
    </tr>
    `;
    updatePatientsCount(0);
}

/* =========================================================
   OPEN PATIENT (FIXED)
========================================================= */

document.addEventListener("click", function (event) {
    const button = event.target.closest(".open-patient-btn");
    if (!button) return;
    const id = button.dataset.id;
    showToast("جاري فتح ملف المريض...", "info", "bi-folder2-open");
    setTimeout(() => {
        window.location.href = `patient.html?id=${id}`;
    }, 300);
});

/* =========================================================
   SEARCH
========================================================= */

function searchPatients() {
    const value = patientSearch.value.trim().toLowerCase();
    if (value === "") {
        renderPatientsTable();
        return;
    }
    const filteredPatients = patients.filter(patient =>
        patient.name.toLowerCase().includes(value) ||
        patient.phone.includes(value) ||
        patient.diagnosis.toLowerCase().includes(value)
    );
    filteredPatients.length === 0 ? renderEmptyState() : renderPatientsTable(filteredPatients);
}

patientSearch.addEventListener("input", searchPatients);

/* =========================================================
   PROFILE DROPDOWN
========================================================= */

function toggleProfileDropdown() {
    profileDropdown.classList.toggle("active");
    notificationDropdown.classList.remove("active");
}

profileBtn.addEventListener("click", function (event) {
    event.stopPropagation();
    toggleProfileDropdown();
});

/* =========================================================
   NOTIFICATIONS
========================================================= */

function toggleNotifications() {
    notificationDropdown.classList.toggle("active");
    profileDropdown.classList.remove("active");
}

notificationBtn.addEventListener("click", function (event) {
    event.stopPropagation();
    toggleNotifications();
});

document.addEventListener("click", function () {
    profileDropdown.classList.remove("active");
    notificationDropdown.classList.remove("active");
});


/* ==========================================================
   LOGOUT - DROPDOWN (FIXED)
========================================================= */


const logoutDropdownBtn = document.querySelector(".logout-item");

logoutDropdownBtn?.addEventListener("click", function (event) {
    event.stopPropagation();
    showToast("جاري تسجيل الخروج...", "info", "bi-box-arrow-right");
    setTimeout(() => {
        window.location.href = "index.html";
    }, 500);
});

/* =========================================================
   INIT
========================================================= */

function init() {
    renderPatientsTable();
}

init();