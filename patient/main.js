import database from "../data/mockDatabase.js";

console.log("Patient Profile Loaded");

/* ==========================================================
                        SELECTORS
========================================================== */

// Topbar
const backBtn = document.querySelector(".back-btn");
const printButtons = document.querySelectorAll(".print-btn");
const shareBtn = document.querySelector(".share-btn");
const editHeaderBtn = document.querySelector(".edit-header-btn");

// Tabs
const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

// Patient Header
const patientNameEl = document.getElementById("patient-name");
const patientStatusEl = document.getElementById("patient-status");
const patientDiagnosisEl = document.getElementById("patient-diagnosis");

// Patient Info
const patientFileNumber = document.getElementById("patient-file-number");
const patientAge = document.getElementById("patient-age");
const patientPhone = document.getElementById("patient-phone");
const patientDoctor = document.getElementById("patient-doctor");
const patientStart = document.getElementById("patient-start");
const patientLast = document.getElementById("patient-last");

// Summary
const patientTotalSessions = document.getElementById("patient-total-sessions");
const patientFinishedSessions = document.getElementById("patient-finished-sessions");
const patientRemainingSessions = document.getElementById("patient-remaining-sessions");
const patientNextSession = document.getElementById("patient-next-session");

// Diagnosis Tab
const patientDiagnosisTitle = document.getElementById("patient-diagnosis-title");
const patientChiefComplaint = document.getElementById("patient-chief-complaint");
const patientInjuryDate = document.getElementById("patient-injury-date");
const patientPainSeverity = document.getElementById("patient-pain-severity");
const patientDoctorNotes = document.getElementById("patient-doctor-notes");

// Treatment Tab
const patientTreatmentType = document.getElementById("patient-treatment-type");
const patientTreatmentSessions = document.getElementById("patient-treatment-sessions");
const patientTreatmentSessionDuration = document.getElementById("patient-treatment-session-duration");
const patientTreatmentWeeklySessions = document.getElementById("patient-treatment-weekly-sessions");
const patientTreatmentGoals = document.getElementById("patient-treatment-goals");

// Sessions Tab
const sessionsHistoryBody = document.getElementById("sessions-history-body");
const addSessionBtn = document.querySelector(".add-session-btn");

// Session Modal
const sessionModal = document.getElementById("session-modal");
const closeSessionModalBtn = document.querySelector(".close-session-modal");
const addSessionForm = document.querySelector(".add-session-form");
const sessionDateInput = document.getElementById("session-date");
const sessionStatusInput = document.getElementById("session-status");
const sessionNotesInput = document.getElementById("session-notes");
const sessionDateError = document.getElementById("session-date-error");

// Exercises
const exerciseGrid = document.getElementById("exercise-grid");
const addExerciseBtn = document.querySelector(".add-exercise-btn");
const exerciseForm = document.getElementById("add-exercise-form");
const exerciseName = document.getElementById("exercise-name");
const exerciseSets = document.getElementById("exercise-sets");
const exerciseReps = document.getElementById("exercise-reps");
const exerciseDuration = document.getElementById("exercise-duration");
const saveExerciseBtn = document.getElementById("save-exercise-btn");
const cancelExerciseBtn = document.getElementById("cancel-exercise-btn");

// Devices
const devicesGrid = document.getElementById("devices-grid");
const addDeviceBtn = document.querySelector(".add-device-btn");
const deviceForm = document.getElementById("add-device-form");
const deviceName = document.getElementById("device-name");
const deviceDesc = document.getElementById("device-desc");
const deviceSessions = document.getElementById("device-sessions");
const saveDeviceBtn = document.getElementById("save-device-btn");
const cancelDeviceBtn = document.getElementById("cancel-device-btn");

// Attachments
const attachmentsGrid = document.getElementById("attachments-grid");
const attachFileBtn = document.querySelector(".attach-file-btn");
const attachmentInput = document.getElementById("attachment-input");

// Notes
const currentSessionNote = document.getElementById("current-session-note");
const notesHistory = document.getElementById("notes-history");
const saveNoteBtn = document.querySelector(".save-note-btn");

// Assessment
const assessmentSelectors = {
    fullName: document.getElementById("patient-full-name"),
    gender: document.getElementById("patient-gender"),
    dateOfBirth: document.getElementById("patient-date-of-birth"),
    agePatient: document.getElementById("age-patient"),
    nationalId: document.getElementById("patient-national-id"),
    nationality: document.getElementById("patient-nationality"),
    maritalStatus: document.getElementById("patient-marital-status"),
    phoneNum: document.getElementById("patient-phone-num"),
    emergencyPhone: document.getElementById("patient-emergency-phone"),
    responsiblePerson: document.getElementById("patient-responsible-person"),
    createdAt: document.getElementById("patient-created-at"),
    file: document.getElementById("patient-file"),
    address: document.getElementById("patient-address"),
    mainDiagnosis: document.getElementById("patient-main-diagnosis"),
    medicalDiagnosis: document.getElementById("patient-medical-diagnosis"),
    referringDoctor: document.getElementById("patient-referring-doctor"),
    hospital: document.getElementById("patient-hospital"),
    conditionStartDate: document.getElementById("patient-condition-start-date"),
    conditionDescription: document.getElementById("patient-condition-description"),
    medicalHistoryTags: document.getElementById("patient-medical-history-tags"),
    allergies: document.getElementById("patient-allergies"),
    previousSurgeries: document.getElementById("patient-previous-surgeries"),
    referralSource: document.getElementById("patient-referral-source"),
    referralDate: document.getElementById("patient-referral-date"),
    referralReason: document.getElementById("patient-referral-reason"),
    previousHospitalization: document.getElementById("patient-previous-hospitalization"),
    previousPhysiotherapy: document.getElementById("patient-previous-physiotherapy"),
    surgicalHistory: document.getElementById("patient-surgical-history"),
    romLevel: document.getElementById("patient-rom-level"),
    flexibilityLevel: document.getElementById("patient-flexibility-level"),
    balanceLevel: document.getElementById("patient-balance-level"),
    coordinationLevel: document.getElementById("patient-coordination-level"),
    height: document.getElementById("patient-height"),
    weight: document.getElementById("patient-weight"),
    bmi: document.getElementById("patient-bmi"),
    mobilityStatus: document.getElementById("patient-mobility-status"),
    assistiveDevice: document.getElementById("patient-assistive-device"),
    hasDisability: document.getElementById("patient-has-disability"),
    disabilityType: document.getElementById("patient-disability-type"),
    disabilitySeverity: document.getElementById("patient-disability-severity"),
    disabilitySymptoms: document.getElementById("patient-disability-symptoms"),
    specialTests: document.getElementById("patient-special-tests"),
    painLocation: document.getElementById("patient-pain-location"),
    painScore: document.getElementById("patient-pain-score"),
    painBar: document.getElementById("patient-pain-bar"),
    occupation: document.getElementById("patient-occupation"),
    workImpact: document.getElementById("patient-work-impact"),
    currentMedications: document.getElementById("patient-current-medications"),
    followupExercises: document.getElementById("patient-followup-exercises"),
    followupNutrition: document.getElementById("patient-followup-nutrition"),
    followupPrecautions: document.getElementById("patient-followup-precautions"),
    followupHomeProgram: document.getElementById("patient-followup-home-program"),
    healthEducationTags: document.getElementById("patient-health-education-tags")
};

