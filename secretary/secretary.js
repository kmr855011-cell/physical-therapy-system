console.log("Secretary Dashboard Loaded");

/* ==========================================================
                        SELECTORS
========================================================== */

const sidebar = document.querySelector("#sidebar");
const sidebarOverlay = document.querySelector(".sidebar-overlay");
const menuToggle = document.querySelector("#menu-toggle");
const pageTitle = document.querySelector("#page-title");
const sections = document.querySelectorAll(".content-section");
const menuLinks = document.querySelectorAll(".sidebar-menu a");
const sectionLinks = document.querySelectorAll(".section-link");
const globalSearch = document.querySelector("#global-search");
const patientsTableBody = document.querySelector("#patients-table-body");
const sessionsTableBody = document.querySelector("#sessions-table-body");
const patientsCount = document.querySelector(".patients-count");
const appointmentsTableBody = document.querySelector("#appointments-table-body");
const profileBtn = document.querySelector(".profile-btn");
const profileDropdown = document.querySelector(".profile-dropdown");
const notificationBtn = document.querySelector(".notification-btn");
const notificationDropdown = document.querySelector(".notification-dropdown");
const patientModal = document.querySelector("#patient-modal");
const appointmentModal = document.querySelector("#appointment-modal");
const addPatientBtn = document.querySelector(".add-patient-btn");
const addAppointmentBtn = document.querySelector(".add-appointment-btn");
const closePatientModalBtn = document.querySelector(".close-patient-modal");
const closeAppointmentModalBtn = document.querySelector(".close-appointment-modal");
const addPatientForm = document.querySelector(".add-patient-form");
const patientNameInput = document.querySelector("#patient-name");
const patientPhoneInput = document.querySelector("#patient-phone");
const patientNameError = document.querySelector("#patient-name-error");
const patientPhoneError = document.querySelector("#patient-phone-error");
const logoutBtn = document.querySelector(".logout-btn");
const toastContainer = document.querySelector("#toast-container");

// Appointment form elements
const appointmentForm = document.querySelector(".appointment-form");
const appointmentPatient = document.querySelector("#appointment-patient");
const appointmentDate = document.querySelector("#appointment-date");
const appointmentTime = document.querySelector("#appointment-time");

/* ==========================================================
                        APP STATE
========================================================== */

const state = {
    currentPage: "dashboard",
    selectedPatient: null,
    sidebarOpen: false
};

/* ==========================================================
                        DATABASE
========================================================== */

const clinicDB = {
    patients: [
        { id: "1001", name: "محمد أحمد", phone: "01012345678", session: "03 / 07 / 2026", status: "نشط" },
        { id: "1002", name: "أحمد علي", phone: "01022223333", session: "01 / 07 / 2026", status: "نشط" },
        { id: "1003", name: "محمود حسن", phone: "01098765432", session: "28 / 06 / 2026", status: "معلق" },
        { id: "1004", name: "عبدالله محمد", phone: "01123456789", session: "27 / 06 / 2026", status: "نشط" },
        { id: "1005", name: "يوسف سامح", phone: "01234567890", session: "25 / 06 / 2026", status: "منتهي" }
    ],
    sessions: [
        { id: 1, time: "09:00 ص", patient: "محمد أحمد", diagnosis: "خشونة الركبة" },
        { id: 2, time: "10:30 ص", patient: "أحمد علي", diagnosis: "قطع رباط صليبي" }
    ],
    appointments: [
        { id: 1, patient: "محمد أحمد", date: "12 / 07 / 2026", type: "جلسة علاج طبيعي", status: "قيد الانتظار" },
        { id: 2, patient: "يوسف سامح", date: "13 / 07 / 2026", type: "جلسة متابعة", status: "تم التأكيد" }
    ]
};

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

/* ==========================================================
                        SIDEBAR
========================================================== */

function openSidebar() {
    sidebar.classList.add("active");
    sidebarOverlay.classList.add("active");
    state.sidebarOpen = true;
}

function closeSidebar() {
    sidebar.classList.remove("active");
    sidebarOverlay.classList.remove("active");
    state.sidebarOpen = false;
}

menuToggle?.addEventListener("click", openSidebar);
sidebarOverlay?.addEventListener("click", closeSidebar);

/* ==========================================================
                        NAVIGATION
========================================================== */

function updatePageTitle(section) {
    pageTitle.textContent = section.dataset.title;
}

function updateSearchPlaceholder() {
    switch (state.currentPage) {
        case "patients":
            globalSearch.placeholder = "ابحث باسم المريض أو رقم الملف";
            break;
        case "sessions":
            globalSearch.placeholder = "ابحث عن جلسة";
            break;
        case "appointments":
            globalSearch.placeholder = "ابحث عن موعد";
            break;
        default:
            globalSearch.placeholder = "ابحث...";
    }
}

function showSection(page) {
    sections.forEach(section => section.classList.remove("active-section"));
    const currentSection = document.querySelector(`#${page}-section`);
    if (!currentSection) return;
    currentSection.classList.add("active-section");
    state.currentPage = page;
    updatePageTitle(currentSection);
    updateSearchPlaceholder();
}

