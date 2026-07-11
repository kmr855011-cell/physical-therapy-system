console.log("Secretary Dashboard Loaded");

/* ==========================================================
                        CONSTANTS
========================================================== */

const MOBILE_BREAKPOINT = 768;
const TOAST_DURATION = 3000;
const PHONE_REGEX = /^01[0125][0-9]{8}$/;

/* ==========================================================
                        APPLICATION STATE
========================================================== */

const state = {

    currentPage: "dashboard",

    selectedPatient: null,

    sidebarOpen: false

};

/* ==========================================================
                        SIDEBAR
========================================================== */

const sidebar = document.querySelector("#sidebar");
const sidebarOverlay = document.querySelector(".sidebar-overlay");
const menuToggle = document.querySelector("#menu-toggle");

/* ==========================================================
                        PAGE
========================================================== */

const pageTitle = document.querySelector("#page-title");

const menuLinks = document.querySelectorAll(".sidebar-menu a");

const sections = document.querySelectorAll(".content-section");

const sectionLinks = document.querySelectorAll(".section-link");

/* ==========================================================
                        SEARCH
========================================================== */

const globalSearch = document.querySelector("#global-search");

/* ==========================================================
                        TABLES
========================================================== */

const patientsTableBody = document.querySelector(".patients-table tbody");

/* ==========================================================
                        MODALS
========================================================== */

const modals = {

    patient: document.querySelector("#patient-modal"),

    appointment: document.querySelector("#appointment-modal")

};

const modalButtons = {

    addPatient: document.querySelector(".add-patient-btn"),

    addAppointment: document.querySelector(".add-appointment-btn"),

    closePatient: document.querySelector(".close-patient-modal"),

    closeAppointment: document.querySelector(".close-appointment-modal")

};
console.log(modals);
console.log(modalButtons);
/* ==========================================================
                        PATIENT FORM
========================================================== */

const addPatientForm = document.querySelector(".add-patient-form");

const patientNameInput = document.querySelector("#patient-name");

const patientPhoneInput = document.querySelector("#patient-phone");

const patientNameError = document.querySelector("#patient-name-error");

const patientPhoneError = document.querySelector("#patient-phone-error");

/* ==========================================================
                        PROFILE
========================================================== */

const profileBtn = document.querySelector(".profile-btn");

const profileDropdown = document.querySelector(".profile-dropdown");

/* ==========================================================
                    NOTIFICATIONS
========================================================== */

const notificationBtn = document.querySelector(".notification-btn");

const notificationDropdown = document.querySelector(".notification-dropdown");

/* ==========================================================
                        DATABASE
========================================================== */

const clinicDB = {

    patients: [

        {
            id: "1001",
            name: "محمد أحمد",
            phone: "01012345678",
            session: "03/07/2026",
            status: "نشط"
        },

        {
            id: "1002",
            name: "أحمد علي",
            phone: "01022223333",
            session: "01/07/2026",
            status: "نشط"
        },

        {
            id: "1003",
            name: "محمود حسن",
            phone: "01098765432",
            session: "28/06/2026",
            status: "معلق"
        },

        {
            id: "1004",
            name: "عبدالله محمد",
            phone: "01123456789",
            session: "27/06/2026",
            status: "نشط"
        },

        {
            id: "1005",
            name: "يوسف سامح",
            phone: "01234567890",
            session: "25/06/2026",
            status: "منتهي"
        }

    ],

    appointments: [],

    notifications: []

};

/* ==========================================================
                        SIDEBAR
========================================================== */

function openSidebar() {

    state.sidebarOpen = true;

    sidebar.classList.add("active");

    sidebarOverlay.classList.add("active");

}

function closeSidebar() {

    state.sidebarOpen = false;

    sidebar.classList.remove("active");

    sidebarOverlay.classList.remove("active");

}

menuToggle?.addEventListener("click", openSidebar);

sidebarOverlay?.addEventListener("click", closeSidebar);

/* ==========================================================
                        NAVIGATION
========================================================== */

function showSection(page) {

    sections.forEach(section => {

        section.classList.remove("active-section");

    });

    const currentSection = document.querySelector(`#${page}-section`);

    if (!currentSection) return;

    currentSection.classList.add("active-section");

    pageTitle.textContent = currentSection.dataset.title || "";

    state.currentPage = page;

}

function setActiveSidebar(link) {

    document.querySelectorAll(".sidebar-item").forEach(item => {

        item.classList.remove("active");

    });

    link.closest(".sidebar-item").classList.add("active");

}

function navigateTo(page) {

    const sidebarLink = document.querySelector(
        `.sidebar-menu a[data-page="${page}"]`
    );

    if (sidebarLink) {

        setActiveSidebar(sidebarLink);

    }

    showSection(page);

    if (window.innerWidth <= MOBILE_BREAKPOINT) {

        closeSidebar();

    }

}

menuLinks.forEach(link => {

    link.addEventListener("click", e => {

        e.preventDefault();

        navigateTo(link.dataset.page);

    });

});

sectionLinks.forEach(link => {

    link.addEventListener("click", e => {

        e.preventDefault();

        navigateTo(link.dataset.page);

    });

});

/* ==========================================================
                        MODALS
========================================================== */

function openModal(modal) {

    if (!modal) return;

    modal.classList.add("show");

    document.body.style.overflow = "hidden";

}

