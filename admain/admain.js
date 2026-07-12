console.log("Admin Dashboard Loaded");

/* ==========================================================
                        SELECTORS
========================================================== */

const sidebar = document.querySelector("#sidebar");

const sidebarOverlay = document.querySelector(".sidebar-overlay");

const menuToggle = document.querySelector("#menu-toggle");

const pageTitle = document.querySelector("#page-title");

const sections = document.querySelectorAll(".content-section");

const menuLinks = document.querySelectorAll(".sidebar-menu a");

const globalSearch = document.querySelector("#global-search");

const doctorsTableBody = document.querySelector("#doctors-table-body");

const secretariesTableBody = document.querySelector("#secretaries-table-body");

const patientsTableBody = document.querySelector("#patients-table-body");

const sessionsTableBody = document.querySelector("#sessions-table-body");

const appointmentsTableBody = document.querySelector("#appointments-table-body");

const doctorsCount = document.querySelector(".doctors-count");

const secretariesCount = document.querySelector(".secretaries-count");

const patientsCount = document.querySelector(".patients-count");

const doctorsStat = document.querySelector("#doctors-stat");

const secretariesStat = document.querySelector("#secretaries-stat");

const patientsStat = document.querySelector("#patients-stat");

const sessionsStat = document.querySelector("#sessions-stat");

const profileBtn = document.querySelector(".profile-btn");

const profileDropdown = document.querySelector(".profile-dropdown");

const notificationBtn = document.querySelector(".notification-btn");

const notificationDropdown = document.querySelector(".notification-dropdown");

const doctorModal = document.querySelector("#doctor-modal");

const secretaryModal = document.querySelector("#secretary-modal");

const addDoctorBtn = document.querySelector(".add-doctor-btn");

const addSecretaryBtn = document.querySelector(".add-secretary-btn");

const closeDoctorModalBtn = document.querySelector(".close-doctor-modal");

const closeSecretaryModalBtn = document.querySelector(".close-secretary-modal");

const addDoctorForm = document.querySelector(".add-doctor-form");

const addSecretaryForm = document.querySelector(".add-secretary-form");

const doctorNameInput = document.querySelector("#doctor-name");
const doctorSpecialtyInput = document.querySelector("#doctor-specialty");
const doctorPhoneInput = document.querySelector("#doctor-phone");

const doctorNameError = document.querySelector("#doctor-name-error");
const doctorSpecialtyError = document.querySelector("#doctor-specialty-error");
const doctorPhoneError = document.querySelector("#doctor-phone-error");

const secretaryNameInput = document.querySelector("#secretary-name");
const secretaryPhoneInput = document.querySelector("#secretary-phone");

const secretaryNameError = document.querySelector("#secretary-name-error");
const secretaryPhoneError = document.querySelector("#secretary-phone-error");


/* ==========================================================
                        APP STATE
========================================================== */

const state = {

    currentPage: "dashboard",

    sidebarOpen: false

};


/* ==========================================================
                        DATABASE
========================================================== */

