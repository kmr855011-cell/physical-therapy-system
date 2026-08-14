import database from "../data/mockDatabase.js";

const selectors = {
    backButton: document.getElementById("back-button"),
    cancelButton: document.getElementById("cancel-button"),
    bottomCancelButton: document.getElementById("bottom-cancel-button"),
    saveHeaderButton: document.getElementById("save-session-button"),
    form: document.getElementById("session-form"),
    patientError: document.getElementById("patient-error"),
    patientName: document.getElementById("patient-name"),
    patientFileNumber: document.getElementById("patient-file-number"),
    patientId: document.getElementById("patient-id"),
    doctorName: document.getElementById("doctor-name"),
    patientDiagnosis: document.getElementById("patient-diagnosis"),
    sessionDate: document.getElementById("session-date"),
    startTime: document.getElementById("start-time"),
    endTime: document.getElementById("end-time"),
    durationBox: document.getElementById("duration-box"),
    equipmentName: document.getElementById("equipment-name"),
    equipmentList: document.getElementById("equipment-list"),
    addEquipmentButton: document.getElementById("add-equipment-button"),
    exerciseName: document.getElementById("exercise-name"),
    exerciseSets: document.getElementById("exercise-sets"),
    exerciseRepetitions: document.getElementById("exercise-repetitions"),
    exerciseDuration: document.getElementById("exercise-duration"),
    exerciseNotes: document.getElementById("exercise-notes"),
    exerciseList: document.getElementById("exercise-list"),
    addExerciseButton: document.getElementById("add-exercise-button"),
    doctorNotes: document.getElementById("doctor-notes"),
    toastContainer: document.getElementById("toast-container")
};

const fieldErrors = {
    sessionDate: document.getElementById("session-date-error"),
    startTime: document.getElementById("start-time-error"),
    endTime: document.getElementById("end-time-error"),
    equipment: document.getElementById("equipment-error"),
    exercise: document.getElementById("exercise-error")
};

const state = {
    patient: null,
    doctor: null,
    equipment: [],
    exercises: [],
    editingExerciseIndex: null,
    isSaving: false
};

function getPatientId() {
    const urlParams = new URLSearchParams(window.location.search);
    const idFromPatientId = urlParams.get("patientId");
    const idFromExistingPatientRoute = urlParams.get("id");
    const idFromStorage = localStorage.getItem("currentPatientId");
    const rawId = idFromPatientId || idFromExistingPatientRoute || idFromStorage;

    if (!rawId) return null;

    const numericId = Number(rawId);
    return Number.isNaN(numericId) ? rawId : numericId;
}

function getTodayDateValue() {
    return new Date().toISOString().slice(0, 10);
}

function findPatient(patientId) {
    return database.patients.find((patient) => String(patient.id) === String(patientId));
}

function findDoctor(doctorId) {
    return database.doctors.find((doctor) => String(doctor.id) === String(doctorId));
}

function loadPatient() {
    const patientId = getPatientId();

    if (!patientId) {
        showPatientError("تعذر تحميل بيانات المريض. لم يتم تحديد رقم المريض.");
        return;
    }

    const patient = findPatient(patientId);

    if (!patient) {
        showPatientError("تعذر تحميل بيانات المريض. تأكد من فتح الجلسة من ملف مريض صحيح.");
        return;
    }

    state.patient = patient;
    state.doctor = findDoctor(patient.doctorId);
    localStorage.setItem("currentPatientId", String(patient.id));
    renderPatientSummary();
}

function renderPatientSummary() {
    const diagnosis = state.patient.diagnosis?.diagnosis || "-";

    selectors.patientName.textContent = state.patient.fullName || "-";
    selectors.patientFileNumber.textContent = state.patient.fileNumber || "-";
    selectors.patientId.textContent = state.patient.id || "-";
    selectors.doctorName.textContent = state.doctor?.fullName || "-";
    selectors.patientDiagnosis.textContent = diagnosis;
    selectors.patientError.hidden = true;
}