function setActiveMenu(link) {
    document.querySelectorAll(".sidebar-item").forEach(item => item.classList.remove("active"));
    link.closest(".sidebar-item").classList.add("active");
}

function navigate(page) {
    const link = document.querySelector(`.sidebar-menu a[data-page="${page}"]`);
    if (link) setActiveMenu(link);
    showSection(page);
    if (window.innerWidth <= 768) closeSidebar();
}

menuLinks.forEach(link => {
    link.addEventListener("click", function (event) {
        event.preventDefault();
        navigate(link.dataset.page);
    });
});

sectionLinks.forEach(link => {
    link.addEventListener("click", function (event) {
        event.preventDefault();
        navigate(link.dataset.page);
    });
});

/* ==========================================================
                        TABLES
========================================================== */

function getStatusClass(status) {
    switch (status) {
        case "نشط": return "active";
        case "معلق": return "pending";
        case "منتهي": return "inactive";
        case "تم التأكيد": return "active";
        case "قيد الانتظار": return "pending";
        default: return "";
    }
}

/* ==========================================================
                    PATIENTS COUNT
========================================================== */

function updatePatientsCount(count) {
    if (!patientsCount) return;
    patientsCount.textContent = `إجمالي المرضى : ${count}`;
}

function renderPatients(data = clinicDB.patients) {
    if (!patientsTableBody) return;
    let html = "";
    data.forEach(patient => {
        html += `
        <tr>
            <td>#${patient.id}</td>
            <td>${patient.name}</td>
            <td>${patient.phone}</td>
            <td>${patient.session}</td>
            <td><span class="status ${getStatusClass(patient.status)}">${patient.status}</span></td>
            <td>
                <button class="primary-btn open-patient-btn" data-id="${patient.id}">
                    فتح الملف
                </button>
            </td>
        </tr>
        `;
    });
    patientsTableBody.innerHTML = html;
    updatePatientsCount(data.length);
}

function renderSessions(data = clinicDB.sessions) {
    if (!sessionsTableBody) return;
    let html = "";
    data.forEach(session => {
        html += `
        <tr>
            <td>${session.time}</td>
            <td>${session.patient}</td>
            <td>${session.diagnosis}</td>
            <td>
                <button class="primary-btn open-patient-btn" data-id="${session.id}">
                    فتح الملف
                </button>
            </td>
        </tr>
        `;
    });
    sessionsTableBody.innerHTML = html;
}

function renderAppointments(data = clinicDB.appointments) {
    if (!appointmentsTableBody) return;
    let html = "";
    data.forEach(appointment => {
        html += `
        <tr>
            <td>${appointment.date}</td>
            <td>${appointment.patient}</td>
            <td>${appointment.type}</td>
            <td><span class="status ${getStatusClass(appointment.status)}">${appointment.status}</span></td>
            <td>
                <button class="primary-btn">عرض</button>
            </td>
        </tr>
        `;
    });
    appointmentsTableBody.innerHTML = html;
}

/* ==========================================================
                    EMPTY STATE
========================================================== */

function renderEmptyState(tableBody, columns) {
    tableBody.innerHTML = `
        <tr>
            <td colspan="${columns}">
                <div class="empty-state">
                    <i class="bi bi-search"></i>
                    <h3>لا توجد نتائج</h3>
                    <p>لم يتم العثور على بيانات مطابقة.</p>
                </div>
            </td>
        </tr>
    `;
}

/* ==========================================================
                    OPEN PATIENT (FIXED)
========================================================== */

document.addEventListener("click", function (event) {
    const button = event.target.closest(".open-patient-btn");
    if (!button) return;
    const id = button.dataset.id;
    showToast("جاري فتح ملف المريض...", "info", "bi-folder2-open");
    setTimeout(() => {
        window.location.href = `patient.html?id=${id}`;
    }, 300);
});

/* ==========================================================
                        SEARCH
========================================================== */

function searchPatients(value) {
    return clinicDB.patients.filter(patient =>
        patient.name.includes(value) || patient.phone.includes(value) || patient.id.includes(value)
    );
}

function searchSessions(value) {
    return clinicDB.sessions.filter(session =>
        session.patient.includes(value) || session.diagnosis.includes(value)
    );
}

function searchAppointments(value) {
    return clinicDB.appointments.filter(appointment =>
        appointment.patient.includes(value) || appointment.type.includes(value)
    );
}

function handleSearch() {
    const value = globalSearch.value.trim();
    switch (state.currentPage) {
        case "patients": {
            const filtered = searchPatients(value);
            filtered.length === 0 ? renderEmptyState(patientsTableBody, 6) : renderPatients(filtered);
            break;
        }
        case "sessions": {
            const filtered = searchSessions(value);
            filtered.length === 0 ? renderEmptyState(sessionsTableBody, 4) : renderSessions(filtered);
            break;
        }
        case "appointments": {
            const filtered = searchAppointments(value);
            filtered.length === 0 ? renderEmptyState(appointmentsTableBody, 5) : renderAppointments(filtered);
            break;
        }
    }
}