const adminDB = {

    doctors: [

        {
            id: "2001",
            name: "د. أحمد",
            specialty: "علاج طبيعي",
            patientsCount: 12,
            status: "نشط"
        },

        {
            id: "2002",
            name: "د. سارة محمود",
            specialty: "إصابات ملاعب",
            patientsCount: 8,
            status: "نشط"
        },

        {
            id: "2003",
            name: "د. كريم عادل",
            specialty: "علاج طبيعي للأطفال",
            patientsCount: 5,
            status: "معلق"
        }

    ],

    secretaries: [

        {
            id: "3001",
            name: "منة الله سعيد",
            phone: "01011122233",
            joinDate: "01 / 03 / 2026",
            status: "نشط"
        },

        {
            id: "3002",
            name: "ياسمين طارق",
            phone: "01099988877",
            joinDate: "15 / 05 / 2026",
            status: "نشط"
        }

    ],

    patients: [

        {
            id: "1001",
            name: "محمد أحمد",
            phone: "01012345678",
            session: "03 / 07 / 2026",
            status: "نشط"
        },

        {
            id: "1002",
            name: "أحمد علي",
            phone: "01022223333",
            session: "01 / 07 / 2026",
            status: "نشط"
        },

        {
            id: "1003",
            name: "محمود حسن",
            phone: "01098765432",
            session: "28 / 06 / 2026",
            status: "معلق"
        },

        {
            id: "1004",
            name: "عبدالله محمد",
            phone: "01123456789",
            session: "27 / 06 / 2026",
            status: "نشط"
        },

        {
            id: "1005",
            name: "يوسف سامح",
            phone: "01234567890",
            session: "25 / 06 / 2026",
            status: "منتهي"
        }

    ],

    sessions: [

        {
            id: 1,
            time: "09:00 ص",
            patient: "محمد أحمد",
            diagnosis: "خشونة الركبة"
        },

        {
            id: 2,
            time: "10:30 ص",
            patient: "أحمد علي",
            diagnosis: "قطع رباط صليبي"
        }

    ],

    appointments: [

        {
            id: 1,
            patient: "محمد أحمد",
            date: "12 / 07 / 2026",
            type: "جلسة علاج طبيعي",
            status: "قيد الانتظار"
        },

        {
            id: 2,
            patient: "يوسف سامح",
            date: "13 / 07 / 2026",
            type: "جلسة متابعة",
            status: "تم التأكيد"
        }

    ]

};

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

        case "doctors":

            globalSearch.placeholder = "ابحث باسم الدكتور أو التخصص";

            break;

        case "secretaries":

            globalSearch.placeholder = "ابحث باسم السكرتير";

            break;

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

    sections.forEach(section => {

        section.classList.remove("active-section");

    });

    const currentSection = document.querySelector(`#${page}-section`);

    if (!currentSection) return;

    currentSection.classList.add("active-section");

    state.currentPage = page;

    updatePageTitle(currentSection);

    updateSearchPlaceholder();

}

function setActiveMenu(link) {

    document.querySelectorAll(".sidebar-item").forEach(item => {

        item.classList.remove("active");

    });

    link.closest(".sidebar-item").classList.add("active");

}

function navigate(page) {

    const link = document.querySelector(`.sidebar-menu a[data-page="${page}"]`);

    if (link) {

        setActiveMenu(link);

    }

    showSection(page);

    if (window.innerWidth <= 768) {

        closeSidebar();

    }

}


menuLinks.forEach(link => {

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

        case "نشط":
            return "active";

        case "معلق":
            return "pending";

        case "منتهي":
            return "inactive";

        case "تم التأكيد":
            return "active";

        case "قيد الانتظار":
            return "pending";

        default:
            return "";

    }

}


/* ==========================================================
                    COUNTERS
========================================================== */

function updateDoctorsCount(count) {

    if (!doctorsCount) return;

    doctorsCount.textContent = `إجمالي الدكاترة : ${count}`;

}

function updateSecretariesCount(count) {

    if (!secretariesCount) return;

    secretariesCount.textContent = `إجمالي السكرتارية : ${count}`;

}

function updatePatientsCount(count) {

    if (!patientsCount) return;

    patientsCount.textContent = `إجمالي المرضى : ${count}`;

}

function updateDashboardStats() {

    if (doctorsStat) doctorsStat.textContent = adminDB.doctors.length;

    if (secretariesStat) secretariesStat.textContent = adminDB.secretaries.length;

    if (patientsStat) patientsStat.textContent = adminDB.patients.length;

    if (sessionsStat) sessionsStat.textContent = adminDB.sessions.length;

}


/* ==========================================================
                    DOCTORS TABLE
========================================================== */

function renderDoctors(data = adminDB.doctors) {

    if (!doctorsTableBody) return;

    let html = "";

    data.forEach(doctor => {

        html += `

        <tr>

            <td>${doctor.name}</td>

            <td>${doctor.specialty}</td>

            <td>${doctor.patientsCount}</td>

            <td>

                <span class="status ${getStatusClass(doctor.status)}">

                    ${doctor.status}

                </span>

            </td>

            <td>

                <button
                    class="primary-btn open-doctor-btn"
                    data-id="${doctor.id}">

                    عرض

                </button>

            </td>

        </tr>

        `;

    });

    doctorsTableBody.innerHTML = html;
    updateDoctorsCount(data.length);

}


/* ==========================================================
                    SECRETARIES TABLE
========================================================== */

