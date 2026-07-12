console.log("Patient Profile Loaded");

/* ==========================================================
                        SELECTORS
========================================================== */

const backBtn = document.querySelector(".back-btn");

const tabButtons = document.querySelectorAll(".tab-btn");

const tabContents = document.querySelectorAll(".tab-content");

const sessionsHistoryBody = document.querySelector("#sessions-history-body");

const exerciseGrid = document.querySelector("#exercise-grid");

const devicesGrid = document.querySelector("#devices-grid");

const attachmentsGrid = document.querySelector("#attachments-grid");

const addSessionBtn = document.querySelector(".add-session-btn");

const sessionModal = document.querySelector("#session-modal");

const closeSessionModalBtn = document.querySelector(".close-session-modal");

const addSessionForm = document.querySelector(".add-session-form");

const sessionDateInput = document.querySelector("#session-date");

const sessionStatusInput = document.querySelector("#session-status");

const sessionNotesInput = document.querySelector("#session-notes");

const sessionDateError = document.querySelector("#session-date-error");

const saveBtn = document.querySelector(".save-btn");

const printButtons = document.querySelectorAll(".print-btn");

const shareBtn = document.querySelector(".share-btn");

const toastContainer = document.querySelector("#toast-container");

const attachFileBtn = document.querySelector(".attach-file-btn");

const attachmentInput = document.querySelector("#attachment-input");

const saveNotesBtn = document.querySelector(".save-notes-btn");

const doctorNotesInput = document.querySelector("#doctor-notes");

const notesLastUpdate = document.querySelector("#notes-last-update");


/* ==========================================================
                        DATABASE
========================================================== */

const patientDB = {

    sessions: [

        {
            number: 1,
            date: "05 / 07 / 2026",
            doctor: "د. أحمد",
            status: "منتهي",
            notes: "تحسن ملحوظ في مدى الحركة"
        },

        {
            number: 2,
            date: "08 / 07 / 2026",
            doctor: "د. أحمد",
            status: "منتهي",
            notes: "الاستمرار على نفس الخطة العلاجية"
        },

        {
            number: 3,
            date: "10 / 07 / 2026",
            doctor: "د. أحمد",
            status: "قيد الانتظار",
            notes: "-"
        }

    ],

    exercises: [

        {
            id: 1,
            name: "--------",
            icon: "bi-activity"
        },

        {
            id: 2,
            name: "--------",
            icon: "bi-arrow-repeat"
        },

        {
            id: 3,
            name: "--------",
            icon: "bi-person-arms-up"
        }

    ],

    devices: [

        {
            id: 1,
            name: "--------",
            icon: "bi-soundwave"
        },

        {
            id: 2,
            name: "-------- ",
            icon: "bi-lightning-charge"
        }

    ],

    attachments: [

        {
            id: 1,
            name: "--------",
            icon: "bi-file-earmark-medical"
        },

        {
            id: 2,
            name: "--------",
            icon: "bi-file-earmark-text"
        }

    ]

};


/* ==========================================================
                        TOAST
========================================================== */

function showToast(message, type = "info", icon = "bi-check-circle") {

    if (!toastContainer) return;

    const toast = document.createElement("div");

    toast.className = `toast toast-${type}`;

    toast.innerHTML = `<i class="bi ${icon}"></i><span>${message}</span>`;

    toastContainer.appendChild(toast);

    requestAnimationFrame(() => {

        toast.classList.add("show");

    });

    setTimeout(() => {

        toast.classList.remove("show");

        setTimeout(() => toast.remove(), 250);

    }, 2500);

}


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

addSessionBtn?.addEventListener("click", function () {

    openModal(sessionModal);

});

closeSessionModalBtn?.addEventListener("click", function () {

    closeModal(sessionModal);

});

sessionModal?.addEventListener("click", function (event) {

    if (event.target === sessionModal) {

        closeModal(sessionModal);

    }

});

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        closeModal(sessionModal);

    }

});


/* ==========================================================
                        TABS
========================================================== */

function activateTab(tabName) {

    tabButtons.forEach(button => {

        button.classList.toggle("active", button.dataset.tab === tabName);

    });

    tabContents.forEach(content => {

        content.classList.toggle("active-tab", content.id === tabName);

    });

}

tabButtons.forEach(button => {

    button.addEventListener("click", function () {

        activateTab(button.dataset.tab);

    });

});


/* ==========================================================
                    STATUS HELPER
========================================================== */

function getStatusClass(status) {

    switch (status) {

        case "منتهي":
            return "active";

        case "قيد الانتظار":
            return "pending";

        case "ملغي":
            return "inactive";

        default:
            return "";

    }

}


/* ==========================================================
                    SESSIONS HISTORY
========================================================== */

function renderSessionsHistory(data = patientDB.sessions) {

    if (!sessionsHistoryBody) return;

    let html = "";

    data.forEach(session => {

        html += `

        <tr>

            <td>${session.number}</td>

            <td>${session.date}</td>

            <td>${session.doctor}</td>

            <td>

                <span class="status ${getStatusClass(session.status)}">

                    ${session.status}

                </span>

            </td>

            <td>${session.notes}</td>

            <td>

                <button class="primary-btn" type="button">

                    عرض

                </button>

            </td>

        </tr>

        `;

    });

    sessionsHistoryBody.innerHTML = html;

}


