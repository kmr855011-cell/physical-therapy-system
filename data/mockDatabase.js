const database = {
    doctors: [
        {
            id: 1,
            fullName: "د. أحمد ",
            specialization: "عظام",
            phone: "01011111111",
            email: "ahmed@clinic.com",
            status: "active"
        }
    ],

    secretaries: [
        {
            id: 1,
            fullName: "سارة علي"
        }
    ],

    patients: [
        {
            id: 1,

            // =============================
            // Basic Info
            // =============================

            status: "active",
            image: "",
            fileNumber: "PT-1001",
            fullName: "محمد أحمد محمد",
            gender: "ذكر",
            age: 32,
            dateOfBirth: "15 / 03 / 1994",
            nationalId: "29403150102345",
            phone: "01012345678",
            nationality: "مصري",
            maritalStatus: "متزوج",
            phone: "01012345678",
            emergencyPhone: "01198765432",
            responsiblePerson: "أحمد محمد (الأخ)",
            address: "15 شارع النصر، الزقازيق، الشرقية",
            doctorId: 1,
            startDate: "03 / 07 / 2026",
            lastVisit: "29 / 07 / 2026",
            createdAt: "03 / 07 / 2026",

            // =============================
            // Dashboard
            // =============================

            totalSessions: 20,
            completedSessions: 8,
            remainingSessions: 12,
            nextAppointment: "05 / 08 / 2026",

            // =============================
            // Diagnosis
            // =============================

            diagnosis: {
                diagnosis: "خشونة الركبة",
                complaint: "ألم أثناء المشي",
                injuryDate: "03 / 07 / 2026",
                painLevel: "متوسطة",
                doctorNotes:
                    "يحتاج إلى متابعة أسبوعية مع تقليل الأحمال والالتزام بالتمارين المنزلية."
            },

            // =============================
            // Treatment
            // =============================

            treatmentPlan: {

                treatmentType: "علاج طبيعي",

                sessions: 20,

                sessionDuration: "45 دقيقة",

                weeklySessions: 3,

                goals: [

                    "تقليل الألم",

                    "زيادة مدى الحركة",

                    "تقوية العضلات",

                    "تحسين الاتزان",

                    "العودة للحياة الطبيعية"

                ]

            },


            // =============================
            // Sessions
            // =============================
            sessions: [

                {
                    id: 1,
                    number: 1,
                    date: "03 / 07 / 2026",
                    doctor: "د. أحمد محمد",
                    status: "مكتملة",
                    notes: "تحسن في مدى الحركة"
                },

                {
                    id: 2,
                    number: 2,
                    date: "05 / 07 / 2026",
                    doctor: "د. أحمد محمد",
                    status: "مكتملة",
                    notes: "تقليل الألم"
                },

                {
                    id: 3,
                    number: 3,
                    date: "08 / 07 / 2026",
                    doctor: "د. أحمد محمد",
                    status: "جارية",
                    notes: "استكمال تمارين التقوية"
                },

                {
                    id: 4,
                    number: 4,
                    date: "10 / 07 / 2026",
                    doctor: "د. أحمد محمد",
                    status: "قادمة",
                    notes: "جلسة متابعة"
                }

            ],
            // =============================
            // Exercises
            // =============================
            exercises: [

                {
                    id: 1,
                    name: "Hamstring Stretch",
                    sets: 3,
                    reps: 10,
                    duration: "30 ثانية",
                    description: "إطالة عضلات خلف الفخذ",
                    icon: "bi-person-arms-up"
                },

                {
                    id: 2,
                    name: "Quadriceps Strengthening",
                    sets: 4,
                    reps: 12,
                    duration: "15 دقيقة",
                    description: "تقوية العضلة الرباعية",
                    icon: "bi-activity"
                },

                {
                    id: 3,
                    name: "Heel Slides",
                    sets: 3,
                    reps: 15,
                    duration: "10 دقائق",
                    description: "زيادة مدى حركة الركبة",
                    icon: "bi-arrow-repeat"
                }

            ],
            // =============================
            // Devices
            // =============================

            devices: [

                {
                    id: 1,
                    name: "Ultrasound Therapy",
                    description: "جلسة موجات فوق صوتية",
                    sessions: "كل جلسة",
                    icon: "bi-soundwave"
                },

                {
                    id: 2,
                    name: "TENS",
                    description: "تحفيز كهربائي لتخفيف الألم",
                    sessions: "3 مرات أسبوعياً",
                    icon: "bi-lightning-charge"
                },

                {
                    id: 3,
                    name: "Hot Pack",
                    description: "كمادات حرارية",
                    sessions: "قبل التمارين",
                    icon: "bi-thermometer-half"
                }

            ],
            // =============================
            // Attachments
            // =============================
            attachments: [

                {
                    id: 1,
                    name: "MRI Lumbar.pdf",
                    type: "PDF",
                    size: "2.4 MB",
                    uploadDate: "20 / 07 / 2026",
                    icon: "bi-file-earmark-pdf"
                },

                {
                    id: 2,
                    name: "X-Ray.png",
                    type: "صورة",
                    size: "1.1 MB",
                    uploadDate: "21 / 07 / 2026",
                    icon: "bi-file-earmark-image"
                },

                {
                    id: 3,
                    name: "Medical Report.docx",
                    type: "Word",
                    size: "430 KB",
                    uploadDate: "22 / 07 / 2026",
                    icon: "bi-file-earmark-word"
                }

            ],
            // =============================
            // Notes History
            // =============================

            notes: [

                {
                    id: 1,
                    date: "29 / 07 / 2026",
                    doctor: "د. أحمد محمد",
                    text: "المريض استجاب بشكل جيد لتمارين الإطالة، وتم تقليل شدة الألم."
                },

                {
                    id: 2,
                    date: "25 / 07 / 2026",
                    doctor: "د. كريم علي",
                    text: "تم البدء في برنامج تقوية العضلات مع تحسين مدى الحركة."
                }

            ],



            assessment: {

                medicalHistory: {

                    mainDiagnosis: "Lumbar Disc",

                    medicalDiagnosis: "Lumbar Disc L4-L5",

                    referringDoctor: "د. كريم علي",

                    hospital: "مستشفى الزقازيق العام",

                    conditionStartDate: "03 / 07 / 2026",

                    conditionDescription: "يعاني المريض من ألم أسفل الظهر يمتد إلى الساق اليمنى."

                },

                chronicHistory: {

                    diseases: [

                        "السكر",

                        "الضغط",

                        "آلام الظهر والرقبة"

                    ],

                    allergies: "لا يوجد",

                    previousSurgeries: "استئصال الزائدة الدودية"

                },

                referral: {

                    source: "عيادة العظام",

                    date: "02 / 07 / 2026",

                    reason: "العلاج الطبيعي بعد تشخيص الانزلاق الغضروفي"

                },

                medicalSurgicalHistory: {

                    previousHospitalization: "نعم",

                    previousPhysiotherapy: "لا",

                    surgicalHistory: "استئصال الزائدة الدودية"

                },

                physicalAssessment: {

                    rom: "جيد",

                    flexibility: "ضعيف",

                    balance: "جيد جداً",

                    coordination: "جيد"

                },

                measurements: {

                    height: "175 سم",

                    weight: "82 كجم",

                    bmi: "26.8"

                },

                functionalStatus: {

                    mobilityStatus: "يتحرك بمساعدة",

                    assistiveDevice: "عكاز طبي"

                },


                disability: {

                    hasDisability: "لا",

                    type: "-",

                    severity: "-",

                    symptoms: "لا يوجد"

                },

                specialTests: {

                    details: "McMurray Test: إيجابي بسيط على الجانب الأيمن"

                },

                painAssessment: {

                    location: "الركبة اليمنى",

                    score: 6

                },

                qualityOfLife: {

                    occupation: "مهندس",

                    workImpact: "الجلوس لفترات طويلة يزيد من الألم"

                },

                medications: {

                    current: "Cataflam عند الحاجة"

                },

                followUp: {

                    exercises: "تمارين تقوية العضلة الرباعية",

                    nutrition: "تقليل الوزن تدريجياً",

                    precautions: "تجنب صعود السلالم لفترات طويلة",

                    homeProgram: "تمارين إطالة يومياً لمدة 15 دقيقة"

                },

                healthEducation: [

                    "شرح الحالة للمريض",

                    "إشراكه في الخطة العلاجية",

                    "نصائح التغذية",

                    "التمارين العلاجية",

                    "البرنامج المنزلي"

                ]

            },



        },
        {
            id: 2,

            // =============================
            // Basic Information
            // =============================

            fileNumber: "PT-1002",

            fullName: "فاطمة السيد",

            gender: "أنثى",

            dateOfBirth: "1968-11-08",

            age: 58,

            maritalStatus: "متزوجة",

            occupation: "معلمة",

            nationalId: "26811081234567",

            phone: "01087654321",

            emergencyPhone: "01011112222",

            email: "fatma@test.com",

            address: "الزقازيق - الشرقية",

            nationality: "مصرية",

            responsiblePerson: "محمد حسن (الزوج)",

            doctorId: 1,

            secretaryId: 1,

            status: "active",

            createdAt: "2026-07-10",

            updatedAt: "2026-07-30",

            image: "",

            // =============================
            // Dashboard
            // =============================

            totalSessions: 15,

            completedSessions: 9,

            remainingSessions: 6,

            nextAppointment: "08 / 08 / 2026",

            // =============================
            // Diagnosis
            // =============================

            diagnosis: {

                diagnosis: "خشونة مفصل الركبة",

                complaint: "ألم شديد أثناء صعود السلم",

                injuryDate: "15 / 06 / 2026",

                painLevel: "شديدة",

                doctorNotes:
                    "ضرورة الالتزام ببرنامج إنقاص الوزن مع جلسات العلاج الطبيعي."

            },

            // =============================
            // Treatment
            // =============================

            treatmentPlan: {

                treatmentType: "علاج طبيعي",

                sessions: 15,

                sessionDuration: "60 دقيقة",

                weeklySessions: 3,

                goals: [

                    "تقليل الألم",

                    "زيادة قوة العضلات",

                    "تحسين الاتزان",

                    "زيادة مدى الحركة",

                    "العودة للمشي الطبيعي"

                ]

            },

            // =============================
            // Sessions
            // =============================

            sessions: [

                {
                    id: 1,
                    number: 1,
                    date: "16 / 06 / 2026",
                    doctor: "د. أحمد محمد",
                    status: "مكتملة",
                    notes: "تم تقييم الحالة."
                },

                {
                    id: 2,
                    number: 2,
                    date: "18 / 06 / 2026",
                    doctor: "د. أحمد محمد",
                    status: "مكتملة",
                    notes: "بدأت تمارين تقوية."
                },

                {
                    id: 3,
                    number: 3,
                    date: "21 / 06 / 2026",
                    doctor: "د. أحمد محمد",
                    status: "جارية",
                    notes: "تحسن بسيط."
                }

            ],

            // =============================
            // Exercises
            // =============================

            exercises: [

                {
                    id: 1,
                    name: "Straight Leg Raise",
                    sets: 3,
                    reps: 15,
                    duration: "15 دقيقة",
                    description: "تقوية العضلة الرباعية",
                    icon: "bi-activity"
                },

                {
                    id: 2,
                    name: "Sit To Stand",
                    sets: 3,
                    reps: 10,
                    duration: "10 دقائق",
                    description: "تحسين القوة الوظيفية",
                    icon: "bi-person-standing"
                }

            ],

            // =============================
            // Devices
            // =============================

            devices: [

                {
                    id: 1,
                    name: "Hot Pack",
                    description: "كمادات ساخنة",
                    sessions: "قبل الجلسة",
                    icon: "bi-thermometer-half"
                },

                {
                    id: 2,
                    name: "Ultrasound",
                    description: "موجات فوق صوتية",
                    sessions: "كل جلسة",
                    icon: "bi-soundwave"
                }

            ],

            // =============================
            // Attachments
            // =============================

            attachments: [

                {
                    id: 1,
                    name: "Knee MRI.pdf",
                    type: "PDF",
                    size: "2 MB",
                    uploadDate: "11 / 07 / 2026",
                    icon: "bi-file-earmark-pdf"
                }

            ],

            // =============================
            // Notes
            // =============================

            notes: [

                {
                    id: 1,
                    date: "28 / 07 / 2026",
                    doctor: "د. أحمد محمد",
                    text: "تحسن واضح في المشي وانخفاض الألم."
                }

            ],

            // =============================
            // Assessment
            // =============================

            assessment: {

                medicalHistory: {

                    mainDiagnosis: "Knee Osteoarthritis",

                    medicalDiagnosis: "Grade II OA",

                    referringDoctor: "د. سامح",

                    hospital: "مستشفى الجامعة",

                    conditionStartDate: "15 / 06 / 2026",

                    conditionDescription: "خشونة متوسطة بالركبة اليمنى."

                },

                chronicHistory: {

                    diseases: [

                        "ضغط",

                        "سكر"

                    ],

                    allergies: "لا يوجد",

                    previousSurgeries: "لا يوجد"

                },

                referral: {

                    source: "عيادة العظام",

                    date: "15 / 06 / 2026",

                    reason: "جلسات علاج طبيعي"

                },

                medicalSurgicalHistory: {

                    previousHospitalization: "لا",

                    previousPhysiotherapy: "نعم",

                    surgicalHistory: "لا يوجد"

                },

                physicalAssessment: {

                    rom: "متوسط",

                    flexibility: "ضعيف",

                    balance: "متوسط",

                    coordination: "جيد"

                },

                measurements: {

                    height: "162 سم",

                    weight: "91 كجم",

                    bmi: "34.7"

                },

                functionalStatus: {

                    mobilityStatus: "يمشي بعصا",

                    assistiveDevice: "عصا"

                },

                disability: {

                    hasDisability: "لا",

                    type: "-",

                    severity: "-",

                    symptoms: "-"

                },

                specialTests: {

                    details: "Crepitus + Positive Patellar Grind"

                },

                painAssessment: {

                    location: "الركبة اليمنى",

                    score: 8

                },

                qualityOfLife: {

                    occupation: "معلمة",

                    workImpact: "الوقوف الطويل يزيد الألم"

                },

                medications: {

                    current: "Celebrex"

                },

                followUp: {

                    exercises: "تمارين تقوية",

                    nutrition: "تقليل الوزن",

                    precautions: "تجنب صعود السلالم",

                    homeProgram: "تمارين يومية"

                },

                healthEducation: [

                    "تقليل الوزن",

                    "الالتزام بالتمارين",

                    "استخدام العصا بالطريقة الصحيحة"

                ]

            }

        },
        {
            id: 3,

            // =============================
            // Basic Information
            // =============================

            fileNumber: "PT-1003",

            fullName: "يوسف خالد",

            gender: "ذكر",

            dateOfBirth: "2002-09-18",

            age: 24,

            maritalStatus: "أعزب",

            occupation: "لاعب كرة قدم",

            nationalId: "30209181234567",

            phone: "01055554444",

            emergencyPhone: "01033332222",

            email: "youssef@test.com",

            address: "القاهرة - مدينة نصر",

            nationality: "مصري",

            responsiblePerson: "خالد محمد (الأب)",

            doctorId: 1,

            secretaryId: 1,

            status: "active",

            createdAt: "2026-06-01",

            updatedAt: "2026-07-30",

            image: "",

            // =============================
            // Dashboard
            // =============================

            totalSessions: 30,

            completedSessions: 12,

            remainingSessions: 18,

            nextAppointment: "06 / 08 / 2026",

            // =============================
            // Diagnosis
            // =============================

            diagnosis: {

                diagnosis: "إعادة تأهيل بعد جراحة الرباط الصليبي ACL",

                complaint: "ضعف وثبات الركبة",

                injuryDate: "10 / 05 / 2026",

                painLevel: "خفيفة",

                doctorNotes:
                    "التركيز على استعادة القوة والاتزان قبل العودة للملاعب."

            },

            // =============================
            // Treatment
            // =============================

            treatmentPlan: {

                treatmentType: "إعادة تأهيل رياضي",

                sessions: 30,

                sessionDuration: "75 دقيقة",

                weeklySessions: 4,

                goals: [

                    "استعادة مدى الحركة",

                    "تقوية العضلات",

                    "تحسين الاتزان",

                    "العودة للجري",

                    "العودة لكرة القدم"

                ]

            },

            // =============================
            // Sessions
            // =============================

            sessions: [

                {
                    id: 1,
                    number: 1,
                    date: "12 / 06 / 2026",
                    doctor: "د. أحمد محمد",
                    status: "مكتملة",
                    notes: "تقييم أولي بعد العملية"
                },

                {
                    id: 2,
                    number: 2,
                    date: "15 / 06 / 2026",
                    doctor: "د. أحمد محمد",
                    status: "مكتملة",
                    notes: "بدأ تمارين ROM"
                },

                {
                    id: 3,
                    number: 3,
                    date: "18 / 06 / 2026",
                    doctor: "د. أحمد محمد",
                    status: "مكتملة",
                    notes: "تحسن واضح"
                },

                {
                    id: 4,
                    number: 4,
                    date: "21 / 06 / 2026",
                    doctor: "د. أحمد محمد",
                    status: "جارية",
                    notes: "بدء تمارين الاتزان"
                }

            ],

            // =============================
            // Exercises
            // =============================

            exercises: [

                {
                    id: 1,
                    name: "Mini Squat",
                    sets: 3,
                    reps: 15,
                    duration: "15 دقيقة",
                    description: "تقوية عضلات الفخذ",
                    icon: "bi-person-standing"
                },

                {
                    id: 2,
                    name: "Single Leg Balance",
                    sets: 4,
                    reps: 30,
                    duration: "30 ثانية",
                    description: "تحسين الاتزان",
                    icon: "bi-person-walking"
                },

                {
                    id: 3,
                    name: "Step Up",
                    sets: 3,
                    reps: 12,
                    duration: "10 دقائق",
                    description: "تقوية الركبة",
                    icon: "bi-arrow-up-square"
                }

            ],

            // =============================
            // Devices
            // =============================

            devices: [

                {
                    id: 1,
                    name: "Cryotherapy",
                    description: "جلسة ثلج بعد التمارين",
                    sessions: "كل جلسة",
                    icon: "bi-snow"
                },

                {
                    id: 2,
                    name: "NMES",
                    description: "تحفيز كهربائي للعضلة الرباعية",
                    sessions: "3 مرات أسبوعياً",
                    icon: "bi-lightning-charge"
                }

            ],

            // =============================
            // Attachments
            // =============================

            attachments: [

                {
                    id: 1,
                    name: "ACL MRI.pdf",
                    type: "PDF",
                    size: "3.1 MB",
                    uploadDate: "11 / 06 / 2026",
                    icon: "bi-file-earmark-pdf"
                },

                {
                    id: 2,
                    name: "Operation Report.pdf",
                    type: "PDF",
                    size: "1.8 MB",
                    uploadDate: "11 / 06 / 2026",
                    icon: "bi-file-earmark-medical"
                }

            ],

            // =============================
            // Notes
            // =============================

            notes: [

                {
                    id: 1,
                    date: "28 / 07 / 2026",
                    doctor: "د. أحمد محمد",
                    text: "بدأ الجري الخفيف بدون ألم."
                },

                {
                    id: 2,
                    date: "25 / 07 / 2026",
                    doctor: "د. أحمد محمد",
                    text: "زيادة قوة العضلة الرباعية بنسبة ملحوظة."
                }

            ],

            currentSessionNote: "",

            // =============================
            // Assessment
            // =============================

            assessment: {

                medicalHistory: {

                    mainDiagnosis: "ACL Reconstruction",

                    medicalDiagnosis: "Post ACL Reconstruction",

                    referringDoctor: "د. كريم علي",

                    hospital: "مستشفى دار الفؤاد",

                    conditionStartDate: "10 / 05 / 2026",

                    conditionDescription: "إعادة تأهيل بعد جراحة الرباط الصليبي."

                },

                chronicHistory: {

                    diseases: [],

                    allergies: "لا يوجد",

                    previousSurgeries: "ACL Reconstruction"

                },

                referral: {

                    source: "جراحة العظام",

                    date: "11 / 05 / 2026",

                    reason: "برنامج إعادة تأهيل"

                },

                medicalSurgicalHistory: {

                    previousHospitalization: "نعم",

                    previousPhysiotherapy: "لا",

                    surgicalHistory: "جراحة ACL"

                },

                physicalAssessment: {

                    rom: "متوسط",

                    flexibility: "متوسط",

                    balance: "ضعيف",

                    coordination: "متوسط"

                },

                measurements: {

                    height: "182 سم",

                    weight: "78 كجم",

                    bmi: "23.5"

                },

                functionalStatus: {

                    mobilityStatus: "يمشي بدون مساعدة",

                    assistiveDevice: "لا يوجد"

                },

                disability: {

                    hasDisability: "لا",

                    type: "-",

                    severity: "-",

                    symptoms: "-"

                },

                specialTests: {

                    details: "Lachman Test سلبي بعد الجراحة"

                },

                painAssessment: {

                    location: "الركبة اليسرى",

                    score: 3

                },

                qualityOfLife: {

                    occupation: "لاعب كرة قدم",

                    workImpact: "غير قادر على المشاركة في المباريات"

                },

                medications: {

                    current: "Paracetamol عند الحاجة"

                },

                followUp: {

                    exercises: "تمارين اتزان وتقوية",

                    nutrition: "زيادة البروتين",

                    precautions: "عدم ممارسة الرياضة العنيفة",

                    homeProgram: "30 دقيقة يومياً"

                },

                healthEducation: [

                    "الالتزام بالبرنامج",

                    "الإحماء قبل التمارين",

                    "تجنب القفز",

                    "العودة التدريجية للرياضة"

                ]

            }

        }

    ],

    appointments: [
        {
            id: 1,
            patientId: 1,
            doctorId: 1,
            date: "05 / 08 / 2026",
            time: "10:00",
            status: "pending"
        }
    ],
    notifications: [

    {
        id: 1,
        type: "new-patient",
        title: "تم إضافة مريض جديد",
        time: "منذ 5 دقائق",
        icon: "bi-person-plus-fill"
    },

    {
        id: 2,
        type: "session",
        title: "بدأت جلسة محمد أحمد",
        time: "منذ 15 دقيقة",
        icon: "bi-calendar-check"
    },

    {
        id: 3,
        type: "update",
        title: "تم تعديل ملف أحمد خالد",
        time: "منذ ساعة",
        icon: "bi-pencil-square"
    }

],
};

export default database;