function renderSecretaries(data = adminDB.secretaries) {

    if (!secretariesTableBody) return;

    let html = "";

    data.forEach(secretary => {

        html += `

        <tr>

            <td>${secretary.name}</td>

            <td>${secretary.phone}</td>

            <td>${secretary.joinDate}</td>

            <td>

                <span class="status ${getStatusClass(secretary.status)}">

                    ${secretary.status}

                </span>

            </td>

            <td>

                <button
                    class="primary-btn open-secretary-btn"
                    data-id="${secretary.id}">

                    عرض

                </button>

            </td>

        </tr>

        `;

    });

    secretariesTableBody.innerHTML = html;
    updateSecretariesCount(data.length);

}


/* ==========================================================
                    PATIENTS TABLE
========================================================== */

function renderPatients(data = adminDB.patients) {

    if (!patientsTableBody) return;

    let html = "";

    data.forEach(patient => {

        html += `

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

        `;

    });

    patientsTableBody.innerHTML = html;
    updatePatientsCount(data.length);

}


function renderSessions(data = adminDB.sessions) {

    if (!sessionsTableBody) return;

    let html = "";

    data.forEach(session => {

        html += `

        <tr>

            <td>${session.time}</td>

            <td>${session.patient}</td>

            <td>${session.diagnosis}</td>

            <td>

                <button
                    class="primary-btn open-patient-btn"
                    data-id="${session.id}">

                    فتح الملف

                </button>

            </td>

        </tr>

        `;

    });

    sessionsTableBody.innerHTML = html;

}