globalSearch.addEventListener("input", handleSearch);

/* ==========================================================
                        PROFILE
========================================================== */

function toggleProfile() {
    profileDropdown.classList.toggle("active");
    notificationDropdown.classList.remove("active");
}

profileBtn?.addEventListener("click", function (event) {
    event.stopPropagation();
    toggleProfile();
});

/* ==========================================================
                    NOTIFICATIONS
========================================================== */

function toggleNotifications() {
    notificationDropdown.classList.toggle("active");
    profileDropdown.classList.remove("active");
}

notificationBtn?.addEventListener("click", function (event) {
    event.stopPropagation();
    toggleNotifications();
});

document.addEventListener("click", function () {
    profileDropdown.classList.remove("active");
    notificationDropdown.classList.remove("active");
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

addPatientBtn?.addEventListener("click", () => openModal(patientModal));
addAppointmentBtn?.addEventListener("click", () => openModal(appointmentModal));
closePatientModalBtn?.addEventListener("click", () => closeModal(patientModal));
closeAppointmentModalBtn?.addEventListener("click", () => closeModal(appointmentModal));

patientModal?.addEventListener("click", (event) => {
    if (event.target === patientModal) closeModal(patientModal);
});
appointmentModal?.addEventListener("click", (event) => {
    if (event.target === appointmentModal) closeModal(appointmentModal);
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeModal(patientModal);
        closeModal(appointmentModal);
    }
});

/* ==========================================================
                    PATIENT FORM
========================================================== */

function clearPatientErrors() {
    patientNameError.textContent = "";
    patientPhoneError.textContent = "";
}

function validatePatientForm() {
    clearPatientErrors();
    let valid = true;
    if (patientNameInput.value.trim() === "") {
        patientNameError.textContent = "يرجى إدخال اسم المريض";
        valid = false;
    }
    const phone = patientPhoneInput.value.trim();
    if (phone === "") {
        patientPhoneError.textContent = "يرجى إدخال رقم الهاتف";
        valid = false;
    } else if (!/^01[0125][0-9]{8}$/.test(phone)) {
        patientPhoneError.textContent = "رقم الهاتف غير صحيح";
        valid = false;
    }
    return valid;
}

addPatientForm?.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!validatePatientForm()) return;
    const newPatient = {
        id: String(clinicDB.patients.length + 1001),
        name: patientNameInput.value.trim(),
        phone: patientPhoneInput.value.trim(),
        session: "-",
        status: "نشط"
    };
    clinicDB.patients.push(newPatient);
    renderPatients();
    addPatientForm.reset();
    clearPatientErrors();
    closeModal(patientModal);
    showToast(`تمت إضافة المريض ${newPatient.name} بنجاح`, "success", "bi-person-plus-fill");
});

/* ==========================================================
                    APPOINTMENT FORM (FIXED)
========================================================== */

appointmentForm?.addEventListener("submit", function (event) {
    event.preventDefault();

    const patient = appointmentPatient.value.trim();
    const date = appointmentDate.value.trim();
    const time = appointmentTime.value.trim();

    if (!patient || !date || !time) {
        showToast("يرجى ملء جميع الحقول", "warning", "bi-exclamation-triangle");
        return;
    }

    // تنسيق التاريخ (YYYY-MM-DD -> DD / MM / YYYY)
    const dateParts = date.split("-");
    const formattedDate = `${dateParts[2]} / ${dateParts[1]} / ${dateParts[0]}`;

    const newAppointment = {
        id: clinicDB.appointments.length + 1,
        patient: patient,
        date: formattedDate,
        type: "جلسة علاج طبيعي",
        status: "قيد الانتظار"
    };

    clinicDB.appointments.push(newAppointment);
    renderAppointments();
    appointmentForm.reset();
    closeModal(appointmentModal);
    showToast(`تم إضافة موعد للمريض ${patient} بنجاح`, "success", "bi-calendar-check");
});

/* ==========================================================
                    LOGOUT - DROPDOWN (FIXED)
========================================================== */

// زر تسجيل الخروج في القائمة الجانبية
logoutBtn?.addEventListener("click", function () {
    showToast("جاري تسجيل الخروج...", "info", "bi-box-arrow-right");
    setTimeout(() => {
        window.location.href = "index.html";
    }, 500);
});

// زر تسجيل الخروج في الـ Profile Dropdown
const logoutDropdownBtn = document.querySelector(".logout-item");
logoutDropdownBtn?.addEventListener("click", function (event) {
    event.stopPropagation(); // منع إغلاق dropdown قبل تنفيذ الإجراء
    showToast("جاري تسجيل الخروج...", "info", "bi-box-arrow-right");
    setTimeout(() => {
        window.location.href = "index.html";
    }, 500);
});
/* ==========================================================
                    RESPONSIVE
========================================================== */

window.addEventListener("resize", function () {
    if (window.innerWidth > 768) closeSidebar();
});

/* ==========================================================
                        INIT
========================================================== */

function init() {
    renderPatients();
    renderSessions();
    renderAppointments();
    updateSearchPlaceholder();
}

init();
