

console.log("Doctor Dashboard Loaded");

/* =========================
   SELECTORS
========================= */


const patientsGrid = document.querySelector("#patients-grid");

const patientSearch = document.querySelector("#patient-search");

const patientsCount = document.querySelector("#patients-count");

const profileBtn = document.querySelector(".profile-btn");

const profileDropdown = document.querySelector(".profile-dropdown");

const notificationBtn = document.querySelector(".notification-btn");

const notificationDropdown = document.querySelector(".notification-dropdown");



const patients = [

    {
        id: 1,
        name: "محمد أحمد",
        age: 32,
        diagnosis: "خشونة الركبة",
        phone: "01012345678",
        sessions: 6,
        totalSessions: 12,
        status: "نشط"
    },

    {
        id: 2,
        name: "أحمد علي",
        age: 28,
        diagnosis: "قطع رباط صليبي",
        phone: "01123456789",
        sessions: 4,
        totalSessions: 10,
        status: "معلق"
    },

    {
        id: 3,
        name: "يوسف سمير",
        age: 41,
        diagnosis: "انزلاق غضروفي",
        phone: "01234567890",
        sessions: 10,
        totalSessions: 10,
        status: "منتهي"
    }

];




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



/* =========================================================
   PATIENTS TABLE
========================================================= */

function renderPatientsTable(data = patients) {

    let html = "";

    data.forEach(patient => {

        html += `

        <tr>

            <td>${patient.name}</td>

            <td>${patient.diagnosis}</td>

            <td>${patient.phone}</td>

            <td>

                <span class="status ${getStatusClass(patient.status)}">

                     ${patient.status}

                </span>

            </td>

            <td>

                <button
                    class="primary-btn open-patient-btn"
                    data-id="${patient.id}">
                    <i class="bi bi-folder2-open"></i>
                    فتح الملف

                </button>

            </td>

        </tr>

        `;

    });

    updatePatientsCount(data.length);

    document.querySelector("#patients-table-body").innerHTML = html;

}





/* =========================================================
   PATIENTS COUNT
========================================================= */

function updatePatientsCount(count) {

    if (!patientsCount) return;

    patientsCount.textContent = `إجمالي المرضى : ${count}`;

}

/* =========================================================
   OPEN PATIENT
========================================================= */

document.addEventListener("click", function (event) {

    const button = event.target.closest(".open-patient-btn");

    if (!button) return;

    const id = button.dataset.id;

    console.log("Open Patient:", id);

    // window.location.href = `patient.html?id=${id}`;

});



/* =========================================================
   EMPTY STATE
========================================================= */

function renderEmptyState() {

    document.querySelector("#patients-table-body").innerHTML = `

    <tr>

        <td colspan="5">
            <div class="empty-state">

               <i class="bi bi-search"></i>

               <h3>لا يوجد مرضى</h3>

               <p>لم يتم العثور على نتائج.</p>

            </div>
        </td>
   
    </tr>

`;

    updatePatientsCount(0);

}


/* =========================================================
   SEARCH
========================================================= */

function searchPatients() {

    const value = patientSearch.value.trim().toLowerCase();

    if (value === "") {

        renderPatientsTable();
        return;

    }

    const filteredPatients = patients.filter(patient => {

        return (

            patient.name.toLowerCase().includes(value) ||

            patient.phone.includes(value) ||

            patient.diagnosis.toLowerCase().includes(value)

        );

    });

    if (filteredPatients.length === 0) {

        renderEmptyState();

        return;

    }

    renderPatientsTable(filteredPatients);
}

patientSearch.addEventListener("input", searchPatients);


/* =========================================================
   PROFILE DROPDOWN
========================================================= */

function toggleProfileDropdown() {

    profileDropdown.classList.toggle("active");

    notificationDropdown.classList.remove("active");

}

profileBtn.addEventListener("click", function (event) {

    event.stopPropagation();

    toggleProfileDropdown();

});




/* =========================================================
   NOTIFICATIONS
========================================================= */

function toggleNotifications() {

    notificationDropdown.classList.toggle("active");

    profileDropdown.classList.remove("active");

}

notificationBtn.addEventListener("click", function (event) {

    event.stopPropagation();

    toggleNotifications();

});


/* =========================================================
   CLOSE DROPDOWNS
========================================================= */

document.addEventListener("click", function () {

    profileDropdown.classList.remove("active");

    notificationDropdown.classList.remove("active");

});



/* =========================================================
   INIT
========================================================= */

function init() {

    renderPatientsTable();

}

init();