function closeModal(modal) {

    if (!modal) return;

    modal.classList.remove("show");

    document.body.style.overflow = "";

}

/* =========================
        PATIENT MODAL
========================= */

modalButtons.addPatient?.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("Add Patient Clicked");

    openModal(modals.patient);
    console.log(modals.patient.className);

    console.log(getComputedStyle(modals.patient).visibility);

    console.log(getComputedStyle(modals.patient).opacity);

    console.log(getComputedStyle(modals.patient).display);

});

modalButtons.closePatient?.addEventListener("click", () => {

    closeModal(modals.patient);

});

/* =========================
     APPOINTMENT MODAL
========================= */

modalButtons.addAppointment?.addEventListener("click", () => {

    openModal(modals.appointment);

});

modalButtons.closeAppointment?.addEventListener("click", () => {

    closeModal(modals.appointment);

});

/* =========================
     CLOSE ON OVERLAY
========================= */

Object.values(modals).forEach(modal => {

    modal?.addEventListener("click", e => {

        if (e.target === modal) {

            closeModal(modal);

        }

    });

});

/* =========================
        ESC KEY
========================= */

document.addEventListener("keydown", e => {

    if (e.key !== "Escape") return;

    Object.values(modals).forEach(modal => {

        closeModal(modal);

    });

});
/* ==========================================================
                    PATIENT VALIDATION
========================================================== */

function clearErrors() {

    patientNameError.textContent = "";
    patientPhoneError.textContent = "";

}

function showError(element, message) {

    if (element === patientNameInput) {

        patientNameError.textContent = message;

    } else if (element === patientPhoneInput) {

        patientPhoneError.textContent = message;

    }

}

function validatePatientForm() {

    clearErrors();

    let valid = true;

    const name = patientNameInput.value.trim();

    const phone = patientPhoneInput.value.trim();

    if (!name) {

        showError(patientNameInput, "يرجى إدخال اسم المريض");

        valid = false;

    }

    if (!phone) {

        showError(patientPhoneInput, "يرجى إدخال رقم الهاتف");

        valid = false;

    } else if (!PHONE_REGEX.test(phone)) {

        showError(patientPhoneInput, "رقم الهاتف غير صحيح");

        valid = false;

    }

    return valid;

}

addPatientForm?.addEventListener("submit", e => {

    e.preventDefault();

    if (!validatePatientForm()) return;

    console.log("Patient Created Successfully");

    addPatientForm.reset();

    clearErrors();

    closeModal(modals.patient);

});

/* ==========================================================
                        RESPONSIVE
========================================================== */

window.addEventListener("resize", () => {

    if (window.innerWidth > MOBILE_BREAKPOINT) {

        closeSidebar();

    }

});

/* ==========================================================
                        DROPDOWNS
========================================================== */

function toggleDropdown(dropdown) {

    dropdown?.classList.toggle("active");

}

function closeDropdowns() {

    profileDropdown?.classList.remove("active");

    notificationDropdown?.classList.remove("active");

}

profileBtn?.addEventListener("click", e => {

    e.stopPropagation();

    notificationDropdown?.classList.remove("active");

    toggleDropdown(profileDropdown);

});

notificationBtn?.addEventListener("click", e => {

    e.stopPropagation();

    profileDropdown?.classList.remove("active");

    toggleDropdown(notificationDropdown);

});

document.addEventListener("click", closeDropdowns);

/* ==========================================================
                        TABLE
========================================================== */

function getStatusClass(status) {

    switch (status) {

        case "نشط":
            return "active";

        case "معلق":
            return "pending";

        default:
            return "inactive";

    }

}

function renderPatients(data) {

    patientsTableBody.innerHTML = data.map(patient => `

        <tr>

            <td>#${patient.id}</td>

            <td>${patient.name}</td>

            <td>${patient.phone}</td>

            <td>${patient.session}</td>

            <td>

                <span class="status ${getStatusClass(patient.status)}">

                    ${patient.status}

                </span>

            </td>

            <td>

                <button
                    class="primary-btn open-patient-btn"
                    data-id="${patient.id}">

                    فتح الملف

                </button>

            </td>

        </tr>

    `).join("");

}

/* ==========================================================
                    OPEN PATIENT
========================================================== */

patientsTableBody?.addEventListener("click", e => {

    const button = e.target.closest(".open-patient-btn");

    if (!button) return;

    const patientId = button.dataset.id;

    state.selectedPatient = patientId;

    console.log("Open Patient:", patientId);

    // window.location.href = "patient.html?id=" + patientId;

});

/* ==========================================================
                    GLOBAL SEARCH
========================================================== */

function searchPatients() {

    const value = globalSearch.value.trim().toLowerCase();

    navigateTo("patients");

    if (!value) {

        renderPatients(clinicDB.patients);

        return;

    }

    const filteredPatients = clinicDB.patients.filter(patient => {

        return (

            patient.name.toLowerCase().includes(value) ||

            patient.phone.includes(value) ||

            patient.id.includes(value)

        );

    });

    renderPatients(filteredPatients);

}

globalSearch?.addEventListener("input", searchPatients);

/* ==========================================================
                    INITIALIZE APP
========================================================== */

renderPatients(clinicDB.patients);