function showPatientError(message) {
    selectors.patientError.textContent = message;
    selectors.patientError.hidden = false;
    selectors.patientName.textContent = "غير متاح";
    selectors.patientFileNumber.textContent = "-";
    selectors.patientId.textContent = "-";
    selectors.doctorName.textContent = "-";
    selectors.patientDiagnosis.textContent = "-";
    setSaveButtonsDisabled(true);
}

function initializeSessionForm() {
    selectors.sessionDate.value = getTodayDateValue();
    updateDuration();
}

function addEquipment() {
    clearFieldError("equipment");
    const name = selectors.equipmentName.value.trim();

    if (!name) {
        setFieldError("equipment", "اكتب اسم الجهاز قبل الإضافة.");
        return;
    }

    const alreadyExists = state.equipment.some((item) => item.name.toLowerCase() === name.toLowerCase());

    if (alreadyExists) {
        setFieldError("equipment", "هذا الجهاز مضاف بالفعل.");
        return;
    }

    state.equipment.push({ name });
    selectors.equipmentName.value = "";
    renderEquipment();
}

function removeEquipment(index) {
    state.equipment.splice(index, 1);
    renderEquipment();
}

function renderEquipment() {
    selectors.equipmentList.innerHTML = "";

    state.equipment.forEach((item, index) => {
        const chip = document.createElement("div");
        chip.className = "equipment-chip";
        chip.innerHTML = `
            <span>${escapeHtml(item.name)}</span>
            <button class="remove-chip-btn" type="button" aria-label="حذف ${escapeHtml(item.name)}" data-index="${index}">
                <i class="bi bi-x-lg"></i>
            </button>
        `;
        selectors.equipmentList.appendChild(chip);
    });
}

function getExerciseDraft() {
    return {
        name: selectors.exerciseName.value.trim(),
        sets: parseOptionalPositiveNumber(selectors.exerciseSets.value),
        repetitions: parseOptionalPositiveNumber(selectors.exerciseRepetitions.value),
        duration: parseOptionalPositiveNumber(selectors.exerciseDuration.value),
        notes: selectors.exerciseNotes.value.trim()
    };
}

function addExercise() {
    clearFieldError("exercise");
    const exercise = getExerciseDraft();

    if (!exercise.name) {
        setFieldError("exercise", "اكتب اسم التمرين قبل الإضافة.");
        return;
    }

    if (state.editingExerciseIndex === null) {
        state.exercises.push(exercise);
        showToast("تمت إضافة التمرين.", "success", "bi-check-circle");
    } else {
        state.exercises[state.editingExerciseIndex] = exercise;
        state.editingExerciseIndex = null;
        selectors.addExerciseButton.innerHTML = '<i class="bi bi-plus-lg"></i> إضافة تمرين';
        showToast("تم تعديل التمرين.", "success", "bi-pencil-square");
    }

    resetExerciseInputs();
    renderExercises();
}

function editExercise(index) {
    const exercise = state.exercises[index];
    state.editingExerciseIndex = index;

    selectors.exerciseName.value = exercise.name;
    selectors.exerciseSets.value = exercise.sets || "";
    selectors.exerciseRepetitions.value = exercise.repetitions || "";
    selectors.exerciseDuration.value = exercise.duration || "";
    selectors.exerciseNotes.value = exercise.notes || "";
    selectors.addExerciseButton.innerHTML = '<i class="bi bi-check-lg"></i> حفظ التعديل';
    selectors.exerciseName.focus();
}

function removeExercise(index) {
    state.exercises.splice(index, 1);

    if (state.editingExerciseIndex === index) {
        state.editingExerciseIndex = null;
        resetExerciseInputs();
    }

    renderExercises();
}