/* ==========================================================
                    ADD SESSION FORM
========================================================== */

function clearSessionErrors() {

    sessionDateError.textContent = "";

}

function validateSessionForm() {

    clearSessionErrors();

    if (sessionDateInput.value.trim() === "") {

        sessionDateError.textContent = "يرجى إدخال تاريخ الجلسة";

        return false;

    }

    return true;

}

addSessionForm?.addEventListener("submit", function (event) {

    event.preventDefault();

    if (!validateSessionForm()) return;

    const newSession = {

        number: patientDB.sessions.length + 1,

        date: sessionDateInput.value.trim(),

        doctor: "د. أحمد",

        status: sessionStatusInput.value,

        notes: sessionNotesInput.value.trim() || "-"

    };

    patientDB.sessions.push(newSession);

    renderSessionsHistory();

    addSessionForm.reset();

    clearSessionErrors();

    closeModal(sessionModal);

    showToast("تمت إضافة الجلسة بنجاح", "success", "bi-calendar-check");

});


/* ==========================================================
                    INFO CARDS
                (exercises / devices / attachments)
========================================================== */

function renderInfoCards(container, data, subtitle) {

    if (!container) return;

    let html = "";

    data.forEach(item => {

        html += `

        <article class="info-card" data-id="${item.id}">

            <div class="info-card-icon">

                <i class="bi ${item.icon}"></i>

            </div>

            <div class="info-card-content">

                <h4>${item.name}</h4>

                <span>${subtitle}</span>

            </div>

        </article>

        `;

    });

    container.innerHTML = html;

}


/* ==========================================================
                        SAVE
========================================================== */

saveBtn?.addEventListener("click", function () {

    // مؤقتًا: حفظ وهمي إلى أن يتوفر Backend

    console.log("Saving patient profile...", patientDB);

    showToast("تم حفظ بيانات المريض بنجاح", "success", "bi-floppy");

});


/* ==========================================================
                        PRINT
========================================================== */

printButtons.forEach(button => {

    button.addEventListener("click", function () {

        showToast("جاري تجهيز الملف للطباعة", "info", "bi-printer");

        setTimeout(() => window.print(), 300);

    });

});


/* ==========================================================
                        SHARE
========================================================== */

shareBtn?.addEventListener("click", async function () {

    const shareData = {

        title: "ملف المريض - مركز الطارق",

        text: "ملف المريض على نظام مركز الطارق",

        url: window.location.href

    };

    if (navigator.share) {

        try {

            await navigator.share(shareData);

            showToast("تمت مشاركة الملف بنجاح", "success", "bi-share");

        } catch (error) {

            // المستخدم ألغى المشاركة، لا داعي لإظهار رسالة خطأ

        }

        return;

    }

    try {

        await navigator.clipboard.writeText(shareData.url);

        showToast("تم نسخ رابط الملف", "info", "bi-link-45deg");

    } catch (error) {

        showToast("تعذر نسخ الرابط", "warning", "bi-exclamation-triangle");

    }

});


/* ==========================================================
                    ATTACHMENTS
========================================================== */

attachFileBtn?.addEventListener("click", function () {

    attachmentInput?.click();

});

attachmentInput?.addEventListener("change", function () {

    const files = Array.from(attachmentInput.files || []);

    if (files.length === 0) return;

    files.forEach(file => {

        patientDB.attachments.push({

            id: patientDB.attachments.length + 1,
            name: file.name,
            icon: "bi-file-earmark-text"

        });

    });

    renderInfoCards(attachmentsGrid, patientDB.attachments, "مرفق طبي");

    attachmentInput.value = "";

    showToast(

        files.length === 1 ? "تم إرفاق الملف بنجاح" : `تم إرفاق ${files.length} ملفات بنجاح`,
        "success",
        "bi-paperclip"

    );

});


/* ==========================================================
                    NOTES
========================================================== */

function formatNow() {

    const now = new Date();

    return now.toLocaleString("ar-EG", {

        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"

    });

}

saveNotesBtn?.addEventListener("click", function () {

    // مؤقتًا: حفظ وهمي إلى أن يتوفر Backend

    console.log("Saving notes:", doctorNotesInput.value.trim());

    if (notesLastUpdate) {

        notesLastUpdate.textContent = `آخر تحديث : ${formatNow()}`;

    }

    showToast("تم حفظ الملاحظات بنجاح", "success", "bi-journal-check");

});


/* ==========================================================
                        BACK BUTTON
========================================================== */

backBtn?.addEventListener("click", function () {

    window.history.back();

});


/* ==========================================================
                        INIT
========================================================== */

function init() {

    renderSessionsHistory();

    renderInfoCards(exerciseGrid, patientDB.exercises, "تمرين علاجي");

    renderInfoCards(devicesGrid, patientDB.devices, "جهاز علاجي");

    renderInfoCards(attachmentsGrid, patientDB.attachments, "مرفق طبي");

}

init();