// Toast
const toastContainer = document.getElementById("toast-container");

/* ==========================================================
                        GET PATIENT ID
========================================================== */

const urlParams = new URLSearchParams(window.location.search);
const fromPage = urlParams.get("from") || "";

function getPatientId() {
    const idFromUrl = urlParams.get("id");
    if (idFromUrl) return parseInt(idFromUrl);
    const idFromStorage = localStorage.getItem("currentPatientId");
    if (idFromStorage) return parseInt(idFromStorage);
    return database.patients[0]?.id || 1001;
}

const patientId = getPatientId();
const patient = database.patients.find(p => p.id === patientId);

if (!patient) {
    console.error("Patient not found:", patientId);
    const fallback = database.patients[0];
    if (fallback) {
        window.location.href = `patient.html?id=${fallback.id}`;
    } else {
        document.body.innerHTML = "<h1>لا يوجد مرضى في النظام</h1>";
    }
}

const doctor = database.doctors.find(d => d.id === patient.doctorId);

/* ==========================================================
                        HELPERS
========================================================== */

function showToast(message, type = "info", icon = "bi-check-circle") {
    if (!toastContainer) return;
    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `<i class="bi ${icon}"></i><span>${message}</span>`;
    toastContainer.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add("show"));
    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

function getStatusText(status) {
    const map = {
        "active": "نشط",
        "pending": "معلق",
        "inactive": "منتهي"
    };
    return map[status] || status;
}

function getStatusClass(status) {
    const map = {
        "active": "active",
        "pending": "pending",
        "inactive": "inactive",
        "مكتملة": "active",
        "جارية": "pending",
        "قادمة": "inactive",
        "ملغية": "inactive"
    };
    return map[status] || "";
}

function getSessionStatusClass(status) {
    const map = {
        "مكتملة": "active",
        "جارية": "pending",
        "قادمة": "inactive",
        "ملغية": "inactive"
    };
    return map[status] || "";
}

function getTodayDate() {
    const now = new Date();
    const d = String(now.getDate()).padStart(2, '0');
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const y = now.getFullYear();
    return `${d}/${m}/${y}`;
}

function getFileIcon(ext) {
    const icons = {
        'PDF': 'bi-file-earmark-pdf',
        'DOC': 'bi-file-earmark-word',
        'DOCX': 'bi-file-earmark-word',
        'JPG': 'bi-file-earmark-image',
        'JPEG': 'bi-file-earmark-image',
        'PNG': 'bi-file-earmark-image',
        'GIF': 'bi-file-earmark-image',
        'SVG': 'bi-file-earmark-image',
        'MP4': 'bi-file-earmark-play',
        'MP3': 'bi-file-earmark-music',
        'ZIP': 'bi-file-earmark-zip',
        'TXT': 'bi-file-earmark-text'
    };
    return icons[ext] || 'bi-file-earmark';
}

function populateDoctorsSelect(selectId) {
    const select = document.getElementById(selectId);
    if (!select) return;
    select.innerHTML = '<option value="">اختر الدكتور</option>';
    database.doctors.forEach(doc => {
        const option = document.createElement("option");
        option.value = doc.id;
        option.textContent = doc.fullName;
        if (doc.id === patient.doctorId) {
            option.selected = true;
        }
        select.appendChild(option);
    });
}

/* ==========================================================
                        TABS
========================================================== */

function activateTab(tabName) {
    tabButtons.forEach(button => {
        button.classList.toggle("active", button.dataset.tab === tabName);
    });
    tabContents.forEach(content => {
        const contentId = content.id;
        content.classList.toggle("active-tab", contentId === tabName || contentId === `section-${tabName}`);
    });
}

tabButtons.forEach(button => {
    button.addEventListener("click", function () {
        activateTab(this.dataset.tab);
    });
});

/* ==========================================================
                        RENDER FUNCTIONS
========================================================== */

function renderPatientHeader() {
    patientNameEl.textContent = patient.fullName;
    patientStatusEl.textContent = getStatusText(patient.status);
    patientStatusEl.className = `status ${getStatusClass(patient.status)}`;
    patientDiagnosisEl.textContent = patient.diagnosis?.diagnosis || "-";
}

function renderPatientInfo() {
    patientFileNumber.textContent = patient.fileNumber || `#${patient.id}`;
    patientAge.textContent = patient.age ? `${patient.age} سنة` : "-";
    patientPhone.textContent = patient.phone || "-";
    patientDoctor.textContent = doctor ? doctor.fullName : "-";
    patientStart.textContent = patient.startDate || "-";
    patientLast.textContent = patient.lastVisit || "-";
}

function renderPatientSummary() {
    patientTotalSessions.textContent = patient.totalSessions || 0;
    patientFinishedSessions.textContent = patient.completedSessions || 0;
    patientRemainingSessions.textContent = patient.remainingSessions || 0;
    patientNextSession.textContent = patient.nextAppointment || "-";
}

