console.log("Doctor Dashboard Loaded");

import database from "../data/mockDatabase.js";
/* =========================
   SELECTORS
========================= */

const patientSearch = document.getElementById("patient-search");
const patientsCount = document.querySelector("#patients-count");
const profileBtn = document.querySelector(".profile-btn");
const profileDropdown = document.querySelector(".profile-dropdown");
const notificationBtn = document.querySelector(".notification-btn");
const notificationDropdown = document.querySelector(".notification-dropdown");
const logoutBtn = document.querySelector(".logout-btn");
const patientsTableBody = document.querySelector("#patients-table-body");
const doctorName = document.getElementById("doctor-name");
const doctorDropdownName = document.getElementById("doctor-dropdown-name");
const doctorSpecialization = document.getElementById("doctor-specialization");
const notificationsList = document.getElementById("notifications-list");

const notificationsCount = document.getElementById("notifications-count");

/* =========================
   DATABASE
========================= */
const currentDoctor = database.doctors[0];
const patients = database.patients;


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


function renderDoctorInfo() {

    doctorName.textContent = currentDoctor.fullName;

    doctorDropdownName.textContent = currentDoctor.fullName;

    doctorSpecialization.textContent = currentDoctor.specialization;

}

function renderPatients(list = patients) {

    patientsTableBody.innerHTML = "";

    list.forEach(patient => {

        patientsTableBody.innerHTML += `

        <tr>

            <td>${patient.fullName}</td>

            <td>${patient.diagnosis.diagnosis}</td>

            <td>${patient.phone}</td>

            <td>

                <span class="status active">

                    ${patient.status}

                </span>

            </td>

            <td>

                <button
                    class="primary-btn view-patient"
                    data-id="${patient.id}">

                    عرض

                </button>

            </td>

        </tr>

        `;

    });

    patientsCount.textContent = `${list.length} مريض`;
    bindPatientButtons();

}
function updatePatientsCount(count) {
    if (!patientsCount) return;
    patientsCount.textContent = `إجمالي المرضى : ${count}`;
}
function bindPatientButtons() {

    const buttons = document.querySelectorAll(".view-patient");

    buttons.forEach(button => {

        button.addEventListener("click", function () {

            const patientId = this.dataset.id;

            localStorage.setItem("currentPatientId", patientId);

            window.location.href = "patient.html";

        });

    });

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
function searchPatients(searchValue) {

    const value = searchValue.trim().toLowerCase();

    if (value === "") {

        renderPatients(database.patients);

        return;

    }

    const filteredPatients = database.patients.filter(patient => {

        return (

            patient.fullName.toLowerCase().includes(value) ||

            patient.fileNumber.toLowerCase().includes(value) ||

            patient.phone.includes(value)

        );

    });

    if (filteredPatients.length === 0) {

        renderEmptyState();

        return;

    }

    renderPatients(filteredPatients);

}

patientSearch?.addEventListener("input", function () {

    searchPatients(this.value);

});

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
function renderNotifications() {

    notificationsList.innerHTML = "";

    database.notifications.forEach(notification => {

        notificationsList.innerHTML += `

        <div class="notification-item">

            <i class="bi ${notification.icon}"></i>

            <div>

                <strong>${notification.title}</strong>

                <small>${notification.time}</small>

            </div>

        </div>

        `;

    });

    notificationsCount.textContent = database.notifications.length;

}

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

   renderDoctorInfo();

renderPatients();

renderNotifications();

}
init();