function renderExercises() {
    selectors.exerciseList.innerHTML = "";

    state.exercises.forEach((exercise, index) => {
        const card = document.createElement("article");
        card.className = "exercise-card";
        card.innerHTML = `
            <div>
                <h4>${escapeHtml(exercise.name)}</h4>
                <div class="exercise-meta">
                    ${exercise.sets ? `<span>المجموعات: ${exercise.sets}</span>` : ""}
                    ${exercise.repetitions ? `<span>التكرارات: ${exercise.repetitions}</span>` : ""}
                    ${exercise.duration ? `<span>المدة: ${exercise.duration} دقيقة</span>` : ""}
                </div>
                ${exercise.notes ? `<p>${escapeHtml(exercise.notes)}</p>` : ""}
            </div>
            <div class="exercise-actions">
                <button class="edit-exercise-btn" type="button" aria-label="تعديل ${escapeHtml(exercise.name)}" data-index="${index}">
                    <i class="bi bi-pencil"></i>
                </button>
                <button class="remove-exercise-btn" type="button" aria-label="حذف ${escapeHtml(exercise.name)}" data-index="${index}">
                    <i class="bi bi-trash"></i>
                </button>
            </div>
        `;
        selectors.exerciseList.appendChild(card);
    });
}

function resetExerciseInputs() {
    selectors.exerciseName.value = "";
    selectors.exerciseSets.value = "";
    selectors.exerciseRepetitions.value = "";
    selectors.exerciseDuration.value = "";
    selectors.exerciseNotes.value = "";
}

function parseOptionalPositiveNumber(value) {
    if (!value) return null;

    const numberValue = Number(value);
    return Number.isFinite(numberValue) && numberValue > 0 ? numberValue : null;
}

function updateDuration() {
    const start = selectors.startTime.value;
    const end = selectors.endTime.value;

    if (!start || !end) {
        selectors.durationBox.innerHTML = '<i class="bi bi-hourglass-split"></i><span>مدة الجلسة: اختر وقت البدء والانتهاء</span>';
        return;
    }

    const duration = calculateDurationInMinutes(start, end);

    if (duration < 0) {
        selectors.durationBox.innerHTML = '<i class="bi bi-exclamation-triangle"></i><span>وقت الانتهاء لا يمكن أن يكون قبل وقت البدء</span>';
        return;
    }

    selectors.durationBox.innerHTML = `<i class="bi bi-hourglass-split"></i><span>مدة الجلسة: ${duration} دقيقة</span>`;
}

function calculateDurationInMinutes(startTime, endTime) {
    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);
    const startTotal = startHour * 60 + startMinute;
    const endTotal = endHour * 60 + endMinute;

    return endTotal - startTotal;
}

function validateSession() {
    clearAllFieldErrors();
    const errors = [];

    if (!state.patient) {
        errors.push("يجب فتح الجلسة لمريض صحيح.");
    }

    if (!selectors.sessionDate.value) {
        setFieldError("sessionDate", "تاريخ الجلسة مطلوب.");
        errors.push("تاريخ الجلسة مطلوب.");
    }

    if (!selectors.startTime.value) {
        setFieldError("startTime", "وقت البدء مطلوب.");
        errors.push("وقت البدء مطلوب.");
    }

    if (!selectors.endTime.value) {
        setFieldError("endTime", "وقت الانتهاء مطلوب.");
        errors.push("وقت الانتهاء مطلوب.");
    }

    if (selectors.startTime.value && selectors.endTime.value && calculateDurationInMinutes(selectors.startTime.value, selectors.endTime.value) < 0) {
        setFieldError("endTime", "وقت الانتهاء لا يمكن أن يكون قبل وقت البدء.");
        errors.push("وقت الانتهاء لا يمكن أن يكون قبل وقت البدء.");
    }

    const exerciseDraft = getExerciseDraft();
    const hasPartialExercise = exerciseDraft.name || exerciseDraft.sets || exerciseDraft.repetitions || exerciseDraft.duration || exerciseDraft.notes;

    if (hasPartialExercise) {
        if (!exerciseDraft.name) {
            setFieldError("exercise", "يوجد تمرين غير مكتمل. اكتب اسم التمرين أو امسح الحقول.");
        } else {
            setFieldError("exercise", "اضغط إضافة تمرين قبل حفظ الجلسة أو امسح حقول التمرين.");
        }
        errors.push("يوجد تمرين غير مكتمل.");
    }

    return errors;
}