function renderDiagnosis() {
    const diag = patient.diagnosis || {};
    patientDiagnosisTitle.textContent = diag.diagnosis || "-";
    patientChiefComplaint.textContent = diag.complaint || "-";
    patientInjuryDate.textContent = diag.injuryDate || "-";
    patientPainSeverity.textContent = diag.painLevel || "-";
    patientDoctorNotes.textContent = diag.doctorNotes || "لا توجد ملاحظات";
}

function renderTreatment() {
    const plan = patient.treatmentPlan || {};
    patientTreatmentType.textContent = plan.treatmentType || "-";
    patientTreatmentSessions.textContent = plan.sessions ? `${plan.sessions} جلسة` : "-";
    patientTreatmentSessionDuration.textContent = plan.sessionDuration || "-";
    patientTreatmentWeeklySessions.textContent = plan.weeklySessions ? `${plan.weeklySessions} جلسات` : "-";
    
    patientTreatmentGoals.innerHTML = "";
    if (plan.goals && plan.goals.length > 0) {
        plan.goals.forEach(goal => {
            patientTreatmentGoals.innerHTML += `<li>${goal}</li>`;
        });
    } else {
        patientTreatmentGoals.innerHTML = "<li>لا توجد أهداف محددة</li>";
    }
}

function renderSessionsHistory() {
    if (!sessionsHistoryBody) return;
    const sessions = patient.sessions || [];
    if (sessions.length === 0) {
        sessionsHistoryBody.innerHTML = `
            <tr>
                <td colspan="6">
                    <div class="empty-state">
                        <i class="bi bi-calendar-check"></i>
                        <h3>لا توجد جلسات</h3>
                        <p>لم يتم تسجيل أي جلسات لهذا المريض.</p>
                    </div>
                </td>
            </tr>
        `;
        return;
    }
    sessionsHistoryBody.innerHTML = "";
    sessions.forEach((session, index) => {
        sessionsHistoryBody.innerHTML += `
            <tr>
                <td>${session.number || "-"}</td>
                <td>${session.date || "-"}</td>
                <td>${session.doctor || "-"}</td>
                <td>
                    <span class="status ${getSessionStatusClass(session.status)}">
                        ${session.status || "-"}
                    </span>
                </td>
                <td>${session.notes || "-"}</td>
                <td>
                    <button class="secondary-btn btn-sm btn-sm-danger delete-session-btn" data-index="${index}">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    });
    // ربط أحداث الحذف
    document.querySelectorAll(".delete-session-btn").forEach(btn => {
        btn.addEventListener("click", function() {
            const idx = parseInt(this.dataset.index);
            if (confirm("هل أنت متأكد من حذف هذه الجلسة؟")) {
                patient.sessions.splice(idx, 1);
                const completed = patient.sessions.filter(s => s.status === "مكتملة").length;
                patient.completedSessions = completed;
                patient.totalSessions = patient.sessions.length;
                patient.remainingSessions = Math.max(0, (patient.totalSessions || 0) - completed);
                renderSessionsHistory();
                renderPatientSummary();
                showToast("تم حذف الجلسة", "success", "bi-trash");
            }
        });
    });
}

function renderExercises() {
    if (!exerciseGrid) return;
    const exercises = patient.exercises || [];
    if (exercises.length === 0) {
        exerciseGrid.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <i class="bi bi-person-arms-up"></i>
                <h3>لا توجد تمارين</h3>
                <p>لم يتم إضافة تمارين لهذا المريض.</p>
            </div>
        `;
        return;
    }
    exerciseGrid.innerHTML = "";
    exercises.forEach((ex, index) => {
        exerciseGrid.innerHTML += `
            <article class="info-card">
                <div class="info-card-icon">
                    <i class="bi ${ex.icon || 'bi-activity'}"></i>
                </div>
                <div class="info-card-content">
                    <h4>${ex.name}</h4>
                    <p>${ex.description || ""}</p>
                    <small>
                        ${ex.sets || 0} مجموعات • 
                        ${ex.reps || 0} تكرار • 
                        ${ex.duration || ""}
                    </small>
                </div>
                <div class="info-card-actions">
                    <button class="btn-sm btn-sm-danger delete-exercise-btn" data-index="${index}">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            </article>
        `;
    });
    document.querySelectorAll(".delete-exercise-btn").forEach(btn => {
        btn.addEventListener("click", function() {
            const idx = parseInt(this.dataset.index);
            if (confirm("هل أنت متأكد من حذف هذا التمرين؟")) {
                patient.exercises.splice(idx, 1);
                renderExercises();
                showToast("تم حذف التمرين", "success", "bi-trash");
            }
        });
    });
}

function renderDevices() {
    if (!devicesGrid) return;
    const devices = patient.devices || [];
    if (devices.length === 0) {
        devicesGrid.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <i class="bi bi-device-hdd"></i>
                <h3>لا توجد أجهزة</h3>
                <p>لم يتم تسجيل أي أجهزة لهذا المريض.</p>
            </div>
        `;
        return;
    }
    devicesGrid.innerHTML = "";
    devices.forEach((device, index) => {
        devicesGrid.innerHTML += `
            <article class="info-card">
                <div class="info-card-icon">
                    <i class="bi ${device.icon || 'bi-device-hdd'}"></i>
                </div>
                <div class="info-card-content">
                    <h4>${device.name}</h4>
                    <p>${device.description || ""}</p>
                    <small>${device.sessions || ""}</small>
                </div>
                <div class="info-card-actions">
                    <button class="btn-sm btn-sm-danger delete-device-btn" data-index="${index}">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            </article>
        `;
    });
    document.querySelectorAll(".delete-device-btn").forEach(btn => {
        btn.addEventListener("click", function() {
            const idx = parseInt(this.dataset.index);
            if (confirm("هل أنت متأكد من حذف هذا الجهاز؟")) {
                patient.devices.splice(idx, 1);
                renderDevices();
                showToast("تم حذف الجهاز", "success", "bi-trash");
            }
        });
    });
}

function renderAttachments() {
    if (!attachmentsGrid) return;
    const attachments = patient.attachments || [];
    if (attachments.length === 0) {
        attachmentsGrid.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <i class="bi bi-paperclip"></i>
                <h3>لا توجد مرفقات</h3>
                <p>لم يتم إرفاق أي ملفات لهذا المريض.</p>
            </div>
        `;
        return;
    }
    attachmentsGrid.innerHTML = "";
    attachments.forEach((file, index) => {
        attachmentsGrid.innerHTML += `
            <article class="info-card">
                <div class="info-card-icon">
                    <i class="bi ${file.icon || 'bi-file-earmark'}"></i>
                </div>
                <div class="info-card-content">
                    <h4>${file.name}</h4>
                    <p>${file.type || "ملف"}</p>
                    <small>${file.size || ""} • ${file.uploadDate || ""}</small>
                </div>
                <div class="info-card-actions">
                    <button class="btn-sm btn-sm-danger delete-attachment-btn" data-index="${index}">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            </article>
        `;
    });
    document.querySelectorAll(".delete-attachment-btn").forEach(btn => {
        btn.addEventListener("click", function() {
            const idx = parseInt(this.dataset.index);
            if (confirm("هل أنت متأكد من حذف هذا المرفق؟")) {
                patient.attachments.splice(idx, 1);
                renderAttachments();
                showToast("تم حذف المرفق", "success", "bi-trash");
            }
        });
    });
}

function renderNotes() {
    if (!notesHistory) return;
    currentSessionNote.value = patient.currentSessionNote || "";
    const notes = patient.notes || [];
    if (notes.length === 0) {
        notesHistory.innerHTML = `
            <div class="empty-state" style="padding: 20px;">
                <i class="bi bi-journal-text"></i>
                <h3>لا توجد ملاحظات</h3>
                <p>لم يتم تسجيل أي ملاحظات لهذا المريض.</p>
            </div>
        `;
        return;
    }
    notesHistory.innerHTML = "";
    notes.forEach(note => {
        notesHistory.innerHTML += `
            <div class="note-card">
                <div class="note-header">
                    <span class="note-date">${note.date || "-"}</span>
                    <span class="note-doctor">
                        <i class="bi bi-person"></i>
                        ${note.doctor || "طبيب"}
                    </span>
                </div>
                <div class="note-body">${note.text || "-"}</div>
            </div>
        `;
    });
}

function renderAssessment() {
    const a = patient.assessment || {};
    
    assessmentSelectors.fullName.textContent = patient.fullName || "-";
    assessmentSelectors.gender.textContent = patient.gender || "-";
    assessmentSelectors.dateOfBirth.textContent = patient.dateOfBirth || "-";
    assessmentSelectors.agePatient.textContent = patient.age || "-";
    assessmentSelectors.nationalId.textContent = patient.nationalId || "-";
    assessmentSelectors.nationality.textContent = patient.nationality || "-";
    assessmentSelectors.maritalStatus.textContent = patient.maritalStatus || "-";
    assessmentSelectors.phoneNum.textContent = patient.phone || "-";
    assessmentSelectors.emergencyPhone.textContent = patient.emergencyPhone || "-";
    assessmentSelectors.responsiblePerson.textContent = patient.responsiblePerson || "-";
    assessmentSelectors.createdAt.textContent = patient.createdAt || "-";
    assessmentSelectors.file.textContent = patient.fileNumber || `#${patient.id}`;
    assessmentSelectors.address.textContent = patient.address || "-";
    
    const mh = a.medicalHistory || {};
    assessmentSelectors.mainDiagnosis.textContent = mh.mainDiagnosis || "-";
    assessmentSelectors.medicalDiagnosis.textContent = mh.medicalDiagnosis || "-";
    assessmentSelectors.referringDoctor.textContent = mh.referringDoctor || "-";
    assessmentSelectors.hospital.textContent = mh.hospital || "-";
    assessmentSelectors.conditionStartDate.textContent = mh.conditionStartDate || "-";
    assessmentSelectors.conditionDescription.textContent = mh.conditionDescription || "-";
    
    const ch = a.chronicHistory || {};
    assessmentSelectors.medicalHistoryTags.innerHTML = "";
    if (ch.diseases && ch.diseases.length > 0) {
        ch.diseases.forEach(disease => {
            assessmentSelectors.medicalHistoryTags.innerHTML += `<span class="info-tag active">${disease}</span>`;
        });
    } else {
        assessmentSelectors.medicalHistoryTags.innerHTML = `<span class="info-tag">لا توجد أمراض مزمنة</span>`;
    }
    assessmentSelectors.allergies.textContent = ch.allergies || "-";
    assessmentSelectors.previousSurgeries.textContent = ch.previousSurgeries || "-";
    
    const ref = a.referral || {};
    assessmentSelectors.referralSource.textContent = ref.source || "-";
    assessmentSelectors.referralDate.textContent = ref.date || "-";
    assessmentSelectors.referralReason.textContent = ref.reason || "-";
    
    const sh = a.medicalSurgicalHistory || {};
    assessmentSelectors.previousHospitalization.textContent = sh.previousHospitalization || "-";
    assessmentSelectors.previousPhysiotherapy.textContent = sh.previousPhysiotherapy || "-";
    assessmentSelectors.surgicalHistory.textContent = sh.surgicalHistory || "-";
    
    const pa = a.physicalAssessment || {};
    assessmentSelectors.romLevel.textContent = pa.rom || "-";
    assessmentSelectors.flexibilityLevel.textContent = pa.flexibility || "-";
    assessmentSelectors.balanceLevel.textContent = pa.balance || "-";
    assessmentSelectors.coordinationLevel.textContent = pa.coordination || "-";
    
    const meas = a.measurements || {};
    assessmentSelectors.height.textContent = meas.height || "-";
    assessmentSelectors.weight.textContent = meas.weight || "-";
    assessmentSelectors.bmi.textContent = meas.bmi || "-";
    
    const fs = a.functionalStatus || {};
    assessmentSelectors.mobilityStatus.textContent = fs.mobilityStatus || "-";
    assessmentSelectors.assistiveDevice.textContent = fs.assistiveDevice || "-";
    
    const dis = a.disability || {};
    assessmentSelectors.hasDisability.textContent = dis.hasDisability || "-";
    assessmentSelectors.disabilityType.textContent = dis.type || "-";
    assessmentSelectors.disabilitySeverity.textContent = dis.severity || "-";
    assessmentSelectors.disabilitySymptoms.textContent = dis.symptoms || "-";
    
    const st = a.specialTests || {};
    assessmentSelectors.specialTests.textContent = st.details || "-";
    
    const pain = a.painAssessment || {};
    assessmentSelectors.painLocation.textContent = pain.location || "-";
    const score = pain.score || 0;
    assessmentSelectors.painScore.textContent = `${score} / 10`;
    assessmentSelectors.painBar.style.width = `${score * 10}%`;
    
    const qol = a.qualityOfLife || {};
    assessmentSelectors.occupation.textContent = qol.occupation || "-";
    assessmentSelectors.workImpact.textContent = qol.workImpact || "-";
    
    assessmentSelectors.currentMedications.textContent = a.medications?.current || "-";
    
    const fu = a.followUp || {};
    assessmentSelectors.followupExercises.textContent = fu.exercises || "-";
    assessmentSelectors.followupNutrition.textContent = fu.nutrition || "-";
    assessmentSelectors.followupPrecautions.textContent = fu.precautions || "-";
    assessmentSelectors.followupHomeProgram.textContent = fu.homeProgram || "-";
    
    assessmentSelectors.healthEducationTags.innerHTML = "";
    const he = a.healthEducation || [];
    if (he.length > 0) {
        he.forEach(item => {
            assessmentSelectors.healthEducationTags.innerHTML += `<span class="info-tag active">${item}</span>`;
        });
    } else {
        assessmentSelectors.healthEducationTags.innerHTML = `<span class="info-tag">لا توجد بيانات</span>`;
    }
}

/* ==========================================================
                        RENDER ALL
========================================================== */

function renderAll() {
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

/* ==========================================================
                        INLINE EDITING SYSTEM
========================================================== */

function toggleEdit(sectionId) {
    const section = document.getElementById(`section-${sectionId}`);
    if (!section) {
        console.error(`Section not found: section-${sectionId}`);
        return;
    }
    
    const isEditing = section.classList.contains('section-edit');
    
    if (isEditing) {
        cancelEdit(sectionId);
        return;
    }
    
    section.classList.add('section-edit');
    
    const editBtn = section.querySelector('.edit-toggle-btn');
    const editActions = section.querySelector('.edit-actions');
    if (editBtn) editBtn.style.display = 'none';
    if (editActions) editActions.style.display = 'flex';
    
    const viewMode = section.querySelector('.view-mode');
    const editMode = section.querySelector('.edit-mode');
    if (viewMode) viewMode.style.display = 'none';
    if (editMode) editMode.style.display = 'block';
    
    fillEditFields(sectionId);
}

function cancelEdit(sectionId) {
    const section = document.getElementById(`section-${sectionId}`);
    if (!section) return;
    
    section.classList.remove('section-edit');
    
    const editBtn = section.querySelector('.edit-toggle-btn');
    const editActions = section.querySelector('.edit-actions');
    if (editBtn) editBtn.style.display = 'inline-flex';
    if (editActions) editActions.style.display = 'none';
    
    const viewMode = section.querySelector('.view-mode');
    const editMode = section.querySelector('.edit-mode');
    if (viewMode) viewMode.style.display = 'block';
    if (editMode) editMode.style.display = 'none';
    
    renderAll();
}

function fillEditFields(sectionId) {
    switch(sectionId) {
        case 'header':
            document.getElementById('edit-header-name').value = patient.fullName || '';
            document.getElementById('edit-header-status').value = patient.status || 'active';
            document.getElementById('edit-header-diagnosis').value = patient.diagnosis?.diagnosis || '';
            break;
            
        case 'basic':
            document.getElementById('edit-basic-file').value = patient.fileNumber || `#${patient.id}`;
            document.getElementById('edit-basic-age').value = patient.age || '';
            document.getElementById('edit-basic-phone').value = patient.phone || '';
            document.getElementById('edit-basic-start').value = patient.startDate || '';
            document.getElementById('edit-basic-last').value = patient.lastVisit || '';
            populateDoctorsSelect('edit-basic-doctor');
            break;
            
        case 'diagnosis':
            document.getElementById('edit-diagnosis-title').value = patient.diagnosis?.diagnosis || '';
            document.getElementById('edit-diagnosis-complaint').value = patient.diagnosis?.complaint || '';
            document.getElementById('edit-diagnosis-injury').value = patient.diagnosis?.injuryDate || '';
            document.getElementById('edit-diagnosis-pain').value = patient.diagnosis?.painLevel || 'متوسطة';
            document.getElementById('edit-diagnosis-notes').value = patient.diagnosis?.doctorNotes || '';
            break;
            
        case 'treatment':
            document.getElementById('edit-treatment-type').value = patient.treatmentPlan?.treatmentType || '';
            document.getElementById('edit-treatment-sessions').value = patient.treatmentPlan?.sessions || '';
            document.getElementById('edit-treatment-duration').value = patient.treatmentPlan?.sessionDuration || '';
            document.getElementById('edit-treatment-weekly').value = patient.treatmentPlan?.weeklySessions || '';
            document.getElementById('edit-treatment-goals').value = (patient.treatmentPlan?.goals || []).join('\n');
            break;
            
        case 'assessment':
            fillAssessmentEditFields();
            break;
    }
}

function saveSection(sectionId) {
    switch(sectionId) {
        case 'header':
            patient.fullName = document.getElementById('edit-header-name').value.trim() || patient.fullName;
            patient.status = document.getElementById('edit-header-status').value;
            if (!patient.diagnosis) patient.diagnosis = {};
            patient.diagnosis.diagnosis = document.getElementById('edit-header-diagnosis').value.trim() || patient.diagnosis.diagnosis;
            showToast('تم تحديث بيانات رأس الملف', 'success', 'bi-check');
            break;
            
        case 'basic':
            patient.age = parseInt(document.getElementById('edit-basic-age').value) || patient.age;
            patient.phone = document.getElementById('edit-basic-phone').value.trim() || patient.phone;
            patient.doctorId = parseInt(document.getElementById('edit-basic-doctor').value) || patient.doctorId;
            patient.startDate = document.getElementById('edit-basic-start').value.trim() || patient.startDate;
            patient.lastVisit = document.getElementById('edit-basic-last').value.trim() || patient.lastVisit;
            showToast('تم تحديث بيانات المريض', 'success', 'bi-check');
            break;
            
        case 'diagnosis':
            if (!patient.diagnosis) patient.diagnosis = {};
            patient.diagnosis.diagnosis = document.getElementById('edit-diagnosis-title').value.trim() || patient.diagnosis.diagnosis;
            patient.diagnosis.complaint = document.getElementById('edit-diagnosis-complaint').value.trim() || patient.diagnosis.complaint;
            patient.diagnosis.injuryDate = document.getElementById('edit-diagnosis-injury').value.trim() || patient.diagnosis.injuryDate;
            patient.diagnosis.painLevel = document.getElementById('edit-diagnosis-pain').value || patient.diagnosis.painLevel;
            patient.diagnosis.doctorNotes = document.getElementById('edit-diagnosis-notes').value.trim() || patient.diagnosis.doctorNotes;
            showToast('تم تحديث التشخيص', 'success', 'bi-check');
            break;
            
        case 'treatment':
            if (!patient.treatmentPlan) patient.treatmentPlan = {};
            patient.treatmentPlan.treatmentType = document.getElementById('edit-treatment-type').value.trim() || patient.treatmentPlan.treatmentType;
            patient.treatmentPlan.sessions = parseInt(document.getElementById('edit-treatment-sessions').value) || patient.treatmentPlan.sessions;
            patient.treatmentPlan.sessionDuration = document.getElementById('edit-treatment-duration').value.trim() || patient.treatmentPlan.sessionDuration;
            patient.treatmentPlan.weeklySessions = parseInt(document.getElementById('edit-treatment-weekly').value) || patient.treatmentPlan.weeklySessions;
            const goalsText = document.getElementById('edit-treatment-goals').value.trim();
            patient.treatmentPlan.goals = goalsText ? goalsText.split('\n').filter(g => g.trim() !== '') : [];
            showToast('تم تحديث الخطة العلاجية', 'success', 'bi-check');
            break;
            
        case 'assessment':
            saveAssessmentData();
            showToast('تم تحديث التقييم الطبي الشامل', 'success', 'bi-check');
            break;
    }
    
    renderAll();
    
    const section = document.getElementById(`section-${sectionId}`);
    if (section) {
        section.classList.remove('section-edit');
        const editBtn = section.querySelector('.edit-toggle-btn');
        const editActions = section.querySelector('.edit-actions');
        if (editBtn) editBtn.style.display = 'inline-flex';
        if (editActions) editActions.style.display = 'none';
        const viewMode = section.querySelector('.view-mode');
        const editMode = section.querySelector('.edit-mode');
        if (viewMode) viewMode.style.display = 'block';
        if (editMode) editMode.style.display = 'none';
    }
}

/* ==========================================================
                        ASSESSMENT EDIT FUNCTIONS
========================================================== */

function fillAssessmentEditFields() {
    const a = patient.assessment || {};
    const setVal = (id, value) => {
        const el = document.getElementById(id);
        if (el) el.value = value || '';
    };
    const setSelect = (id, value) => {
        const el = document.getElementById(id);
        if (el) el.value = value || '';
    };
    const setCheckboxes = (containerId, values) => {
        const checkboxes = document.querySelectorAll(`#${containerId} input[type="checkbox"]`);
        checkboxes.forEach(cb => {
            cb.checked = values.includes(cb.value);
        });
    };
    const setPain = (score) => {
        const slider = document.getElementById('edit-assess-pain-score');
        const display = document.getElementById('edit-assess-pain-score-value');
        if (slider) slider.value = score || 0;
        if (display) display.textContent = score || 0;
    };

    // Basic
    setVal('edit-assess-full-name', patient.fullName);
    setSelect('edit-assess-gender', patient.gender);
    setVal('edit-assess-dob', patient.dateOfBirth);
    setVal('edit-assess-age', patient.age);
    setVal('edit-assess-national-id', patient.nationalId);
    setVal('edit-assess-nationality', patient.nationality);
    setSelect('edit-assess-marital', patient.maritalStatus);
    setVal('edit-assess-phone', patient.phone);
    setVal('edit-assess-emergency', patient.emergencyPhone);
    setVal('edit-assess-responsible', patient.responsiblePerson);
    setVal('edit-assess-created', patient.createdAt);
    setVal('edit-assess-file', patient.fileNumber || `#${patient.id}`);
    setVal('edit-assess-address', patient.address);

    // Medical History
    const mh = a.medicalHistory || {};
    setVal('edit-assess-main-diagnosis', mh.mainDiagnosis);
    setVal('edit-assess-medical-diagnosis', mh.medicalDiagnosis);
    setVal('edit-assess-referring-doctor', mh.referringDoctor);
    setVal('edit-assess-hospital', mh.hospital);
    setVal('edit-assess-condition-date', mh.conditionStartDate);
    setVal('edit-assess-condition-desc', mh.conditionDescription);

    // Chronic
    const ch = a.chronicHistory || {};
    setCheckboxes('edit-assess-chronic-diseases', ch.diseases || []);
    setVal('edit-assess-allergies', ch.allergies);
    setVal('edit-assess-surgeries', ch.previousSurgeries);

    // Referral
    const ref = a.referral || {};
    setVal('edit-assess-referral-source', ref.source);
    setVal('edit-assess-referral-date', ref.date);
    setVal('edit-assess-referral-reason', ref.reason);

    // Surgical
    const sh = a.medicalSurgicalHistory || {};
    setSelect('edit-assess-prev-hospitalization', sh.previousHospitalization);
    setSelect('edit-assess-prev-physio', sh.previousPhysiotherapy);
    setVal('edit-assess-surgical-history', sh.surgicalHistory);

    // Physical
    const pa = a.physicalAssessment || {};
    setSelect('edit-assess-rom', pa.rom);
    setSelect('edit-assess-flexibility', pa.flexibility);
    setSelect('edit-assess-balance', pa.balance);
    setSelect('edit-assess-coordination', pa.coordination);

    // Measurements
    const meas = a.measurements || {};
    setVal('edit-assess-height', meas.height);
    setVal('edit-assess-weight', meas.weight);
    setVal('edit-assess-bmi', meas.bmi);

    // Functional
    const fs = a.functionalStatus || {};
    setSelect('edit-assess-mobility', fs.mobilityStatus);
    setVal('edit-assess-assistive', fs.assistiveDevice);

    // Disability
    const dis = a.disability || {};
    setSelect('edit-assess-has-disability', dis.hasDisability);
    setVal('edit-assess-disability-type', dis.type);
    setSelect('edit-assess-disability-severity', dis.severity);
    setVal('edit-assess-disability-symptoms', dis.symptoms);

    // Special Tests
    const st = a.specialTests || {};
    setVal('edit-assess-special-tests', st.details);

    // Pain
    const pain = a.painAssessment || {};
    setVal('edit-assess-pain-location', pain.location);
    setPain(pain.score);

    // QOL
    const qol = a.qualityOfLife || {};
    setVal('edit-assess-occupation', qol.occupation);
    setVal('edit-assess-work-impact', qol.workImpact);

    // Medications
    setVal('edit-assess-medications', a.medications?.current);

    // Follow-up
    const fu = a.followUp || {};
    setVal('edit-assess-followup-exercises', fu.exercises);
    setVal('edit-assess-followup-nutrition', fu.nutrition);
    setVal('edit-assess-followup-precautions', fu.precautions);
    setVal('edit-assess-followup-home', fu.homeProgram);

    // Education
    setCheckboxes('edit-assess-health-education', a.healthEducation || []);
}

function saveAssessmentData() {
    const getVal = (id) => document.getElementById(id)?.value || '';
    const getCheckboxValues = (containerId) => {
        const checked = document.querySelectorAll(`#${containerId} input:checked`);
        return Array.from(checked).map(el => el.value);
    };
    const getPain = () => parseInt(document.getElementById('edit-assess-pain-score')?.value) || 0;

    const assessment = {
        medicalHistory: {
            mainDiagnosis: getVal('edit-assess-main-diagnosis'),
            medicalDiagnosis: getVal('edit-assess-medical-diagnosis'),
            referringDoctor: getVal('edit-assess-referring-doctor'),
            hospital: getVal('edit-assess-hospital'),
            conditionStartDate: getVal('edit-assess-condition-date'),
            conditionDescription: getVal('edit-assess-condition-desc')
        },
        chronicHistory: {
            diseases: getCheckboxValues('edit-assess-chronic-diseases'),
            allergies: getVal('edit-assess-allergies'),
            previousSurgeries: getVal('edit-assess-surgeries')
        },
        referral: {
            source: getVal('edit-assess-referral-source'),
            date: getVal('edit-assess-referral-date'),
            reason: getVal('edit-assess-referral-reason')
        },
        medicalSurgicalHistory: {
            previousHospitalization: getVal('edit-assess-prev-hospitalization'),
            previousPhysiotherapy: getVal('edit-assess-prev-physio'),
            surgicalHistory: getVal('edit-assess-surgical-history')
        },
        physicalAssessment: {
            rom: getVal('edit-assess-rom'),
            flexibility: getVal('edit-assess-flexibility'),
            balance: getVal('edit-assess-balance'),
            coordination: getVal('edit-assess-coordination')
        },
        measurements: {
            height: getVal('edit-assess-height'),
            weight: getVal('edit-assess-weight'),
            bmi: getVal('edit-assess-bmi')
        },
        functionalStatus: {
            mobilityStatus: getVal('edit-assess-mobility'),
            assistiveDevice: getVal('edit-assess-assistive')
        },
        disability: {
            hasDisability: getVal('edit-assess-has-disability'),
            type: getVal('edit-assess-disability-type'),
            severity: getVal('edit-assess-disability-severity'),
            symptoms: getVal('edit-assess-disability-symptoms')
        },
        specialTests: {
            details: getVal('edit-assess-special-tests')
        },
        painAssessment: {
            location: getVal('edit-assess-pain-location'),
            score: getPain()
        },
        qualityOfLife: {
            occupation: getVal('edit-assess-occupation'),
            workImpact: getVal('edit-assess-work-impact')
        },
        medications: {
            current: getVal('edit-assess-medications')
        },
        followUp: {
            exercises: getVal('edit-assess-followup-exercises'),
            nutrition: getVal('edit-assess-followup-nutrition'),
            precautions: getVal('edit-assess-followup-precautions'),
            homeProgram: getVal('edit-assess-followup-home')
        },
        healthEducation: getCheckboxValues('edit-assess-health-education')
    };

    patient.assessment = assessment;
}

/* ==========================================================
                        EVENT LISTENERS FOR EDITING
========================================================== */

document.addEventListener('click', function(e) {
    // زر تعديل
    const editBtn = e.target.closest('.edit-toggle-btn');
    if (editBtn) {
        e.preventDefault();
        const section = editBtn.dataset.section;
        if (section) toggleEdit(section);
        return;
    }
    
    // زر حفظ
    const saveBtn = e.target.closest('.save-section-btn');
    if (saveBtn) {
        e.preventDefault();
        const section = saveBtn.dataset.section;
        if (section) saveSection(section);
        return;
    }
    
    // زر إلغاء
    const cancelBtn = e.target.closest('.cancel-section-btn');
    if (cancelBtn) {
        e.preventDefault();
        const section = cancelBtn.dataset.section;
        if (section) cancelEdit(section);
        return;
    }
});

// زر تعديل الرأس (في Topbar)
editHeaderBtn?.addEventListener('click', function() {
    toggleEdit('header');
});

// تحديث قيمة الألم في وضع التعديل
const painSliderEdit = document.getElementById('edit-assess-pain-score');
const painDisplayEdit = document.getElementById('edit-assess-pain-score-value');
if (painSliderEdit && painDisplayEdit) {
    painSliderEdit.addEventListener('input', function() {
        painDisplayEdit.textContent = this.value;
    });
}

/* ==========================================================
                        SESSION MODAL
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

addSessionForm?.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!validateSessionForm()) return;

    const newSession = {
        id: (patient.sessions?.length || 0) + 1,
        number: (patient.sessions?.length || 0) + 1,
        date: sessionDateInput.value.trim(),
        doctor: doctor ? doctor.fullName : "د. غير محدد",
        status: sessionStatusInput.value,
        notes: sessionNotesInput.value.trim() || "-"
    };

    if (!patient.sessions) patient.sessions = [];
    patient.sessions.push(newSession);

    const completed = patient.sessions.filter(s => s.status === "مكتملة").length;
    patient.completedSessions = completed;
    patient.totalSessions = patient.sessions.length;
    patient.remainingSessions = Math.max(0, (patient.totalSessions || 0) - completed);

    renderSessionsHistory();
    renderPatientSummary();
    addSessionForm.reset();
    clearSessionErrors();
    closeModal(sessionModal);
    showToast("تمت إضافة الجلسة بنجاح", "success", "bi-calendar-check");
});

/* ==========================================================
                        EXERCISES - ADD / CANCEL
========================================================== */

addExerciseBtn?.addEventListener("click", () => {
    exerciseForm.style.display = "flex";
    addExerciseBtn.style.display = "none";
});

cancelExerciseBtn?.addEventListener("click", () => {
    exerciseForm.style.display = "none";
    addExerciseBtn.style.display = "inline-flex";
    exerciseForm.reset();
});

saveExerciseBtn?.addEventListener("click", () => {
    const name = exerciseName.value.trim();
    if (!name) {
        showToast("يرجى إدخال اسم التمرين", "warning", "bi-exclamation-triangle");
        return;
    }
    const newExercise = {
        id: (patient.exercises?.length || 0) + 1,
        name: name,
        sets: parseInt(exerciseSets.value) || 0,
        reps: parseInt(exerciseReps.value) || 0,
        duration: exerciseDuration.value.trim() || "",
        description: "",
        icon: "bi-activity"
    };
    if (!patient.exercises) patient.exercises = [];
    patient.exercises.push(newExercise);
    renderExercises();
    exerciseForm.style.display = "none";
    addExerciseBtn.style.display = "inline-flex";
    exerciseForm.reset();
    showToast("تم إضافة التمرين", "success", "bi-plus-circle");
});

/* ==========================================================
                        DEVICES - ADD / CANCEL
========================================================== */

addDeviceBtn?.addEventListener("click", () => {
    deviceForm.style.display = "flex";
    addDeviceBtn.style.display = "none";
});

cancelDeviceBtn?.addEventListener("click", () => {
    deviceForm.style.display = "none";
    addDeviceBtn.style.display = "inline-flex";
    deviceForm.reset();
});

saveDeviceBtn?.addEventListener("click", () => {
    const name = deviceName.value.trim();
    if (!name) {
        showToast("يرجى إدخال اسم الجهاز", "warning", "bi-exclamation-triangle");
        return;
    }
    const newDevice = {
        id: (patient.devices?.length || 0) + 1,
        name: name,
        description: deviceDesc.value.trim() || "",
        sessions: deviceSessions.value.trim() || "",
        icon: "bi-device-hdd"
    };
    if (!patient.devices) patient.devices = [];
    patient.devices.push(newDevice);
    renderDevices();
    deviceForm.style.display = "none";
    addDeviceBtn.style.display = "inline-flex";
    deviceForm.reset();
    showToast("تم إضافة الجهاز", "success", "bi-plus-circle");
});

/* ==========================================================
                        ATTACHMENTS - UPLOAD
========================================================== */

attachFileBtn?.addEventListener("click", () => attachmentInput?.click());
attachmentInput?.addEventListener("change", function() {
    const files = Array.from(this.files || []);
    if (files.length === 0) return;
    if (!patient.attachments) patient.attachments = [];
    files.forEach(file => {
        const ext = file.name.split(".").pop().toUpperCase();
        patient.attachments.push({
            id: patient.attachments.length + 1,
            name: file.name,
            type: ext,
            size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
            uploadDate: getTodayDate(),
            icon: getFileIcon(ext)
        });
    });
    renderAttachments();
    this.value = "";
    showToast(`تم إرفاق ${files.length} ملف`, "success", "bi-paperclip");
});

/* ==========================================================
                        NOTES - SAVE
========================================================== */

saveNoteBtn?.addEventListener("click", function () {
    const text = currentSessionNote.value.trim();
    if (text === "") {
        showToast("اكتب الملاحظة أولاً", "warning", "bi-exclamation-circle");
        return;
    }

    if (!patient.notes) patient.notes = [];

    patient.notes.unshift({
        id: patient.notes.length + 1,
        date: getTodayDate(),
        doctor: doctor ? doctor.fullName : "طبيب",
        text: text
    });

    patient.currentSessionNote = "";
    currentSessionNote.value = "";
    renderNotes();
    showToast("تم حفظ الملاحظة", "success", "bi-floppy");
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
        text: `ملف المريض ${patient.fullName} على نظام مركز الطارق`,
        url: window.location.href
    };

    if (navigator.share) {
        try {
            await navigator.share(shareData);
            showToast("تمت مشاركة الملف بنجاح", "success", "bi-share");
        } catch (error) {}
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
                        BACK BUTTON
========================================================== */

if (backBtn) {
    backBtn.addEventListener("click", function () {
        if (fromPage === "edit") {
            window.location.href = "secretary.html";
        } else {
            window.history.back();
        }
    });
}

/* ==========================================================
                        INIT
========================================================== */

function init() {
    renderAll();
    console.log(`✅ Patient Profile loaded for: ${patient.fullName} (ID: ${patient.id})`);
}

init();