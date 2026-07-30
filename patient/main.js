import database from "../data/mockDatabase.js";


/* ==========================================================
                        SELECTORS
========================================================== */

const backBtn = document.querySelector(".back-btn");
const tabButtons = document.querySelectorAll(".tab-btn");
const Statue = document.getElementsByClassName("status");
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
                     DATABASE SELECTORS
========================================================== */

const patientName = document.querySelector("#patient-name");
const patientFullName = document.getElementById("patient-full-name")
const patientStatus = document.getElementById("patient-status")
const patientGender = document.querySelector("#patient-gender");
const patientBirthDate = document.querySelector("#patient-birth-date");
const patientAge = document.querySelector("#patient-age");
const patientNationalId = document.querySelector("#patient-national-id");
const patientNationality = document.querySelector("#patient-nationality");
const patientMaritalStatus = document.querySelector("#patient-marital-status");
const patientPhone = document.querySelector("#patient-phone");
const patientEmergencyPhone = document.querySelector("#patient-emergency-phone");
const patientResponsiblePerson = document.querySelector("#patient-responsible-person");
const patientCreatedAt = document.querySelector("#patient-created-at");
const patientFileNumber = document.querySelector("#patient-file-number");
const patientAddress = document.querySelector("#patient-address");
const currentSessionNote = document.getElementById("current-session-note");
const notesHistory = document.getElementById("notes-history");
const saveNoteBtn = document.querySelector(".save-note-btn");

/* ==========================================================
                        DATABASE
========================================================== */
const patientId =
    Number(new URLSearchParams(window.location.search).get("id")) || 1;

const currentPatientId = Number(localStorage.getItem("currentPatientId"));

const patient =
    database.patients.find(p => p.id === currentPatientId);

    
const doctor = database.doctors.find(
    doctor => doctor.id === patient.doctorId);
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

// / * ==========================================================
//                     BASIC INFO
// ========================================================== */



function getStatusText(status) {

    switch (status) {

        case "active":
            return "نشط";

        case "pending":
            return "قيد العلاج";

        case "inactive":
            return "متوقف";

        default:
            return status;

    }

}






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

        case "مكتملة":
            return "active";

        case "جارية":
            return "pending";

        case "قادمة":
            return "inactive";

        default:
            return "";

    }

}

/* ==========================================================
                    SESSIONS HISTORY
========================================================== */

function renderSessionsHistory() {

    if (!sessionsHistoryBody) return;

    sessionsHistoryBody.innerHTML = "";

    patient.sessions.forEach(session => {

        sessionsHistoryBody.innerHTML += `

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

                <button class="primary-btn">

                    عرض

                </button>

            </td>

        </tr>

        `;

    });

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

        number: patient.sessions.length + 1,

        date: sessionDateInput.value.trim(),

        doctor: "د. أحمد",

        status: sessionStatusInput.value,

        notes: sessionNotesInput.value.trim() || "-"

    };

    patient.sessions.push(newSession);

    renderSessionsHistory();

    addSessionForm.reset();

    clearSessionErrors();

    closeModal(sessionModal);

    showToast("تمت إضافة الجلسة بنجاح", "success", "bi-calendar-check");

});



/* ==========================================================
                    EXERCISES
========================================================== */

function renderExercises() {

    if (!exerciseGrid) return;

    exerciseGrid.innerHTML = "";

    patient.exercises.forEach(exercise => {

        exerciseGrid.innerHTML += `

        <article class="info-card">

            <div class="info-card-icon">

                <i class="bi ${exercise.icon}"></i>

            </div>

            <div class="info-card-content">

                <h4>${exercise.name}</h4>

                <p>${exercise.description}</p>

                <small>

                    ${exercise.sets} مجموعات •
                    ${exercise.reps} تكرار •
                    ${exercise.duration}

                </small>

            </div>

        </article>

        `;

    });

}


/* ==========================================================
                    DEVICES
========================================================== */