function collectSessionData() {
    return {
        patientId: String(state.patient.id),
        doctorId: state.doctor ? String(state.doctor.id) : "",
        sessionDate: selectors.sessionDate.value,
        startTime: selectors.startTime.value,
        endTime: selectors.endTime.value,
        equipment: state.equipment.map((item) => ({
            name: item.name
        })),
        exercises: state.exercises.map((exercise) => ({
            name: exercise.name,
            sets: exercise.sets,
            repetitions: exercise.repetitions,
            duration: exercise.duration,
            notes: exercise.notes
        })),
        notes: selectors.doctorNotes.value.trim()
    };
}

async function persistSession(sessionData) {
    console.log("Session payload:", sessionData);
    // API integration will be added here later when the backend session endpoint exists.
    return sessionData;
}

async function saveSession(event) {
    if (event) event.preventDefault();

    if (state.isSaving) return;

    const errors = validateSession();

    if (errors.length > 0) {
        showToast(errors[0], "error", "bi-exclamation-triangle");
        return;
    }

    state.isSaving = true;
    setSaveButtonsDisabled(true);

    try {
        const sessionData = collectSessionData();
        await persistSession(sessionData);
        showToast("تم تجهيز بيانات الجلسة بنجاح. سيتم ربط الحفظ بالـ API لاحقاً.", "success", "bi-check-circle");
    } catch (error) {
        console.error("Unable to prepare session:", error);
        showToast("حدث خطأ أثناء تجهيز بيانات الجلسة.", "error", "bi-exclamation-triangle");
    } finally {
        state.isSaving = false;
        setSaveButtonsDisabled(!state.patient);
    }
}

function setSaveButtonsDisabled(disabled) {
    selectors.saveHeaderButton.disabled = disabled;
    document.getElementById("bottom-save-session-button").disabled = disabled;
}

function setFieldError(field, message) {
    if (fieldErrors[field]) {
        fieldErrors[field].textContent = message;
    }
}

function clearFieldError(field) {
    if (fieldErrors[field]) {
        fieldErrors[field].textContent = "";
    }
}

function clearAllFieldErrors() {
    Object.keys(fieldErrors).forEach(clearFieldError);
}

function showToast(message, type = "info", icon = "bi-info-circle") {
    const toast = document.createElement("div");
    toast.className = `session-toast session-toast-${type}`;
    toast.innerHTML = `<i class="bi ${icon}"></i><span>${escapeHtml(message)}</span>`;
    selectors.toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3500);
}

function navigateBackToPatient() {
    if (state.patient) {
        window.location.href = `patient.html?id=${state.patient.id}`;
        return;
    }

    window.location.href = "doctor.html";
}

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function bindEvents() {
    selectors.backButton.addEventListener("click", navigateBackToPatient);
    selectors.cancelButton.addEventListener("click", navigateBackToPatient);
    selectors.bottomCancelButton.addEventListener("click", navigateBackToPatient);
    selectors.saveHeaderButton.addEventListener("click", saveSession);
    selectors.form.addEventListener("submit", saveSession);
    selectors.addEquipmentButton.addEventListener("click", addEquipment);
    selectors.equipmentName.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            addEquipment();
        }
    });
    selectors.equipmentList.addEventListener("click", (event) => {
        const button = event.target.closest(".remove-chip-btn");
        if (!button) return;
        removeEquipment(Number(button.dataset.index));
    });
    selectors.addExerciseButton.addEventListener("click", addExercise);
    selectors.exerciseList.addEventListener("click", (event) => {
        const editButton = event.target.closest(".edit-exercise-btn");
        const removeButton = event.target.closest(".remove-exercise-btn");

        if (editButton) {
            editExercise(Number(editButton.dataset.index));
            return;
        }

        if (removeButton) {
            removeExercise(Number(removeButton.dataset.index));
        }
    });
    selectors.startTime.addEventListener("input", updateDuration);
    selectors.endTime.addEventListener("input", updateDuration);
}

function init() {
    initializeSessionForm();
    bindEvents();
    loadPatient();
}

init();
