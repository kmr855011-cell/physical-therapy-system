console.log("Patient Edit Page Loaded");

/* ==========================================================
                        SELECTORS
========================================================== */

const editForm = document.querySelector("#edit-patient-form");

const nameInput = document.querySelector("#edit-name");
const ageInput = document.querySelector("#edit-age");
const phoneInput = document.querySelector("#edit-phone");
const doctorInput = document.querySelector("#edit-doctor");

const diagnosisInput = document.querySelector("#edit-diagnosis");
const complaintInput = document.querySelector("#edit-complaint");
const severityInput = document.querySelector("#edit-severity");
const statusInput = document.querySelector("#edit-status");

const nameError = document.querySelector("#edit-name-error");
const phoneError = document.querySelector("#edit-phone-error");

const toastContainer = document.querySelector("#toast-container");

const contextName = document.querySelector("#edit-context-name");
const contextStatus = document.querySelector("#edit-context-status");


/* ==========================================================
                        MOCK DATA
        (نفس بيانات المريض الحالية المعروضة في patient.html)
========================================================== */

const currentPatient = {

    name: "محمد أحمد",
    age: 32,
    phone: "01012345678",
    doctor: "د. أحمد",

    diagnosis: "خشونة الركبة",
    complaint: "ألم أثناء المشي",
    severity: "متوسطة",
    status: "نشط"

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
                    STATUS HELPER
========================================================== */

function getStatusClass(status) {

    switch (status) {

        case "نشط":
            return "active";

        case "معلق":
            return "pending";

        case "منتهي":
            return "inactive";

        default:
            return "";

    }

}


/* ==========================================================
                    FILL FORM WITH CURRENT DATA
========================================================== */

function updateContextHeader(patient) {

    if (contextName) contextName.textContent = patient.name;

    if (contextStatus) {

        contextStatus.textContent = patient.status;
        contextStatus.className = `status ${getStatusClass(patient.status)}`;

    }

}

function fillForm(patient) {

    nameInput.value = patient.name;
    ageInput.value = patient.age;
    phoneInput.value = patient.phone;
    doctorInput.value = patient.doctor;

    diagnosisInput.value = patient.diagnosis;
    complaintInput.value = patient.complaint;
    severityInput.value = patient.severity;
    statusInput.value = patient.status;

    updateContextHeader(patient);

}


/* ==========================================================
                        VALIDATION
========================================================== */

function clearFormErrors() {

    nameError.textContent = "";
    phoneError.textContent = "";

}

function validateForm() {

    clearFormErrors();

    let valid = true;

    if (nameInput.value.trim() === "") {

        nameError.textContent = "يرجى إدخال اسم المريض";
        valid = false;

    }

    const phone = phoneInput.value.trim();

    if (phone === "" || !/^01[0125][0-9]{8}$/.test(phone)) {

        phoneError.textContent = "رقم الهاتف غير صحيح";
        valid = false;

    }

    return valid;

}


/* ==========================================================
                        SUBMIT
========================================================== */

editForm?.addEventListener("submit", function (event) {

    event.preventDefault();

    if (!validateForm()) return;

    const updatedPatient = {

        name: nameInput.value.trim(),
        age: ageInput.value.trim(),
        phone: phoneInput.value.trim(),
        doctor: doctorInput.value.trim(),

        diagnosis: diagnosisInput.value.trim(),
        complaint: complaintInput.value.trim(),
        severity: severityInput.value,
        status: statusInput.value

    };

    // مؤقتًا: حفظ وهمي إلى أن يتوفر Backend

    console.log("Updated Patient:", updatedPatient);

    updateContextHeader(updatedPatient);

    showToast(`تم حفظ تعديلات ملف ${updatedPatient.name} بنجاح`, "success", "bi-patch-check");

    setTimeout(() => {

        window.location.href = "patient.html";

    }, 1400);

});


/* ==========================================================
                        INIT
========================================================== */

function init() {

    fillForm(currentPatient);

}

init();