function renderAppointments(data = adminDB.appointments) {

    if (!appointmentsTableBody) return;

    let html = "";

    data.forEach(appointment => {

        html += `

        <tr>

            <td>${appointment.date}</td>

            <td>${appointment.patient}</td>

            <td>${appointment.type}</td>

            <td>

                <span class="status ${getStatusClass(appointment.status)}">

                    ${appointment.status}

                </span>

            </td>

            <td>

                <button
                    class="primary-btn">

                    عرض

                </button>

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
                    OPEN DOCTOR / SECRETARY / PATIENT
========================================================== */

document.addEventListener("click", function (event) {

    const doctorBtn = event.target.closest(".open-doctor-btn");

    if (doctorBtn) {

        console.log("Open Doctor :", doctorBtn.dataset.id);
        return;

    }

    const secretaryBtn = event.target.closest(".open-secretary-btn");

    if (secretaryBtn) {

        console.log("Open Secretary :", secretaryBtn.dataset.id);
        return;

    }

    const patientBtn = event.target.closest(".open-patient-btn");

    if (patientBtn) {

        console.log("Open Patient :", patientBtn.dataset.id);
        return;

    }

});


/* ==========================================================
                        SEARCH
========================================================== */

function searchDoctors(value) {

    return adminDB.doctors.filter(doctor => {

        return (

            doctor.name.includes(value) ||

            doctor.specialty.includes(value)

        );

    });

}

function searchSecretaries(value) {

    return adminDB.secretaries.filter(secretary => {

        return (

            secretary.name.includes(value) ||

            secretary.phone.includes(value)

        );

    });

}

function searchPatients(value) {

    return adminDB.patients.filter(patient => {

        return (

            patient.name.includes(value) ||

            patient.phone.includes(value) ||

            patient.id.includes(value)

        );

    });

}

function searchSessions(value) {

    return adminDB.sessions.filter(session => {

        return (

            session.patient.includes(value) ||

            session.diagnosis.includes(value)

        );

    });

}

function searchAppointments(value) {

    return adminDB.appointments.filter(appointment => {

        return (

            appointment.patient.includes(value) ||

            appointment.type.includes(value)

        );

    });

}


function handleSearch() {

    const value = globalSearch.value.trim();

    switch (state.currentPage) {

    case "doctors": {

        const filtered = searchDoctors(value);

        if (filtered.length === 0) {

            renderEmptyState(doctorsTableBody, 5);

        } else {

            renderDoctors(filtered);

        }

        break;
    }

    case "secretaries": {

        const filtered = searchSecretaries(value);

        if (filtered.length === 0) {

            renderEmptyState(secretariesTableBody, 5);

        } else {

            renderSecretaries(filtered);

        }

        break;
    }

    case "patients": {

        const filtered = searchPatients(value);

        if (filtered.length === 0) {

            renderEmptyState(patientsTableBody, 6);

        } else {

            renderPatients(filtered);

        }

        break;
    }

    case "sessions": {

        const filtered = searchSessions(value);

        if (filtered.length === 0) {

            renderEmptyState(sessionsTableBody, 4);

        } else {

            renderSessions(filtered);

        }

        break;
    }

    case "appointments": {

        const filtered = searchAppointments(value);

        if (filtered.length === 0) {

            renderEmptyState(appointmentsTableBody, 5);

        } else {

            renderAppointments(filtered);

        }

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

addDoctorBtn?.addEventListener("click", function () {

    openModal(doctorModal);

});

addSecretaryBtn?.addEventListener("click", function () {

    openModal(secretaryModal);

});

closeDoctorModalBtn?.addEventListener("click", function () {

    closeModal(doctorModal);

});

closeSecretaryModalBtn?.addEventListener("click", function () {

    closeModal(secretaryModal);

});

doctorModal?.addEventListener("click", function (event) {

    if (event.target === doctorModal) {

        closeModal(doctorModal);

    }

});

secretaryModal?.addEventListener("click", function (event) {

    if (event.target === secretaryModal) {

        closeModal(secretaryModal);

    }

});

document.addEventListener("keydown", function (event) {

    if (event.key !== "Escape") return;

    closeModal(doctorModal);

    closeModal(secretaryModal);

});


/* ==========================================================
                    DOCTOR FORM
========================================================== */

function clearDoctorErrors() {

    doctorNameError.textContent = "";

    doctorSpecialtyError.textContent = "";

    doctorPhoneError.textContent = "";

}

function validateDoctorForm() {

    clearDoctorErrors();

    let valid = true;

    if (doctorNameInput.value.trim() === "") {

        doctorNameError.textContent = "يرجى إدخال اسم الدكتور";
        valid = false;

    }

    if (doctorSpecialtyInput.value.trim() === "") {

        doctorSpecialtyError.textContent = "يرجى إدخال التخصص";
        valid = false;

    }

    const phone = doctorPhoneInput.value.trim();

    if (phone === "" || !/^01[0125][0-9]{8}$/.test(phone)) {

        doctorPhoneError.textContent = "رقم الهاتف غير صحيح";
        valid = false;

    }

    return valid;

}

addDoctorForm?.addEventListener("submit", function (event) {

    event.preventDefault();

    if (!validateDoctorForm()) return;

    const newDoctor = {

        id: String(adminDB.doctors.length + 2001),

        name: doctorNameInput.value.trim(),

        specialty: doctorSpecialtyInput.value.trim(),

        patientsCount: 0,

        status: "نشط"

    };

    adminDB.doctors.push(newDoctor);

    renderDoctors();

    updateDashboardStats();

    addDoctorForm.reset();

    clearDoctorErrors();

    closeModal(doctorModal);

});


/* ==========================================================
                    SECRETARY FORM
========================================================== */

function clearSecretaryErrors() {

    secretaryNameError.textContent = "";

    secretaryPhoneError.textContent = "";

}

function validateSecretaryForm() {

    clearSecretaryErrors();

    let valid = true;

    if (secretaryNameInput.value.trim() === "") {

        secretaryNameError.textContent = "يرجى إدخال اسم السكرتير";
        valid = false;

    }

    const phone = secretaryPhoneInput.value.trim();

    if (phone === "" || !/^01[0125][0-9]{8}$/.test(phone)) {

        secretaryPhoneError.textContent = "رقم الهاتف غير صحيح";
        valid = false;

    }

    return valid;

}

function formatToday() {

    const now = new Date();

    return now.toLocaleDateString("ar-EG", {

        day: "2-digit",
        month: "2-digit",
        year: "numeric"

    });

}

addSecretaryForm?.addEventListener("submit", function (event) {

    event.preventDefault();

    if (!validateSecretaryForm()) return;

    const newSecretary = {

        id: String(adminDB.secretaries.length + 3001),

        name: secretaryNameInput.value.trim(),

        phone: secretaryPhoneInput.value.trim(),

        joinDate: formatToday(),

        status: "نشط"

    };

    adminDB.secretaries.push(newSecretary);

    renderSecretaries();

    updateDashboardStats();

    addSecretaryForm.reset();

    clearSecretaryErrors();

    closeModal(secretaryModal);

});

/* ==========================================================
                    RESPONSIVE
========================================================== */

window.addEventListener("resize", function () {

    if (window.innerWidth > 768) {

        closeSidebar();

    }

});

/* ==========================================================
                        INIT
========================================================== */

function init() {

    renderDoctors();

    renderSecretaries();

    renderPatients();

    renderSessions();

    renderAppointments();

    updateDashboardStats();

    updateSearchPlaceholder();

}

init();