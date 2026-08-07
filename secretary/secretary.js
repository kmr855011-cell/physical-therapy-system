import database from "../data/mockDatabase.js";

console.log("Secretary Dashboard Loaded");

/* ==========================================================
                        SELECTORS
========================================================== */

const sidebar = document.querySelector("#sidebar");
const sidebarOverlay = document.querySelector(".sidebar-overlay");
const menuToggle = document.querySelector("#menu-toggle");
const pageTitle = document.querySelector("#page-title");
const globalSearch = document.querySelector("#global-search");
const profileBtn = document.querySelector(".profile-btn");
const profileDropdown = document.querySelector(".profile-dropdown");
const notificationBtn = document.querySelector(".notification-btn");
const notificationDropdown = document.querySelector(".notification-dropdown");
const notificationsCount = document.querySelector("#notifications-count");
const sections = document.querySelectorAll(".content-section");
const menuLinks = document.querySelectorAll(".sidebar-menu a");
const statsTotalPatients = document.querySelector("#stats-total-patients");
const statsTodaySessions = document.querySelector("#stats-today-sessions");
const statsNewPatients = document.querySelector("#stats-new-patients");
const patientsTableBody = document.querySelector("#patients-table-body");
const appointmentsTableBody = document.querySelector("#appointments-table-body");
const sessionsTableBody = document.querySelector("#sessions-table-body");
const todaySessionsBody = document.querySelector("#today-sessions-body");
const patientsCount = document.querySelector(".patients-count");
const doctorFilterTags = document.querySelector("#doctor-filter-tags");
const appointmentFilterTags = document.querySelector("#appointment-filter-tags");
const sessionFilterTags = document.querySelector("#session-filter-tags");

// User Info & Notifications
const secretaryNameSidebar = document.querySelector(".secretary-name h2");
const profileNameSpan = document.querySelector(".profile-btn span");
const profileDropdownName = document.querySelector(".profile-info h4");
const notificationsList = document.querySelector("#notifications-list");

// Patient Modal
const patientModal = document.querySelector("#patient-modal");
const patientForm = document.querySelector("#patient-form");
const patientNameInput = document.querySelector("#patient-name");
const patientPhoneInput = document.querySelector("#patient-phone");
const patientAgeInput = document.querySelector("#patient-age");
const patientGenderInput = document.querySelector("#patient-gender");
const patientDoctorInput = document.querySelector("#patient-doctor");
const patientDiagnosisInput = document.querySelector("#patient-diagnosis");
const patientStartDateInput = document.querySelector("#patient-start-date");
const patientEditIdInput = document.querySelector("#patient-edit-id");
const patientModalTitle = document.querySelector("#patient-modal-title");
const patientModalSubtitle = document.querySelector("#patient-modal-subtitle");
const patientSubmitBtn = document.querySelector("#patient-submit-btn");
const patientNameError = document.querySelector("#patient-name-error");
const patientPhoneError = document.querySelector("#patient-phone-error");
const closePatientModalBtns = document.querySelectorAll(".close-patient-modal");

// Appointment Modal
const appointmentModal = document.querySelector("#appointment-modal");
const appointmentForm = document.querySelector(".appointment-form");
const appointmentPatient = document.querySelector("#appointment-patient");
const appointmentDate = document.querySelector("#appointment-date");
const appointmentTime = document.querySelector("#appointment-time");
const closeAppointmentModalBtn = document.querySelector(".close-appointment-modal");

// Session Modal
const sessionModal = document.querySelector("#session-modal");
const sessionForm = document.querySelector("#session-form");
const sessionPatient = document.querySelector("#session-patient");
const sessionDate = document.querySelector("#session-date");
const sessionTime = document.querySelector("#session-time");
const sessionStatus = document.querySelector("#session-status");
const sessionDiagnosis = document.querySelector("#session-diagnosis");
const sessionNotes = document.querySelector("#session-notes");
const sessionSubmitBtn = document.querySelector("#session-submit-btn");
const closeSessionModalBtns = document.querySelectorAll(".close-session-modal");

// ===== Buttons - البحث داخل الأقسام المحددة لتجنب التعارض =====
const patientsSection = document.querySelector("#patients-section");
const appointmentsSection = document.querySelector("#appointments-section");
const sessionsSection = document.querySelector("#sessions-section");

const addPatientBtn = patientsSection?.querySelector(".add-patient-btn");
const addAppointmentBtn = appointmentsSection?.querySelector(".add-appointment-btn");
const addSessionBtn = sessionsSection?.querySelector(".add-session-btn");

const logoutBtn = document.querySelector(".logout-btn");
const logoutDropdownBtn = document.querySelector(".logout-item");

