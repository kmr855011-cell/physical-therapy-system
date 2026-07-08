console.log("Doctor Dashboard Connected");

// =========================
// Selectors
// =========================

const addPatientBtn = document.querySelector(".add-patient-btn");
const modalOverlay = document.querySelector(".modal-overlay");
const closeModalBtn = document.querySelector(".close-modal-btn");

const addPatientForm = document.querySelector(".add-patient-form");

const patientNameInput = document.querySelector("#patient-name");

const patientPhoneInput = document.querySelector("#patient-phone");

const patientNameError = document.querySelector("#patient-name-error");

const patientPhoneError = document.querySelector("#patient-phone-error");

// =========================
// Functions
// =========================

function openModal(modal) {

    modal.classList.add("active");

}

function closeModal(modal) {

    modal.classList.remove("active");

}


function clearErrors() {

    patientNameError.textContent = "";

    patientPhoneError.textContent = "";

}

function showError(input, message) {

    if (input === patientNameInput) {

        patientNameError.textContent = message;

    }

    if (input === patientPhoneInput) {

        patientPhoneError.textContent = message;

    }

}
function validatePatientForm() {

    clearErrors();

    const patientName = patientNameInput.value.trim();

    const patientPhone = patientPhoneInput.value.trim();

    let isValid = true;

    if (patientName === "") {

        showError(patientNameInput, "يرجى إدخال اسم المريض");

        isValid = false;

    }

    if (patientPhone === "") {

        showError(patientPhoneInput, "يرجى إدخال رقم الهاتف");

        isValid = false;

    }

    return isValid;

}

// =========================
// Event Listeners
// =========================

addPatientBtn.addEventListener("click", function () {

    openModal(modalOverlay);

});

closeModalBtn.addEventListener("click", function () {

    closeModal(modalOverlay);

});

modalOverlay.addEventListener("click", function (event) {

    if (event.target === modalOverlay) {

        closeModal(modalOverlay);

    }

});

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        closeModal(modalOverlay);

    }

});

addPatientForm.addEventListener("submit", function (event) {
console.log("Submit Fired");
    event.preventDefault();

    const isValid = validatePatientForm();

    if (!isValid) {

        return;

    }

    console.log("Patient Created Successfully");

});