function renderDevices() {

    if (!devicesGrid) return;

    devicesGrid.innerHTML = "";

    patient.devices.forEach(device => {

        devicesGrid.innerHTML += `

        <article class="info-card">

            <div class="info-card-icon">

                <i class="bi ${device.icon}"></i>

            </div>

            <div class="info-card-content">

                <h4>${device.name}</h4>

                <p>${device.description}</p>

                <small>${device.sessions}</small>

            </div>

        </article>

        `;

    });

}


/* ==========================================================
                    ATTACHMENTS
========================================================== */

function renderAttachments() {

    if (!attachmentsGrid) return;

    attachmentsGrid.innerHTML = "";

    patient.attachments.forEach(file => {

        attachmentsGrid.innerHTML += `

        <article class="info-card">

            <div class="info-card-icon">

                <i class="bi ${file.icon}"></i>

            </div>

            <div class="info-card-content">

                <h4>${file.name}</h4>

                <p>${file.type}</p>

                <small>

                    ${file.size} • ${file.uploadDate}

                </small>

            </div>

        </article>

        `;

    });

}

/* ==========================================================
                        NOTES
========================================================== */

function renderNotes() {

    if (!notesHistory) return;

    currentSessionNote.value = patient.currentSessionNote || "";

    notesHistory.innerHTML = "";

    patient.notes.forEach(note => {

        notesHistory.innerHTML += `

        <article class="note-history-card">

            <div class="note-history-header">

                <strong>${note.date}</strong>

                <span>${note.doctor}</span>

            </div>

            <p>${note.text}</p>

        </article>

        `;

    });

}

/* ==========================================================
                        SAVE
========================================================== */

saveBtn?.addEventListener("click", function () {

    // مؤقتًا: حفظ وهمي إلى أن يتوفر Backend

    console.log("Saving patient profile...", patient);

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

        patient.attachments.push({

            id: patient.attachments.length + 1,

            name: file.name,

            type: file.name.split(".").pop().toUpperCase(),

            size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,

            uploadDate: formatNow().split("،")[0],

            icon: "bi-file-earmark"

        });

    });

    renderInfoCards(attachmentsGrid, patient.attachments, "مرفق طبي");

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

saveNoteBtn?.addEventListener("click", function () {

    const text = currentSessionNote.value.trim();

    if (text === "") {

        showToast("اكتب الملاحظة أولاً", "warning", "bi-exclamation-circle");

        return;

    }

    patient.notes.unshift({

        id: patient.notes.length + 1,

        date: formatNow().split("،")[0],

        doctor: doctor.fullName,

        text: text

    });

    patient.currentSessionNote = "";

    renderNotes();

    showToast("تم حفظ الملاحظة", "success", "bi-floppy");

});


/* ==========================================================
                    PATIENT HEADER
========================================================== */
function renderPatientHeader() {

    const patientName = document.getElementById("patient-name");
    const patientStatus = document.getElementById("patient-status");
    const patientDiagnosis = document.getElementById("patient-diagnosis");

    patientName.textContent = patient.fullName;

    patientDiagnosis.textContent = patient.diagnosis.diagnosis;
    patientStatus.textContent = getStatusText(patient.status);

    patientStatus.className = `status ${patient.status}`;

}

/* ==========================================================
                    PATIENT INFORMATION
========================================================== */

function renderPatientInfo() {

    const doctor = database.doctors.find(
        doctor => doctor.id === patient.doctorId
    );

    document.getElementById("patient-file-number").textContent =
        patient.fileNumber;

    document.getElementById("patient-age").textContent =
        `${patient.age} سنة`;

    document.getElementById("patient-phone").textContent =
        patient.phone;

    document.getElementById("patient-doctor").textContent =
        doctor ? doctor.fullName : "-";

    document.getElementById("patient-start").textContent =
        patient.startDate;

    document.getElementById("patient-last").textContent =
        patient.lastVisit;

}

/* ==========================================================
                    SUMMARY
========================================================== */