// Toast
const toastContainer = document.querySelector("#toast-container");

/* ==========================================================
                        APP STATE
========================================================== */

const state = {
    currentPage: "dashboard",
    sidebarOpen: false,
    selectedDoctorId: "all",
    editingPatientId: null,
    searchQuery: "",
    selectedAppointmentType: "all",
    selectedSessionStatus: "all"
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
                        STATUS HELPER
========================================================== */

function getStatusClass(status) {
    switch (status) {
        case "نشط":
        case "active":
            return "active";
        case "معلق":
        case "pending":
            return "pending";
        case "منتهي":
        case "inactive":
            return "inactive";
        case "تم التأكيد":
            return "active";
        case "قيد الانتظار":
            return "pending";
        default:
            return "";
    }
}

function getStatusText(status) {
    switch (status) {
        case "active":
            return "نشط";
        case "pending":
            return "معلق";
        case "inactive":
            return "منتهي";
        default:
            return status;
    }
}

/* ==========================================================
                        DATE HELPERS
========================================================== */

function getTodayDate() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    return `${day}/${month}/${year}`;
}

function formatDateForDisplay(dateStr) {
    if (!dateStr) return "-";
    if (dateStr.includes('-')) {
        const parts = dateStr.split('-');
        return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return dateStr;
}

/* ==========================================================
                        HELPERS FOR SESSIONS
========================================================== */

function getAllSessions() {
    if (!database.patients || !Array.isArray(database.patients)) {
        return [];
    }
    const allSessions = [];
    database.patients.forEach(patient => {
        if (patient.sessions && Array.isArray(patient.sessions)) {
            patient.sessions.forEach(session => {
                allSessions.push({
                    ...session,
                    patientId: patient.id,
                    patientName: patient.fullName
                });
            });
        }
    });
    return allSessions;
}

function getPatientLastSession(patientId) {
    const patient = database.patients.find(p => p.id === patientId);
    if (!patient) return "-";
    if (!patient.sessions || patient.sessions.length === 0) return "-";
    const sorted = [...patient.sessions].sort((a, b) => b.date.localeCompare(a.date));
    return sorted[0].date || "-";
}

function getPatientDiagnosis(patientId) {
    const patient = database.patients.find(p => p.id === patientId);
    if (!patient) return "-";
    return patient.diagnosis?.diagnosis || "-";
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
            globalSearch.placeholder = "ابحث باسم المريض أو رقم الملف أو الهاتف";
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

/* ==========================================================
                        FILTERS
========================================================== */

// Doctor Filter
function renderDoctorFilters() {
    if (!doctorFilterTags) return;

    doctorFilterTags.innerHTML = '';

    const allBtn = document.createElement("button");
    allBtn.className = `filter-tag ${state.selectedDoctorId === "all" ? "active" : ""}`;
    allBtn.dataset.doctorId = "all";
    allBtn.textContent = "الكل";
    doctorFilterTags.appendChild(allBtn);

    if (database.doctors && Array.isArray(database.doctors)) {
        database.doctors.forEach(doctor => {
            const btn = document.createElement("button");
            btn.className = `filter-tag ${state.selectedDoctorId === doctor.id ? "active" : ""}`;
            btn.dataset.doctorId = doctor.id;
            btn.textContent = doctor.fullName;
            doctorFilterTags.appendChild(btn);
        });
    }

    doctorFilterTags.querySelectorAll(".filter-tag").forEach(btn => {
        btn.addEventListener("click", function (e) {
            e.preventDefault();
            const doctorId = this.dataset.doctorId;
            state.selectedDoctorId = doctorId;
            renderDoctorFilters();
            renderPatients();
        });
    });
}

// Appointment Type Filter
function renderAppointmentFilters() {
    if (!appointmentFilterTags) return;
    appointmentFilterTags.querySelectorAll(".filter-tag").forEach(btn => {
        btn.addEventListener("click", function () {
            appointmentFilterTags.querySelectorAll(".filter-tag").forEach(b => b.classList.remove("active"));
            this.classList.add("active");
            state.selectedAppointmentType = this.dataset.type;
            renderAppointments();
        });
    });
}

// Session Status Filter
function renderSessionFilters() {
    if (!sessionFilterTags) return;
    sessionFilterTags.querySelectorAll(".filter-tag").forEach(btn => {
        btn.addEventListener("click", function () {
            sessionFilterTags.querySelectorAll(".filter-tag").forEach(b => b.classList.remove("active"));
            this.classList.add("active");
            state.selectedSessionStatus = this.dataset.status;
            renderSessions();
        });
    });
}

/* ==========================================================
                        RENDER: PATIENTS
========================================================== */

function getFilteredPatients() {
    if (!database.patients || !Array.isArray(database.patients)) {
        return [];
    }

    let patients = [...database.patients];

    if (state.selectedDoctorId !== "all") {
        const doctorIdNum = parseInt(state.selectedDoctorId);
        patients = patients.filter(p => p.doctorId === doctorIdNum);
    }

    if (state.searchQuery) {
        const query = state.searchQuery.toLowerCase();
        patients = patients.filter(p =>
            p.fullName.toLowerCase().includes(query) ||
            String(p.id).includes(query) ||
            (p.fileNumber && p.fileNumber.toLowerCase().includes(query)) ||
            p.phone.includes(query) ||
            (p.diagnosis && p.diagnosis.diagnosis && p.diagnosis.diagnosis.toLowerCase().includes(query))
        );
    }

    return patients;
}

function renderPatients() {
    if (!patientsTableBody) return;

    if (!database.patients || !Array.isArray(database.patients)) {
        patientsTableBody.innerHTML = `
            <tr>
                <td colspan="6">
                    <div class="empty-state">
                        <i class="bi bi-exclamation-triangle"></i>
                        <h3>خطأ في تحميل البيانات</h3>
                        <p>لم يتم تحميل قاعدة البيانات بشكل صحيح.</p>
                    </div>
                </td>
            </tr>
        `;
        if (patientsCount) patientsCount.textContent = "إجمالي المرضى : 0";
        return;
    }

    const patients = getFilteredPatients();

    if (patients.length === 0) {
        patientsTableBody.innerHTML = `
            <tr>
                <td colspan="6">
                    <div class="empty-state">
                        <i class="bi bi-search"></i>
                        <h3>لا يوجد مرضى</h3>
                        <p>لم يتم العثور على مرضى مطابقين للبحث.</p>
                    </div>
                </td>
            </tr>
        `;
        if (patientsCount) patientsCount.textContent = "إجمالي المرضى : 0";
        return;
    }

    let html = "";
    patients.forEach(patient => {
        const lastSession = getPatientLastSession(patient.id);
        const statusText = getStatusText(patient.status);
        html += `
            <tr>
                <td>#${patient.id}</td>
                <td>${patient.fullName}</td>
                <td>${patient.phone}</td>
                <td>${lastSession}</td>
                <td><span class="status ${getStatusClass(patient.status)}">${statusText}</span></td>
                <td>
                    <button class="primary-btn open-patient-btn" data-id="${patient.id}">
                        فتح الملف
                    </button>
                    <button class="secondary-btn edit-patient-btn" data-id="${patient.id}">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button class="secondary-btn delete-patient-btn" data-id="${patient.id}" style="color: var(--color-danger);">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    });

    patientsTableBody.innerHTML = html;
    if (patientsCount) patientsCount.textContent = `إجمالي المرضى : ${patients.length}`;
}

/* ==========================================================
                        RENDER: TODAY SESSIONS
========================================================== */

function renderTodaySessions() {
    if (!todaySessionsBody) return;

    const allSessions = getAllSessions();
    const today = getTodayDate();
    const todaySessions = allSessions.filter(s => s.date === today);

    if (todaySessions.length === 0) {
        todaySessionsBody.innerHTML = `
            <tr>
                <td colspan="4">
                    <div class="empty-state" style="padding: 20px;">
                        <p>لا توجد جلسات اليوم</p>
                        <small style="color: var(--color-text-light);">(تاريخ اليوم: ${today})</small>
                    </div>
                </td>
            </tr>
        `;
        return;
    }

    let html = "";
    todaySessions.forEach(session => {
        html += `
            <tr>
                <td>${session.time || "-"}</td>
                <td>${session.patientName || "غير معروف"}</td>
                <td>${session.diagnosis || getPatientDiagnosis(session.patientId)}</td>
                <td>
                    <button class="primary-btn open-patient-btn" data-id="${session.patientId}">
                        فتح الملف
                    </button>
                </td>
            </tr>
        `;
    });

    todaySessionsBody.innerHTML = html;
}

/* ==========================================================
                        RENDER: SESSIONS
========================================================== */

function renderSessions() {
    if (!sessionsTableBody) return;

    const allSessions = getAllSessions();

    // تطبيق فلتر الحالة
    let filteredSessions = allSessions;
    if (state.selectedSessionStatus !== "all") {
        filteredSessions = filteredSessions.filter(s => s.status === state.selectedSessionStatus);
    }

    if (filteredSessions.length === 0) {
        sessionsTableBody.innerHTML = `
            <tr>
                <td colspan="5">
                    <div class="empty-state">
                        <i class="bi bi-calendar-check"></i>
                        <h3>لا توجد جلسات</h3>
                        <p>لم يتم تسجيل أي جلسات بعد.</p>
                    </div>
                </td>
            </tr>
        `;
        return;
    }

    let html = "";
    filteredSessions.forEach(session => {
        const statusText = getStatusText(session.status);
        html += `
            <tr>
                <td>${session.date || "-"}</td>
                <td>${session.time || "-"}</td>
                <td>${session.patientName || "غير معروف"}</td>
                <td><span class="status ${getStatusClass(session.status)}">${statusText}</span></td>
                <td>
                    <button class="primary-btn open-patient-btn" data-id="${session.patientId}">
                        فتح الملف
                    </button>
                </td>
            </tr>
        `;
    });

    sessionsTableBody.innerHTML = html;
}

/* ==========================================================
                        RENDER: APPOINTMENTS
========================================================== */

function renderAppointments() {
    if (!appointmentsTableBody) return;

    if (!database.appointments || !Array.isArray(database.appointments)) {
        appointmentsTableBody.innerHTML = `
            <tr>
                <td colspan="5">
                    <div class="empty-state">
                        <i class="bi bi-exclamation-triangle"></i>
                        <h3>لا توجد بيانات</h3>
                        <p>لم يتم تحميل المواعيد.</p>
                    </div>
                </td>
            </tr>
        `;
        return;
    }

    // تطبيق فلتر النوع
    let appointments = [...database.appointments];
    if (state.selectedAppointmentType !== "all") {
        appointments = appointments.filter(a => a.type === state.selectedAppointmentType);
    }

    if (appointments.length === 0) {
        appointmentsTableBody.innerHTML = `
            <tr>
                <td colspan="5">
                    <div class="empty-state">
                        <i class="bi bi-calendar-event"></i>
                        <h3>لا توجد مواعيد</h3>
                        <p>لم يتم تسجيل أي مواعيد بعد.</p>
                    </div>
                </td>
            </tr>
        `;
        return;
    }

    let html = "";
    appointments.forEach(appointment => {
        const patient = database.patients?.find(p => p.id === appointment.patientId);
        const patientName = patient ? patient.fullName : "غير معروف";
        const statusText = getStatusText(appointment.status);
        html += `
            <tr>
                <td>${appointment.date || "-"}</td>
                <td>${patientName}</td>
                <td>${appointment.type || "جلسة علاج طبيعي"}</td>
                <td><span class="status ${getStatusClass(appointment.status)}">${statusText}</span></td>
                <td>
                    <button class="primary-btn open-patient-btn" data-id="${appointment.patientId}">
                        فتح الملف
                    </button>
                </td>
            </tr>
        `;
    });

    appointmentsTableBody.innerHTML = html;
}

/* ==========================================================
                        RENDER: DASHBOARD STATS
========================================================== */

function updateDashboardStats() {
    const totalPatients = (database.patients && Array.isArray(database.patients)) ? database.patients.length : 0;

    const today = getTodayDate();
    const allSessions = getAllSessions();
    const todaySessions = allSessions.filter(s => s.date === today).length;

    let newPatients = 0;
    if (database.patients && Array.isArray(database.patients)) {
        const now = new Date();
        const weekAgo = new Date(now);
        weekAgo.setDate(weekAgo.getDate() - 7);
        newPatients = database.patients.filter(p => {
            if (!p.createdAt) return false;
            try {
                const parts = p.createdAt.split('/');
                if (parts.length === 3) {
                    const createdDate = new Date(`${parts[2]}/${parts[1]}/${parts[0]}`);
                    return createdDate >= weekAgo;
                }
            } catch (e) {
                return false;
            }
            return false;
        }).length;
    }

    if (statsTotalPatients) statsTotalPatients.textContent = totalPatients;
    if (statsTodaySessions) statsTodaySessions.textContent = todaySessions || 0;
    if (statsNewPatients) statsNewPatients.textContent = newPatients || 0;

    // تحديث عداد الإشعارات
    if (notificationsCount) {
        const totalNotifications = database.notifications?.length || 0;
        notificationsCount.textContent = totalNotifications;
    }
}

/* ==========================================================
                        USER INFO
========================================================== */

function updateUserInfo() {
    const secretary = database.secretaries && database.secretaries.length > 0 
        ? database.secretaries[0] 
        : null;
    
    const name = secretary ? secretary.fullName : "سكرتير";
    
    if (secretaryNameSidebar) secretaryNameSidebar.textContent = name;
    if (profileNameSpan) profileNameSpan.textContent = name;
    if (profileDropdownName) profileDropdownName.textContent = name;
}

/* ==========================================================
                        NOTIFICATIONS
========================================================== */

function renderNotifications() {
    if (!notificationsList) return;
    
    const notifications = database.notifications || [];
    
    notificationsList.innerHTML = '';
    
    if (notifications.length === 0) {
        notificationsList.innerHTML = `
            <div class="notification-item">
                <i class="bi bi-info-circle"></i>
                <div>
                    <strong>لا توجد إشعارات</strong>
                    <small>حالياً</small>
                </div>
            </div>
        `;
        return;
    }
    
    notifications.forEach(notif => {
        const item = document.createElement('div');
        item.className = 'notification-item';
        item.innerHTML = `
            <i class="bi ${notif.icon || 'bi-bell'}"></i>
            <div>
                <strong>${notif.title}</strong>
                <small>${notif.time}</small>
            </div>
        `;
        notificationsList.appendChild(item);
    });
}

/* ==========================================================
                        SEARCH
========================================================== */

function handleSearch() {
    state.searchQuery = globalSearch.value.trim();

    switch (state.currentPage) {
        case "patients":
            renderPatients();
            break;
        case "sessions": {
            const allSessions = getAllSessions();
            const query = state.searchQuery.toLowerCase();
            const filtered = allSessions.filter(s =>
                s.patientName?.toLowerCase().includes(query) ||
                s.diagnosis?.toLowerCase().includes(query)
            );
            renderFilteredSessions(filtered);
            break;
        }
        case "appointments": {
            if (!database.appointments) return;
            const query = state.searchQuery.toLowerCase();
            const filtered = database.appointments.filter(a => {
                const patient = database.patients?.find(p => p.id === a.patientId);
                return (patient && patient.fullName.toLowerCase().includes(query)) ||
                       (a.type && a.type.toLowerCase().includes(query));
            });
            renderFilteredAppointments(filtered);
            break;
        }
        default:
            break;
    }
}

function renderFilteredSessions(sessions) {
    if (!sessionsTableBody) return;
    if (sessions.length === 0) {
        sessionsTableBody.innerHTML = `
            <tr>
                <td colspan="5">
                    <div class="empty-state">
                        <i class="bi bi-search"></i>
                        <h3>لا توجد نتائج</h3>
                        <p>لم يتم العثور على جلسات مطابقة.</p>
                    </div>
                </td>
            </tr>
        `;
        return;
    }
    let html = "";
    sessions.forEach(session => {
        const statusText = getStatusText(session.status);
        html += `
            <tr>
                <td>${session.date || "-"}</td>
                <td>${session.time || "-"}</td>
                <td>${session.patientName || "غير معروف"}</td>
                <td><span class="status ${getStatusClass(session.status)}">${statusText}</span></td>
                <td>
                    <button class="primary-btn open-patient-btn" data-id="${session.patientId}">
                        فتح الملف
                    </button>
                </td>
            </tr>
        `;
    });
    sessionsTableBody.innerHTML = html;
}

function renderFilteredAppointments(appointments) {
    if (!appointmentsTableBody) return;
    if (appointments.length === 0) {
        appointmentsTableBody.innerHTML = `
            <tr>
                <td colspan="5">
                    <div class="empty-state">
                        <i class="bi bi-search"></i>
                        <h3>لا توجد نتائج</h3>
                        <p>لم يتم العثور على مواعيد مطابقة.</p>
                    </div>
                </td>
            </tr>
        `;
        return;
    }
    let html = "";
    appointments.forEach(appointment => {
        const patient = database.patients?.find(p => p.id === appointment.patientId);
        const patientName = patient ? patient.fullName : "غير معروف";
        const statusText = getStatusText(appointment.status);
        html += `
            <tr>
                <td>${appointment.date || "-"}</td>
                <td>${patientName}</td>
                <td>${appointment.type || "جلسة علاج طبيعي"}</td>
                <td><span class="status ${getStatusClass(appointment.status)}">${statusText}</span></td>
                <td>
                    <button class="primary-btn open-patient-btn" data-id="${appointment.patientId}">
                        فتح الملف
                    </button>
                </td>
            </tr>
        `;
    });
    appointmentsTableBody.innerHTML = html;
}

globalSearch.addEventListener("input", handleSearch);

/* ==========================================================
                        OPEN PATIENT
========================================================== */

document.addEventListener("click", function (event) {
    const button = event.target.closest(".open-patient-btn");
    if (!button) return;
    const id = button.dataset.id;
    showToast("جاري فتح ملف المريض...", "info", "bi-folder2-open");
    localStorage.setItem("currentPatientId", id);
    setTimeout(() => {
        window.location.href = `patient.html?id=${id}`;
    }, 300);
});

/* ==========================================================
                        MODALS (General)
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

/* ==========================================================
                        PATIENT MODAL
========================================================== */

function populateDoctorSelect() {
    if (!patientDoctorInput) return;
    patientDoctorInput.innerHTML = '<option value="">اختر الدكتور</option>';
    if (database.doctors && Array.isArray(database.doctors)) {
        database.doctors.forEach(doctor => {
            const option = document.createElement("option");
            option.value = doctor.id;
            option.textContent = doctor.fullName;
            patientDoctorInput.appendChild(option);
        });
    }
}

function resetPatientForm() {
    patientForm.reset();
    patientEditIdInput.value = "";
    patientModalTitle.textContent = "إضافة مريض جديد";
    patientModalSubtitle.textContent = "أدخل بيانات المريض لإنشاء ملف جديد.";
    patientSubmitBtn.textContent = "إنشاء الملف";
    clearPatientErrors();
    state.editingPatientId = null;
}

function clearPatientErrors() {
    patientNameError.textContent = "";
    patientPhoneError.textContent = "";
}

function validatePatientForm() {
    clearPatientErrors();
    let valid = true;

    const name = patientNameInput.value.trim();
    if (name === "") {
        patientNameError.textContent = "يرجى إدخال اسم المريض";
        valid = false;
    }

    const phone = patientPhoneInput.value.trim();
    if (phone === "") {
        patientPhoneError.textContent = "يرجى إدخال رقم الهاتف";
        valid = false;
    } else if (!/^01[0125][0-9]{8}$/.test(phone)) {
        patientPhoneError.textContent = "رقم الهاتف غير صحيح (مثال: 01012345678)";
        valid = false;
    }

    return valid;
}

addPatientBtn?.addEventListener("click", () => {
    console.log("✅ زر إضافة مريض تم الضغط عليه (من قسم المرضى)");
    resetPatientForm();
    openModal(patientModal);
});

closePatientModalBtns.forEach(btn => {
    btn.addEventListener("click", () => closeModal(patientModal));
});

patientModal?.addEventListener("click", (event) => {
    if (event.target === patientModal) closeModal(patientModal);
});

patientForm?.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!validatePatientForm()) return;

    const name = patientNameInput.value.trim();
    const phone = patientPhoneInput.value.trim();
    const age = parseInt(patientAgeInput.value) || 0;
    const gender = patientGenderInput.value;
    const doctorId = parseInt(patientDoctorInput.value) || 1;
    const diagnosis = patientDiagnosisInput.value.trim() || "جديد";
    const startDate = patientStartDateInput.value ? formatDateForDisplay(patientStartDateInput.value) : getTodayDate();

    const editId = parseInt(patientEditIdInput.value);

    if (editId) {
        // EDIT MODE
        const patientIndex = database.patients.findIndex(p => p.id === editId);
        if (patientIndex === -1) {
            showToast("لم يتم العثور على المريض", "danger", "bi-exclamation-circle");
            return;
        }

        const updatedPatient = {
            ...database.patients[patientIndex],
            fullName: name,
            phone: phone,
            age: age,
            gender: gender,
            doctorId: doctorId,
            diagnosis: {
                ...database.patients[patientIndex].diagnosis,
                diagnosis: diagnosis
            },
            startDate: startDate
        };

        database.patients[patientIndex] = updatedPatient;
        showToast(`تم تحديث بيانات ${name} بنجاح`, "success", "bi-pencil-square");
    } else {
        // CREATE MODE
        const newId = database.patients.length + 1001;

        const newPatient = {
            id: newId,
            fileNumber: `PT-${newId}`,
            fullName: name,
            phone: phone,
            age: age,
            gender: gender,
            doctorId: doctorId,
            status: "active",
            startDate: startDate,
            createdAt: getTodayDate(),
            lastVisit: "-",
            totalSessions: 0,
            completedSessions: 0,
            remainingSessions: 0,
            nextAppointment: "-",
            diagnosis: {
                diagnosis: diagnosis,
                complaint: "",
                injuryDate: "",
                painLevel: "",
                doctorNotes: ""
            },
            treatmentPlan: {
                treatmentType: "",
                sessions: 0,
                sessionDuration: "",
                weeklySessions: 0,
                goals: []
            },
            sessions: [],
            exercises: [],
            devices: [],
            attachments: [],
            notes: [],
            currentSessionNote: "",
            assessment: {
                medicalHistory: {
                    mainDiagnosis: "",
                    medicalDiagnosis: "",
                    referringDoctor: "",
                    hospital: "",
                    conditionStartDate: "",
                    conditionDescription: ""
                },
                chronicHistory: { diseases: [], allergies: "", previousSurgeries: "" },
                referral: { source: "", date: "", reason: "" },
                medicalSurgicalHistory: { previousHospitalization: "", previousPhysiotherapy: "", surgicalHistory: "" },
                physicalAssessment: { rom: "", flexibility: "", balance: "", coordination: "" },
                measurements: { height: "", weight: "", bmi: "" },
                functionalStatus: { mobilityStatus: "", assistiveDevice: "" },
                disability: { hasDisability: "", type: "", severity: "", symptoms: "" },
                specialTests: { details: "" },
                painAssessment: { location: "", score: 0 },
                qualityOfLife: { occupation: "", workImpact: "" },
                medications: { current: "" },
                followUp: { exercises: "", nutrition: "", precautions: "", homeProgram: "" },
                healthEducation: []
            }
        };

        database.patients.push(newPatient);
        showToast(`تمت إضافة المريض ${name} بنجاح`, "success", "bi-person-plus-fill");
    }

    renderPatients();
    updateDashboardStats();
    renderDoctorFilters();
    closeModal(patientModal);
    resetPatientForm();
});

document.addEventListener("click", function (event) {
    const button = event.target.closest(".edit-patient-btn");
    if (!button) return;

    const patientId = parseInt(button.dataset.id);
    const patient = database.patients.find(p => p.id === patientId);
    if (!patient) {
        showToast("لم يتم العثور على المريض", "danger", "bi-exclamation-circle");
        return;
    }

    patientNameInput.value = patient.fullName || "";
    patientPhoneInput.value = patient.phone || "";
    patientAgeInput.value = patient.age || "";
    patientGenderInput.value = patient.gender || "";
    patientDoctorInput.value = patient.doctorId || "";
    patientDiagnosisInput.value = patient.diagnosis?.diagnosis || "";
    if (patient.startDate) {
        try {
            const parts = patient.startDate.split('/');
            if (parts.length === 3) {
                const dateObj = new Date(`${parts[2]}/${parts[1]}/${parts[0]}`);
                if (!isNaN(dateObj)) {
                    patientStartDateInput.value = dateObj.toISOString().split('T')[0];
                }
            }
        } catch (e) {
            patientStartDateInput.value = "";
        }
    }

    patientEditIdInput.value = patientId;
    state.editingPatientId = patientId;

    patientModalTitle.textContent = "تعديل بيانات المريض";
    patientModalSubtitle.textContent = `تعديل بيانات ${patient.fullName}`;
    patientSubmitBtn.textContent = "حفظ التعديلات";

    openModal(patientModal);
});

document.addEventListener("click", function (event) {
    const button = event.target.closest(".delete-patient-btn");
    if (!button) return;

    const patientId = parseInt(button.dataset.id);
    const patient = database.patients.find(p => p.id === patientId);
    if (!patient) {
        showToast("لم يتم العثور على المريض", "danger", "bi-exclamation-circle");
        return;
    }

    if (confirm(`هل أنت متأكد من حذف المريض ${patient.fullName}؟`)) {
        const index = database.patients.findIndex(p => p.id === patientId);
        if (index !== -1) {
            database.patients.splice(index, 1);
            if (database.appointments) {
                database.appointments = database.appointments.filter(a => a.patientId !== patientId);
            }
            showToast(`تم حذف المريض ${patient.fullName}`, "success", "bi-trash");
            renderPatients();
            renderSessions();
            renderAppointments();
            renderTodaySessions();
            updateDashboardStats();
            renderDoctorFilters();
        }
    }
});

/* ==========================================================
                        APPOINTMENT MODAL
========================================================== */

function populateAppointmentSelect() {
    if (!appointmentPatient) return;
    appointmentPatient.innerHTML = '<option value="">اختر المريض</option>';
    if (database.patients && Array.isArray(database.patients)) {
        database.patients.forEach(patient => {
            const option = document.createElement("option");
            option.value = patient.id;
            option.textContent = patient.fullName;
            appointmentPatient.appendChild(option);
        });
    }
}

addAppointmentBtn?.addEventListener("click", () => {
    console.log("✅ زر إضافة موعد تم الضغط عليه (من قسم المواعيد)");
    populateAppointmentSelect();
    openModal(appointmentModal);
});

closeAppointmentModalBtn?.addEventListener("click", () => closeModal(appointmentModal));

appointmentModal?.addEventListener("click", (event) => {
    if (event.target === appointmentModal) closeModal(appointmentModal);
});

appointmentForm?.addEventListener("submit", function (event) {
    event.preventDefault();

    const patientId = parseInt(appointmentPatient.value);
    const date = appointmentDate.value.trim();
    const time = appointmentTime.value.trim();

    if (!patientId || !date || !time) {
        showToast("يرجى ملء جميع الحقول", "warning", "bi-exclamation-triangle");
        return;
    }

    const formattedDate = formatDateForDisplay(date);

    if (!database.appointments) {
        database.appointments = [];
    }

    const newAppointment = {
        id: database.appointments.length + 1,
        patientId: patientId,
        date: formattedDate,
        time: time,
        type: "جلسة علاج طبيعي",
        status: "قيد الانتظار"
    };

    database.appointments.push(newAppointment);
    renderAppointments();
    appointmentForm.reset();
    closeModal(appointmentModal);
    const patientName = database.patients.find(p => p.id === patientId)?.fullName || "";
    showToast(`تم إضافة موعد للمريض ${patientName}`, "success", "bi-calendar-check");
});

/* ==========================================================
                        SESSION MODAL
========================================================== */

function populateSessionPatientSelect() {
    if (!sessionPatient) return;
    sessionPatient.innerHTML = '<option value="">اختر المريض</option>';
    if (database.patients && Array.isArray(database.patients)) {
        database.patients.forEach(patient => {
            const option = document.createElement("option");
            option.value = patient.id;
            option.textContent = patient.fullName;
            sessionPatient.appendChild(option);
        });
    }
}

function resetSessionForm() {
    sessionForm.reset();
    sessionSubmitBtn.textContent = "إضافة الجلسة";
}

addSessionBtn?.addEventListener("click", () => {
    console.log("✅ زر إضافة جلسة تم الضغط عليه (من قسم الجلسات)");
    populateSessionPatientSelect();
    resetSessionForm();
    openModal(sessionModal);
});

closeSessionModalBtns.forEach(btn => {
    btn.addEventListener("click", () => closeModal(sessionModal));
});

sessionModal?.addEventListener("click", (event) => {
    if (event.target === sessionModal) closeModal(sessionModal);
});

sessionForm?.addEventListener("submit", function (event) {
    event.preventDefault();

    const patientId = parseInt(sessionPatient.value);
    const date = sessionDate.value.trim();
    const time = sessionTime.value.trim();
    const status = sessionStatus.value;
    const diagnosis = sessionDiagnosis.value.trim() || "";
    const notes = sessionNotes.value.trim() || "";

    if (!patientId || !date || !time) {
        showToast("يرجى ملء جميع الحقول المطلوبة", "warning", "bi-exclamation-triangle");
        return;
    }

    const patient = database.patients.find(p => p.id === patientId);
    if (!patient) {
        showToast("لم يتم العثور على المريض", "danger", "bi-exclamation-circle");
        return;
    }

    // تنسيق التاريخ
    const dateParts = date.split("-");
    const formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;

    const newSession = {
        id: patient.sessions.length + 1,
        number: patient.sessions.length + 1,
        date: formattedDate,
        time: time,
        doctor: "د. غير محدد",
        status: status,
        diagnosis: diagnosis || patient.diagnosis?.diagnosis || "",
        notes: notes || "-"
    };

    // إضافة الجلسة للمريض
    patient.sessions.push(newSession);

    // تحديث الجداول
    renderSessions();
    renderTodaySessions();
    updateDashboardStats();

    sessionForm.reset();
    closeModal(sessionModal);
    showToast(`تم إضافة جلسة للمريض ${patient.fullName}`, "success", "bi-plus-circle");
});

/* ==========================================================
                        PROFILE & NOTIFICATIONS
========================================================== */

function toggleProfile() {
    profileDropdown.classList.toggle("active");
    notificationDropdown.classList.remove("active");
}

profileBtn?.addEventListener("click", function (event) {
    event.stopPropagation();
    toggleProfile();
});

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
                        LOGOUT
========================================================== */

logoutBtn?.addEventListener("click", function () {
    showToast("جاري تسجيل الخروج...", "info", "bi-box-arrow-right");
    setTimeout(() => {
        window.location.href = "index.html";
    }, 500);
});

logoutDropdownBtn?.addEventListener("click", function (event) {
    event.stopPropagation();
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
    updateUserInfo();           // ✅ تعيين اسم السكرتير
    renderNotifications();      // ✅ عرض الإشعارات
    populateDoctorSelect();
    populateAppointmentSelect();
    populateSessionPatientSelect();
    renderDoctorFilters();
    renderAppointmentFilters();
    renderSessionFilters();
    renderPatients();
    renderSessions();
    renderAppointments();
    renderTodaySessions();
    updateDashboardStats();
    updateSearchPlaceholder();

    console.log("Secretary Dashboard initialized successfully!");
}

init();

export default {
    database,
    renderPatients,
    renderSessions,
    renderAppointments,
    renderTodaySessions,
    updateDashboardStats
};