function renderPatientSummary() {

    document.getElementById("patient-total-sessions").textContent =
        patient.totalSessions;

    document.getElementById("patient-finished-sessions").textContent =
        patient.completedSessions;

    document.getElementById("patient-remaining-sessions").textContent =
        patient.remainingSessions;

    document.getElementById("patient-next-session").textContent =
        patient.nextAppointment;

}

/* ==========================================================
                    DIAGNOSIS
========================================================== */

function renderDiagnosis() {


    document.getElementById("patient-diagnosis-title").textContent =
        patient.diagnosis.diagnosis;
    document.getElementById("patient-chief-complaint").textContent =
        patient.diagnosis.complaint;

    document.getElementById("patient-injury-date").textContent =
        patient.diagnosis.injuryDate;

    document.getElementById("patient-pain-severity").textContent =
        patient.diagnosis.painLevel;

    document.getElementById("patient-doctor-notes").textContent =
        patient.diagnosis.doctorNotes;

}
/* ==========================================================
                    TREATMENT
========================================================== */

function renderTreatment() {

    document.getElementById("patient-treatment-type").textContent =
        patient.treatmentPlan.treatmentType;

    document.getElementById("patient-treatment-sessions").textContent =
        `${patient.treatmentPlan.sessions} جلسة`;

    document.getElementById("patient-treatment-session-duration").textContent =
        patient.treatmentPlan.sessionDuration;

    document.getElementById("patient-treatment-weekly-sessions").textContent =
        `${patient.treatmentPlan.weeklySessions} جلسات`;

    const goalsList = document.getElementById("patient-treatment-goals");

    goalsList.innerHTML = "";

    patient.treatmentPlan.goals.forEach(goal => {

        goalsList.innerHTML += `
            <li>${goal}</li>
        `;

    });

}

/* ==========================================================
                    ASSESSMENT
========================================================== */

function renderAssessment() {

    const assessment = patient.assessment;

    /* ===== البيانات الأساسية ===== */

    document.getElementById("patient-full-name").textContent = patient.fullName;

    document.getElementById("patient-gender").textContent = patient.gender;

    document.getElementById("patient-date-of-birth").textContent = patient.dateOfBirth;

    document.getElementById("age-patient").textContent = patient.age;

    document.getElementById("patient-national-id").textContent = patient.nationalId;

    document.getElementById("patient-nationality").textContent = patient.nationality;

    document.getElementById("patient-marital-status").textContent = patient.maritalStatus;

    document.getElementById("patient-phone-num").textContent = patient.phone;

    document.getElementById("patient-emergency-phone").textContent = patient.emergencyPhone;

    document.getElementById("patient-responsible-person").textContent =
        patient.responsiblePerson;

    document.getElementById("patient-created-at").textContent =
        patient.createdAt;

    document.getElementById("patient-file").textContent =
        patient.fileNumber;

    document.getElementById("patient-address").textContent =
        patient.address;



    /* ===== التاريخ الطبي ===== */

    document.getElementById("patient-main-diagnosis").textContent =
        assessment.medicalHistory.mainDiagnosis;

    document.getElementById("patient-medical-diagnosis").textContent =
        assessment.medicalHistory.medicalDiagnosis;

    document.getElementById("patient-referring-doctor").textContent =
        assessment.medicalHistory.referringDoctor;

    document.getElementById("patient-hospital").textContent =
        assessment.medicalHistory.hospital;

    document.getElementById("patient-condition-start-date").textContent =
        assessment.medicalHistory.conditionStartDate;

    document.getElementById("patient-condition-description").textContent =
        assessment.medicalHistory.conditionDescription;



    /* ===== التاريخ المرضي ===== */

    const historyTags = document.getElementById("patient-medical-history-tags");

    historyTags.innerHTML = "";

    assessment.chronicHistory.diseases.forEach(disease => {

        historyTags.innerHTML += `

        <span class="info-tag active">

            ${disease}

        </span>

        `;

    });

    document.getElementById("patient-allergies").textContent =
        assessment.chronicHistory.allergies;

    document.getElementById("patient-previous-surgeries").textContent =
        assessment.chronicHistory.previousSurgeries;



    /* ===== الإحالة ===== */

    document.getElementById("patient-referral-source").textContent =
        assessment.referral.source;

    document.getElementById("patient-referral-date").textContent =
        assessment.referral.date;

    document.getElementById("patient-referral-reason").textContent =
        assessment.referral.reason;



    /* ===== التاريخ الطبي والجراحي ===== */

    document.getElementById("patient-previous-hospitalization").textContent =
        assessment.medicalSurgicalHistory.previousHospitalization;

    document.getElementById("patient-previous-physiotherapy").textContent =
        assessment.medicalSurgicalHistory.previousPhysiotherapy;

    document.getElementById("patient-surgical-history").textContent =
        assessment.medicalSurgicalHistory.surgicalHistory;


    /* ===== التقييم البدني ===== */

    document.getElementById("patient-rom-level").textContent =
        assessment.physicalAssessment.rom;

    document.getElementById("patient-flexibility-level").textContent =
        assessment.physicalAssessment.flexibility;

    document.getElementById("patient-balance-level").textContent =
        assessment.physicalAssessment.balance;

    document.getElementById("patient-coordination-level").textContent =
        assessment.physicalAssessment.coordination;


    /* ===== القياسات ===== */

    document.getElementById("patient-height").textContent =
        assessment.measurements.height;

    document.getElementById("patient-weight").textContent =
        assessment.measurements.weight;

    document.getElementById("patient-bmi").textContent =
        assessment.measurements.bmi;


    /* ===== الحالة الوظيفية ===== */

    document.getElementById("patient-mobility-status").textContent =
        assessment.functionalStatus.mobilityStatus;

    document.getElementById("patient-assistive-device").textContent =
        assessment.functionalStatus.assistiveDevice;




    /* ===== أعراض وعلامات الإعاقة ===== */

    document.getElementById("patient-has-disability").textContent =
        assessment.disability.hasDisability;

    document.getElementById("patient-disability-type").textContent =
        assessment.disability.type;

    document.getElementById("patient-disability-severity").textContent =
        assessment.disability.severity;

    document.getElementById("patient-disability-symptoms").textContent =
        assessment.disability.symptoms;


    /* ===== الاختبارات الخاصة ===== */

    document.getElementById("patient-special-tests").textContent =
        assessment.specialTests.details;


    /* ===== تقييم الألم ===== */

    document.getElementById("patient-pain-location").textContent =
        assessment.painAssessment.location;

    document.getElementById("patient-pain-score").textContent =
        `${assessment.painAssessment.score} / 10`;

    document.getElementById("patient-pain-bar").style.width =
        `${assessment.painAssessment.score * 10}%`;


    /* ===== جودة الحياة ===== */

    document.getElementById("patient-occupation").textContent =
        assessment.qualityOfLife.occupation;

    document.getElementById("patient-work-impact").textContent =
        assessment.qualityOfLife.workImpact;


    /* ===== الأدوية الحالية ===== */

    document.getElementById("patient-current-medications").textContent =
        assessment.medications.current;


    /* ===== تعليمات المتابعة ===== */

    document.getElementById("patient-followup-exercises").textContent =
        assessment.followUp.exercises;

    document.getElementById("patient-followup-nutrition").textContent =
        assessment.followUp.nutrition;

    document.getElementById("patient-followup-precautions").textContent =
        assessment.followUp.precautions;

    document.getElementById("patient-followup-home-program").textContent =
        assessment.followUp.homeProgram;


    /* ===== التثقيف الصحي ===== */

    const educationTags = document.getElementById("patient-health-education-tags");

    educationTags.innerHTML = "";

    assessment.healthEducation.forEach(item => {

        educationTags.innerHTML += `
        <span class="info-tag active">
            ${item}
        </span>
    `;

    });
}
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
    renderPatientHeader();

    renderPatientInfo();

    renderPatientSummary();

    renderDiagnosis();

    renderTreatment();

    renderSessionsHistory();

    renderExercises();

    renderDevices();

    renderAttachments();

    renderNotes();

    renderAssessment();

}

init();
