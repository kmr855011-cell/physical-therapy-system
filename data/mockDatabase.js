const database = {
  doctors: [
    { id: 1, fullName: "د. أحمد محمد", specialization: "علاج طبيعي - عظام", phone: "01011111111", email: "ahmed@clinic.com", status: "active" },
    { id: 2, fullName: "د. سارة خالد", specialization: "علاج طبيعي - إصابات رياضية", phone: "01022222222", email: "sara@clinic.com", status: "active" },
    { id: 3, fullName: "د. كريم علي", specialization: "علاج طبيعي - أعصاب", phone: "01033333333", email: "karim@clinic.com", status: "active" }
  ],
  secretaries: [
    { id: 1, fullName: "سارة علي", phone: "01044444444", email: "sara.ali@clinic.com" },
    { id: 2, fullName: "منة الله سعيد", phone: "01055555555", email: "menna@clinic.com" }
  ],
  patients: [
    {
      id: 1001, fileNumber: "PT-1001", fullName: "محمد أحمد محمد", gender: "ذكر", age: 32, dateOfBirth: "15/03/1994",
      nationalId: "29403150102345", phone: "01012345678", nationality: "مصري", maritalStatus: "متزوج",
      emergencyPhone: "01198765432", responsiblePerson: "أحمد محمد (الأخ)",
      address: "15 شارع النصر، الزقازيق، الشرقية", doctorId: 1,
      startDate: "03/07/2026", lastVisit: "29/07/2026", createdAt: "03/07/2026",
      status: "active", totalSessions: 20, completedSessions: 8, remainingSessions: 12, nextAppointment: "05/08/2026",
      diagnosis: { diagnosis: "خشونة الركبة", complaint: "ألم أثناء المشي", injuryDate: "03/07/2026", painLevel: "متوسطة", doctorNotes: "يحتاج إلى متابعة أسبوعية مع تقليل الأحمال والالتزام بالتمارين المنزلية." },
      treatmentPlan: { treatmentType: "علاج طبيعي", sessions: 20, sessionDuration: "45 دقيقة", weeklySessions: 3, goals: ["تقليل الألم", "زيادة مدى الحركة", "تقوية العضلات", "تحسين الاتزان", "العودة للحياة الطبيعية"] },
      sessions: [
        { id: 1, number: 1, date: "03/07/2026", doctor: "د. أحمد محمد", status: "مكتملة", notes: "تحسن في مدى الحركة" },
        { id: 2, number: 2, date: "05/07/2026", doctor: "د. أحمد محمد", status: "مكتملة", notes: "تقليل الألم" },
        { id: 3, number: 3, date: "08/07/2026", doctor: "د. أحمد محمد", status: "جارية", notes: "استكمال تمارين التقوية" },
        { id: 4, number: 4, date: "10/07/2026", doctor: "د. أحمد محمد", status: "قادمة", notes: "جلسة متابعة" },
        { id: 5, number: 5, date: "05/08/2026", doctor: "د. أحمد محمد", status: "جارية", notes: "جلسة متابعة أسبوعية، تحسن ملحوظ في المشي." }
      ],
      exercises: [
        { id: 1, name: "Hamstring Stretch", sets: 3, reps: 10, duration: "30 ثانية", description: "إطالة عضلات خلف الفخذ", icon: "bi-person-arms-up" },
        { id: 2, name: "Quadriceps Strengthening", sets: 4, reps: 12, duration: "15 دقيقة", description: "تقوية العضلة الرباعية", icon: "bi-activity" },
        { id: 3, name: "Heel Slides", sets: 3, reps: 15, duration: "10 دقائق", description: "زيادة مدى حركة الركبة", icon: "bi-arrow-repeat" }
      ],
      devices: [
        { id: 1, name: "Ultrasound Therapy", description: "جلسة موجات فوق صوتية", sessions: "كل جلسة", icon: "bi-soundwave" },
        { id: 2, name: "TENS", description: "تحفيز كهربائي لتخفيف الألم", sessions: "3 مرات أسبوعياً", icon: "bi-lightning-charge" },
        { id: 3, name: "Hot Pack", description: "كمادات حرارية", sessions: "قبل التمارين", icon: "bi-thermometer-half" }
      ],
      attachments: [
        { id: 1, name: "MRI Lumbar.pdf", type: "PDF", size: "2.4 MB", uploadDate: "20/07/2026", icon: "bi-file-earmark-pdf" },
        { id: 2, name: "X-Ray.png", type: "صورة", size: "1.1 MB", uploadDate: "21/07/2026", icon: "bi-file-earmark-image" },
        { id: 3, name: "Medical Report.docx", type: "Word", size: "430 KB", uploadDate: "22/07/2026", icon: "bi-file-earmark-word" }
      ],
      notes: [
        { id: 1, date: "29/07/2026", doctor: "د. أحمد محمد", text: "المريض استجاب بشكل جيد لتمارين الإطالة، وتم تقليل شدة الألم." },
        { id: 2, date: "25/07/2026", doctor: "د. كريم علي", text: "تم البدء في برنامج تقوية العضلات مع تحسين مدى الحركة." }
      ],
      currentSessionNote: "",
      assessment: {
        medicalHistory: { mainDiagnosis: "Lumbar Disc", medicalDiagnosis: "Lumbar Disc L4-L5", referringDoctor: "د. كريم علي", hospital: "مستشفى الزقازيق العام", conditionStartDate: "03/07/2026", conditionDescription: "يعاني المريض من ألم أسفل الظهر يمتد إلى الساق اليمنى." },
        chronicHistory: { diseases: ["السكر", "الضغط", "آلام الظهر والرقبة"], allergies: "لا يوجد", previousSurgeries: "استئصال الزائدة الدودية" },
        referral: { source: "عيادة العظام", date: "02/07/2026", reason: "العلاج الطبيعي بعد تشخيص الانزلاق الغضروفي" },
        medicalSurgicalHistory: { previousHospitalization: "نعم", previousPhysiotherapy: "لا", surgicalHistory: "استئصال الزائدة الدودية" },
        physicalAssessment: { rom: "جيد", flexibility: "ضعيف", balance: "جيد جداً", coordination: "جيد" },
        measurements: { height: "175 سم", weight: "82 كجم", bmi: "26.8" },
        functionalStatus: { mobilityStatus: "يتحرك بمساعدة", assistiveDevice: "عكاز طبي" },
        disability: { hasDisability: "لا", type: "-", severity: "-", symptoms: "لا يوجد" },
        specialTests: { details: "McMurray Test: إيجابي بسيط على الجانب الأيمن" },
        painAssessment: { location: "الركبة اليمنى", score: 6 },
        qualityOfLife: { occupation: "مهندس", workImpact: "الجلوس لفترات طويلة يزيد من الألم" },
        medications: { current: "Cataflam عند الحاجة" },
        followUp: { exercises: "تمارين تقوية العضلة الرباعية", nutrition: "تقليل الوزن تدريجياً", precautions: "تجنب صعود السلالم لفترات طويلة", homeProgram: "تمارين إطالة يومياً لمدة 15 دقيقة" },
        healthEducation: ["شرح الحالة للمريض", "إشراكه في الخطة العلاجية", "نصائح التغذية", "التمارين العلاجية", "البرنامج المنزلي"]
      }
    },
    {
      id: 1002, fileNumber: "PT-1002", fullName: "فاطمة السيد", gender: "أنثى", age: 58, dateOfBirth: "08/11/1968",
      nationalId: "26811081234567", phone: "01087654321", nationality: "مصرية", maritalStatus: "متزوجة",
      emergencyPhone: "01011112222", responsiblePerson: "محمد حسن (الزوج)",
      address: "الزقازيق - الشرقية", doctorId: 1,
      startDate: "15/06/2026", lastVisit: "28/07/2026", createdAt: "10/07/2026",
      status: "active", totalSessions: 15, completedSessions: 9, remainingSessions: 6, nextAppointment: "08/08/2026",
      diagnosis: { diagnosis: "خشونة مفصل الركبة", complaint: "ألم شديد أثناء صعود السلم", injuryDate: "15/06/2026", painLevel: "شديدة", doctorNotes: "ضرورة الالتزام ببرنامج إنقاص الوزن مع جلسات العلاج الطبيعي." },
      treatmentPlan: { treatmentType: "علاج طبيعي", sessions: 15, sessionDuration: "60 دقيقة", weeklySessions: 3, goals: ["تقليل الألم", "زيادة قوة العضلات", "تحسين الاتزان", "زيادة مدى الحركة", "العودة للمشي الطبيعي"] },
      sessions: [
        { id: 1, number: 1, date: "16/06/2026", doctor: "د. أحمد محمد", status: "مكتملة", notes: "تم تقييم الحالة." },
        { id: 2, number: 2, date: "18/06/2026", doctor: "د. أحمد محمد", status: "مكتملة", notes: "بدأت تمارين تقوية." },
        { id: 3, number: 3, date: "21/06/2026", doctor: "د. أحمد محمد", status: "جارية", notes: "تحسن بسيط." }
      ],
      exercises: [
        { id: 1, name: "Straight Leg Raise", sets: 3, reps: 15, duration: "15 دقيقة", description: "تقوية العضلة الرباعية", icon: "bi-activity" },
        { id: 2, name: "Sit To Stand", sets: 3, reps: 10, duration: "10 دقائق", description: "تحسين القوة الوظيفية", icon: "bi-person-standing" }
      ],
      devices: [
        { id: 1, name: "Hot Pack", description: "كمادات ساخنة", sessions: "قبل الجلسة", icon: "bi-thermometer-half" },
        { id: 2, name: "Ultrasound", description: "موجات فوق صوتية", sessions: "كل جلسة", icon: "bi-soundwave" }
      ],
      attachments: [
        { id: 1, name: "Knee MRI.pdf", type: "PDF", size: "2 MB", uploadDate: "11/07/2026", icon: "bi-file-earmark-pdf" }
      ],
      notes: [
        { id: 1, date: "28/07/2026", doctor: "د. أحمد محمد", text: "تحسن واضح في المشي وانخفاض الألم." }
      ],
      currentSessionNote: "",
      assessment: {
        medicalHistory: { mainDiagnosis: "Knee Osteoarthritis", medicalDiagnosis: "Grade II OA", referringDoctor: "د. سامح", hospital: "مستشفى الجامعة", conditionStartDate: "15/06/2026", conditionDescription: "خشونة متوسطة بالركبة اليمنى." },
        chronicHistory: { diseases: ["ضغط", "سكر"], allergies: "لا يوجد", previousSurgeries: "لا يوجد" },
        referral: { source: "عيادة العظام", date: "15/06/2026", reason: "جلسات علاج طبيعي" },
        medicalSurgicalHistory: { previousHospitalization: "لا", previousPhysiotherapy: "نعم", surgicalHistory: "لا يوجد" },
        physicalAssessment: { rom: "متوسط", flexibility: "ضعيف", balance: "متوسط", coordination: "جيد" },
        measurements: { height: "162 سم", weight: "91 كجم", bmi: "34.7" },
        functionalStatus: { mobilityStatus: "يمشي بعصا", assistiveDevice: "عصا" },
        disability: { hasDisability: "لا", type: "-", severity: "-", symptoms: "-" },
        specialTests: { details: "Crepitus + Positive Patellar Grind" },
        painAssessment: { location: "الركبة اليمنى", score: 8 },
        qualityOfLife: { occupation: "معلمة", workImpact: "الوقوف الطويل يزيد الألم" },
        medications: { current: "Celebrex" },
        followUp: { exercises: "تمارين تقوية", nutrition: "تقليل الوزن", precautions: "تجنب صعود السلالم", homeProgram: "تمارين يومية" },
        healthEducation: ["تقليل الوزن", "الالتزام بالتمارين", "استخدام العصا بالطريقة الصحيحة"]
      }
    },
    {
      id: 1003, fileNumber: "PT-1003", fullName: "يوسف خالد", gender: "ذكر", age: 24, dateOfBirth: "18/09/2002",
      nationalId: "30209181234567", phone: "01055554444", nationality: "مصري", maritalStatus: "أعزب",
      emergencyPhone: "01033332222", responsiblePerson: "خالد محمد (الأب)",
      address: "القاهرة - مدينة نصر", doctorId: 2,
      startDate: "01/06/2026", lastVisit: "28/07/2026", createdAt: "01/06/2026",
      status: "active", totalSessions: 30, completedSessions: 12, remainingSessions: 18, nextAppointment: "06/08/2026",
      diagnosis: { diagnosis: "إعادة تأهيل بعد جراحة الرباط الصليبي ACL", complaint: "ضعف وثبات الركبة", injuryDate: "10/05/2026", painLevel: "خفيفة", doctorNotes: "التركيز على استعادة القوة والاتزان قبل العودة للملاعب." },
      treatmentPlan: { treatmentType: "إعادة تأهيل رياضي", sessions: 30, sessionDuration: "75 دقيقة", weeklySessions: 4, goals: ["استعادة مدى الحركة", "تقوية العضلات", "تحسين الاتزان", "العودة للجري", "العودة لكرة القدم"] },
      sessions: [
        { id: 1, number: 1, date: "12/06/2026", doctor: "د. سارة خالد", status: "مكتملة", notes: "تقييم أولي بعد العملية" },
        { id: 2, number: 2, date: "15/06/2026", doctor: "د. سارة خالد", status: "مكتملة", notes: "بدأ تمارين ROM" },
        { id: 3, number: 3, date: "18/06/2026", doctor: "د. سارة خالد", status: "مكتملة", notes: "تحسن واضح" },
        { id: 4, number: 4, date: "21/06/2026", doctor: "د. سارة خالد", status: "جارية", notes: "بدء تمارين الاتزان" },
        { id: 5, number: 5, date: "05/08/2026", doctor: "د. سارة خالد", status: "قادمة", notes: "تقييم التقدم بعد 4 جلسات من التأهيل." }
      ],
      exercises: [
        { id: 1, name: "Mini Squat", sets: 3, reps: 15, duration: "15 دقيقة", description: "تقوية عضلات الفخذ", icon: "bi-person-standing" },
        { id: 2, name: "Single Leg Balance", sets: 4, reps: 30, duration: "30 ثانية", description: "تحسين الاتزان", icon: "bi-person-walking" },
        { id: 3, name: "Step Up", sets: 3, reps: 12, duration: "10 دقائق", description: "تقوية الركبة", icon: "bi-arrow-up-square" }
      ],
      devices: [
        { id: 1, name: "Cryotherapy", description: "جلسة ثلج بعد التمارين", sessions: "كل جلسة", icon: "bi-snow" },
        { id: 2, name: "NMES", description: "تحفيز كهربائي للعضلة الرباعية", sessions: "3 مرات أسبوعياً", icon: "bi-lightning-charge" }
      ],
      attachments: [
        { id: 1, name: "ACL MRI.pdf", type: "PDF", size: "3.1 MB", uploadDate: "11/06/2026", icon: "bi-file-earmark-pdf" },
        { id: 2, name: "Operation Report.pdf", type: "PDF", size: "1.8 MB", uploadDate: "11/06/2026", icon: "bi-file-earmark-medical" }
      ],
      notes: [
        { id: 1, date: "28/07/2026", doctor: "د. سارة خالد", text: "بدأ الجري الخفيف بدون ألم." },
        { id: 2, date: "25/07/2026", doctor: "د. سارة خالد", text: "زيادة قوة العضلة الرباعية بنسبة ملحوظة." }
      ],
      currentSessionNote: "",
      assessment: {
        medicalHistory: { mainDiagnosis: "ACL Reconstruction", medicalDiagnosis: "Post ACL Reconstruction", referringDoctor: "د. كريم علي", hospital: "مستشفى دار الفؤاد", conditionStartDate: "10/05/2026", conditionDescription: "إعادة تأهيل بعد جراحة الرباط الصليبي." },
        chronicHistory: { diseases: [], allergies: "لا يوجد", previousSurgeries: "ACL Reconstruction" },
        referral: { source: "جراحة العظام", date: "11/05/2026", reason: "برنامج إعادة تأهيل" },
        medicalSurgicalHistory: { previousHospitalization: "نعم", previousPhysiotherapy: "لا", surgicalHistory: "جراحة ACL" },
        physicalAssessment: { rom: "متوسط", flexibility: "متوسط", balance: "ضعيف", coordination: "متوسط" },
        measurements: { height: "182 سم", weight: "78 كجم", bmi: "23.5" },
        functionalStatus: { mobilityStatus: "يمشي بدون مساعدة", assistiveDevice: "لا يوجد" },
        disability: { hasDisability: "لا", type: "-", severity: "-", symptoms: "-" },
        specialTests: { details: "Lachman Test سلبي بعد الجراحة" },
        painAssessment: { location: "الركبة اليسرى", score: 3 },
        qualityOfLife: { occupation: "لاعب كرة قدم", workImpact: "غير قادر على المشاركة في المباريات" },
        medications: { current: "Paracetamol عند الحاجة" },
        followUp: { exercises: "تمارين اتزان وتقوية", nutrition: "زيادة البروتين", precautions: "عدم ممارسة الرياضة العنيفة", homeProgram: "30 دقيقة يومياً" },
        healthEducation: ["الالتزام بالبرنامج", "الإحماء قبل التمارين", "تجنب القفز", "العودة التدريجية للرياضة"]
      }
    },
    {
      id: 1004, fileNumber: "PT-1004", fullName: "نورا سمير", gender: "أنثى", age: 45, dateOfBirth: "22/12/1981",
      nationalId: "28112221234567", phone: "01077776666", nationality: "مصرية", maritalStatus: "مطلقة",
      emergencyPhone: "01088889999", responsiblePerson: "سمير (الأخ)",
      address: "الإسكندرية - سيدي جابر", doctorId: 3,
      startDate: "20/07/2026", lastVisit: "30/07/2026", createdAt: "20/07/2026",
      status: "active", totalSessions: 12, completedSessions: 4, remainingSessions: 8, nextAppointment: "10/08/2026",
      diagnosis: { diagnosis: "انزلاق غضروفي عنقي", complaint: "ألم في الرقبة والكتف", injuryDate: "18/07/2026", painLevel: "متوسطة", doctorNotes: "تحتاج إلى جلسات علاج طبيعي لتقوية عضلات الرقبة." },
      treatmentPlan: { treatmentType: "علاج طبيعي", sessions: 12, sessionDuration: "45 دقيقة", weeklySessions: 3, goals: ["تقليل الألم", "زيادة مرونة الرقبة", "تحسين وضعية الجلوس", "تقوية عضلات الكتف"] },
      sessions: [
        { id: 1, number: 1, date: "22/07/2026", doctor: "د. كريم علي", status: "مكتملة", notes: "تم تقييم الحالة وبدء التمارين." },
        { id: 2, number: 2, date: "25/07/2026", doctor: "د. كريم علي", status: "مكتملة", notes: "تحسن طفيف في نطاق الحركة." },
        { id: 3, number: 3, date: "28/07/2026", doctor: "د. كريم علي", status: "جارية", notes: "استكمال تمارين التقوية." }
      ],
      exercises: [
        { id: 1, name: "Neck Stretch", sets: 3, reps: 5, duration: "15 ثانية", description: "تمارين إطالة الرقبة", icon: "bi-person-arms-up" },
        { id: 2, name: "Shoulder Shrugs", sets: 3, reps: 15, duration: "10 دقائق", description: "تقوية عضلات الكتف", icon: "bi-activity" }
      ],
      devices: [
        { id: 1, name: "Traction", description: "جهاز شد الرقبة", sessions: "كل جلسة", icon: "bi-arrow-up" },
        { id: 2, name: "Hot Pack", description: "كمادات ساخنة", sessions: "قبل التمارين", icon: "bi-thermometer-half" }
      ],
      attachments: [
        { id: 1, name: "Neck MRI.pdf", type: "PDF", size: "1.5 MB", uploadDate: "22/07/2026", icon: "bi-file-earmark-pdf" }
      ],
      notes: [
        { id: 1, date: "30/07/2026", doctor: "د. كريم علي", text: "التحسن مستمر، وقد انخفض الألم بنسبة 50%." }
      ],
      currentSessionNote: "",
      assessment: {
        medicalHistory: { mainDiagnosis: "Cervical Disc Herniation", medicalDiagnosis: "C5-C6 Disc Bulge", referringDoctor: "د. محمد سامي", hospital: "مستشفى الإسكندرية", conditionStartDate: "18/07/2026", conditionDescription: "ألم حاد في الرقبة والكتف الأيمن، يزداد مع الجلوس الطويل." },
        chronicHistory: { diseases: [], allergies: "لا يوجد", previousSurgeries: "لا يوجد" },
        referral: { source: "عيادة المخ والأعصاب", date: "18/07/2026", reason: "علاج طبيعي عنقي" },
        medicalSurgicalHistory: { previousHospitalization: "لا", previousPhysiotherapy: "لا", surgicalHistory: "لا يوجد" },
        physicalAssessment: { rom: "ضعيف", flexibility: "متوسط", balance: "جيد", coordination: "جيد" },
        measurements: { height: "165 سم", weight: "68 كجم", bmi: "25.0" },
        functionalStatus: { mobilityStatus: "تمشي بشكل طبيعي", assistiveDevice: "لا يوجد" },
        disability: { hasDisability: "لا", type: "-", severity: "-", symptoms: "-" },
        specialTests: { details: "Spurling Test إيجابي على اليمين." },
        painAssessment: { location: "الرقبة والكتف الأيمن", score: 5 },
        qualityOfLife: { occupation: "محامية", workImpact: "الجلوس لساعات طويلة يزيد من الألم." },
        medications: { current: "Mefenamic Acid عند الحاجة" },
        followUp: { exercises: "تمارين إطالة وتقوية الرقبة", nutrition: "لا يوجد", precautions: "تجنب الجلوس الطويل بدون حركة", homeProgram: "تمارين منزلية يومية لمدة 10 دقائق" },
        healthEducation: ["تحسين وضعية الجلوس", "تجنب حمل الأوزان الثقيلة", "تمارين منتظمة"]
      }
    },
    {
      id: 1005, fileNumber: "PT-1005", fullName: "أحمد علي", gender: "ذكر", age: 55, dateOfBirth: "01/01/1971",
      nationalId: "27101011234567", phone: "01099998888", nationality: "مصري", maritalStatus: "متزوج",
      emergencyPhone: "01088887777", responsiblePerson: "علي (الأخ)",
      address: "الجيزة - المهندسين", doctorId: 1,
      startDate: "01/08/2026", lastVisit: "01/08/2026", createdAt: "01/08/2026",
      status: "active", totalSessions: 10, completedSessions: 1, remainingSessions: 9, nextAppointment: "08/08/2026",
      diagnosis: { diagnosis: "التهاب مفصل الكتف", complaint: "ألم أثناء رفع الذراع", injuryDate: "01/08/2026", painLevel: "متوسطة", doctorNotes: "يحتاج إلى تمارين لتقوية عضلات الكتف وتحسين المدى الحركي." },
      treatmentPlan: { treatmentType: "علاج طبيعي", sessions: 10, sessionDuration: "45 دقيقة", weeklySessions: 2, goals: ["تقليل الألم", "زيادة مدى الحركة", "تقوية العضلات", "العودة للأنشطة اليومية"] },
      sessions: [
        { id: 1, number: 1, date: "02/08/2026", doctor: "د. أحمد محمد", status: "مكتملة", notes: "تقييم أولي." },
        { id: 2, number: 2, date: "05/08/2026", doctor: "د. أحمد محمد", status: "مكتملة", notes: "تحسن في مدى حركة الكتف، بدء تمارين المقاومة." }
      ],
      exercises: [
        { id: 1, name: "Shoulder Flexion", sets: 3, reps: 10, duration: "10 دقائق", description: "رفع الذراع للأمام", icon: "bi-arrow-up" }
      ],
      devices: [
        { id: 1, name: "Ultrasound", description: "موجات فوق صوتية", sessions: "كل جلسة", icon: "bi-soundwave" }
      ],
      attachments: [],
      notes: [
        { id: 1, date: "02/08/2026", doctor: "د. أحمد محمد", text: "تم تقييم الحالة وبدء التمارين." }
      ],
      currentSessionNote: "",
      assessment: {
        medicalHistory: { mainDiagnosis: "Shoulder Impingement", medicalDiagnosis: "Subacromial Impingement", referringDoctor: "د. عمرو سامي", hospital: "مستشفى الجيزة", conditionStartDate: "01/08/2026", conditionDescription: "ألم في الكتف الأيمن أثناء رفع الذراع." },
        chronicHistory: { diseases: ["ضغط"], allergies: "لا يوجد", previousSurgeries: "لا يوجد" },
        referral: { source: "عيادة العظام", date: "01/08/2026", reason: "علاج طبيعي للكتف" },
        medicalSurgicalHistory: { previousHospitalization: "لا", previousPhysiotherapy: "لا", surgicalHistory: "لا يوجد" },
        physicalAssessment: { rom: "ضعيف", flexibility: "متوسط", balance: "جيد", coordination: "جيد" },
        measurements: { height: "170 سم", weight: "85 كجم", bmi: "29.4" },
        functionalStatus: { mobilityStatus: "يمشي بشكل طبيعي", assistiveDevice: "لا يوجد" },
        disability: { hasDisability: "لا", type: "-", severity: "-", symptoms: "-" },
        specialTests: { details: "Hawkins-Kennedy Test إيجابي." },
        painAssessment: { location: "الكتف الأيمن", score: 4 },
        qualityOfLife: { occupation: "موظف حكومي", workImpact: "لا يؤثر على العمل." },
        medications: { current: "Diclofenac عند الحاجة" },
        followUp: { exercises: "تمارين إطالة وتقوية الكتف", nutrition: "تقليل الوزن", precautions: "تجنب رفع الأشياء الثقيلة", homeProgram: "تمارين يومية لمدة 15 دقيقة" },
        healthEducation: ["تحسين وضعية النوم", "تجنب الحركات المفاجئة"]
      }
    },
    {
      id: 1006, fileNumber: "PT-1006", fullName: "ليلى محمود", gender: "أنثى", age: 30, dateOfBirth: "05/05/1996",
      nationalId: "29605051234567", phone: "01077775555", nationality: "مصرية", maritalStatus: "متزوجة",
      emergencyPhone: "01066664444", responsiblePerson: "محمود (الأب)",
      address: "المنصورة - شارع الجامعة", doctorId: 2,
      startDate: "25/07/2026", lastVisit: "01/08/2026", createdAt: "25/07/2026",
      status: "pending", totalSessions: 8, completedSessions: 3, remainingSessions: 5, nextAppointment: "15/08/2026",
      diagnosis: { diagnosis: "التهاب الأوتار في الكاحل", complaint: "ألم أثناء المشي", injuryDate: "24/07/2026", painLevel: "خفيفة", doctorNotes: "تحتاج إلى تمارين تقوية الكاحل وتجنب المشي لمسافات طويلة." },
      treatmentPlan: { treatmentType: "علاج طبيعي", sessions: 8, sessionDuration: "30 دقيقة", weeklySessions: 2, goals: ["تقليل الألم", "تقوية العضلات", "العودة للمشي الطبيعي"] },
      sessions: [
        { id: 1, number: 1, date: "26/07/2026", doctor: "د. سارة خالد", status: "مكتملة", notes: "تقييم الحالة." },
        { id: 2, number: 2, date: "29/07/2026", doctor: "د. سارة خالد", status: "مكتملة", notes: "تمارين تقوية." },
        { id: 3, number: 3, date: "01/08/2026", doctor: "د. سارة خالد", status: "جارية", notes: "تحسن ملحوظ." }
      ],
      exercises: [
        { id: 1, name: "Ankle Circles", sets: 3, reps: 10, duration: "5 دقائق", description: "تمارين دوران الكاحل", icon: "bi-arrow-repeat" }
      ],
      devices: [
        { id: 1, name: "Ice Pack", description: "كمادات باردة", sessions: "بعد الجلسة", icon: "bi-snow2" }
      ],
      attachments: [],
      notes: [
        { id: 1, date: "01/08/2026", doctor: "د. سارة خالد", text: "بدأت المريضة تشعر بتحسن واضح." }
      ],
      currentSessionNote: "",
      assessment: {
        medicalHistory: { mainDiagnosis: "Ankle Tendonitis", medicalDiagnosis: "Achilles Tendonitis", referringDoctor: "د. يوسف رشدي", hospital: "مستشفى المنصورة", conditionStartDate: "24/07/2026", conditionDescription: "ألم في الكاحل الأيمن أثناء المشي." },
        chronicHistory: { diseases: [], allergies: "لا يوجد", previousSurgeries: "لا يوجد" },
        referral: { source: "عيادة العظام", date: "24/07/2026", reason: "علاج طبيعي" },
        medicalSurgicalHistory: { previousHospitalization: "لا", previousPhysiotherapy: "لا", surgicalHistory: "لا يوجد" },
        physicalAssessment: { rom: "جيد", flexibility: "جيد", balance: "متوسط", coordination: "جيد" },
        measurements: { height: "160 سم", weight: "65 كجم", bmi: "25.4" },
        functionalStatus: { mobilityStatus: "تمشي بصعوبة", assistiveDevice: "لا يوجد" },
        disability: { hasDisability: "لا", type: "-", severity: "-", symptoms: "-" },
        specialTests: { details: "Thompson Test سلبي." },
        painAssessment: { location: "الكاحل الأيمن", score: 2 },
        qualityOfLife: { occupation: "معلمة", workImpact: "الوقوف الطويل يزيد الألم." },
        medications: { current: "لا يوجد" },
        followUp: { exercises: "تمارين إطالة وتقوية الكاحل", nutrition: "زيادة البروتين", precautions: "تجنب الجري", homeProgram: "تمارين يومية لمدة 10 دقائق" },
        healthEducation: ["تجنب المشي على الأسطح الصلبة", "ارتداء أحذية مناسبة"]
      }
    },
    {
      id: 1007, fileNumber: "PT-1007", fullName: "محمود رضا", gender: "ذكر", age: 65, dateOfBirth: "12/07/1961",
      nationalId: "26107121234567", phone: "01066665555", nationality: "مصري", maritalStatus: "متزوج",
      emergencyPhone: "01055554444", responsiblePerson: "رضا (الابن)",
      address: "الإسكندرية - محطة الرمل", doctorId: 3,
      startDate: "01/06/2026", lastVisit: "30/07/2026", createdAt: "01/06/2026",
      status: "inactive", totalSessions: 10, completedSessions: 10, remainingSessions: 0, nextAppointment: "-",
      diagnosis: { diagnosis: "ديسك قطني", complaint: "ألم في أسفل الظهر", injuryDate: "01/06/2026", painLevel: "شديدة", doctorNotes: "تم الانتهاء من البرنامج العلاجي، والمريض بحاجة إلى متابعة دورية." },
      treatmentPlan: { treatmentType: "علاج طبيعي", sessions: 10, sessionDuration: "60 دقيقة", weeklySessions: 3, goals: ["تقليل الألم", "تحسين الحركة", "تقوية العضلات"] },
      sessions: [
        { id: 1, number: 1, date: "02/06/2026", doctor: "د. كريم علي", status: "مكتملة", notes: "تقييم الحالة." },
        { id: 2, number: 2, date: "05/06/2026", doctor: "د. كريم علي", status: "مكتملة", notes: "تمارين تقوية." },
        { id: 3, number: 3, date: "08/06/2026", doctor: "د. كريم علي", status: "مكتملة", notes: "تحسن ملحوظ." },
        { id: 4, number: 4, date: "12/06/2026", doctor: "د. كريم علي", status: "مكتملة", notes: "استمرار التحسن." }
      ],
      exercises: [
        { id: 1, name: "Pelvic Tilt", sets: 3, reps: 15, duration: "10 دقائق", description: "تمارين إطالة أسفل الظهر", icon: "bi-activity" }
      ],
      devices: [
        { id: 1, name: "Ultrasound", description: "موجات فوق صوتية", sessions: "كل جلسة", icon: "bi-soundwave" }
      ],
      attachments: [],
      notes: [
        { id: 1, date: "30/07/2026", doctor: "د. كريم علي", text: "انتهى البرنامج العلاجي، المريض بحالة جيدة." }
      ],
      currentSessionNote: "",
      assessment: {
        medicalHistory: { mainDiagnosis: "Lumbar Disc Herniation", medicalDiagnosis: "L4-L5 Disc", referringDoctor: "د. سامي رشدي", hospital: "مستشفى الإسكندرية", conditionStartDate: "01/06/2026", conditionDescription: "ألم أسفل الظهر يمتد إلى الرجل اليمنى." },
        chronicHistory: { diseases: ["سكر", "ضغط"], allergies: "لا يوجد", previousSurgeries: "لا يوجد" },
        referral: { source: "عيادة العظام", date: "01/06/2026", reason: "علاج طبيعي لديسك قطني" },
        medicalSurgicalHistory: { previousHospitalization: "نعم", previousPhysiotherapy: "نعم", surgicalHistory: "لا يوجد" },
        physicalAssessment: { rom: "جيد", flexibility: "متوسط", balance: "جيد", coordination: "جيد" },
        measurements: { height: "168 سم", weight: "70 كجم", bmi: "24.8" },
        functionalStatus: { mobilityStatus: "يمشي بمساعدة", assistiveDevice: "عكاز" },
        disability: { hasDisability: "لا", type: "-", severity: "-", symptoms: "-" },
        specialTests: { details: "SLR موجب على الرجل اليمنى." },
        painAssessment: { location: "أسفل الظهر", score: 3 },
        qualityOfLife: { occupation: "متقاعد", workImpact: "لا يؤثر." },
        medications: { current: "Cataflam عند الحاجة" },
        followUp: { exercises: "تمارين منزلية للحفاظ على المرونة", nutrition: "تجنب الأطعمة الدسمة", precautions: "تجنب حمل الأوزان الثقيلة", homeProgram: "تمارين يومية لمدة 15 دقيقة" },
        healthEducation: ["المتابعة الدورية", "الحفاظ على الوزن المثالي"]
      }
    },
    {
      id: 1008, fileNumber: "PT-1008", fullName: "هدى إبراهيم", gender: "أنثى", age: 28, dateOfBirth: "03/10/1998",
      nationalId: "29810031234567", phone: "01044443333", nationality: "مصرية", maritalStatus: "أعزب",
      emergencyPhone: "01033332222", responsiblePerson: "إبراهيم (الأب)",
      address: "القاهرة - المعادي", doctorId: 2,
      startDate: "10/07/2026", lastVisit: "30/07/2026", createdAt: "10/07/2026",
      status: "active", totalSessions: 8, completedSessions: 5, remainingSessions: 3, nextAppointment: "12/08/2026",
      diagnosis: { diagnosis: "تمزق في عضلة الساق", complaint: "ألم في الساق اليسرى", injuryDate: "08/07/2026", painLevel: "متوسطة", doctorNotes: "تحتاج إلى تمارين تقوية وتجنب الجري لمدة أسبوعين." },
      treatmentPlan: { treatmentType: "علاج طبيعي", sessions: 8, sessionDuration: "45 دقيقة", weeklySessions: 2, goals: ["تقليل الألم", "تقوية العضلات", "العودة للرياضة"] },
      sessions: [
        { id: 1, number: 1, date: "11/07/2026", doctor: "د. سارة خالد", status: "مكتملة", notes: "تقييم الحالة." },
        { id: 2, number: 2, date: "14/07/2026", doctor: "د. سارة خالد", status: "مكتملة", notes: "بدأت تمارين الإطالة." },
        { id: 3, number: 3, date: "18/07/2026", doctor: "د. سارة خالد", status: "مكتملة", notes: "تحسن في المرونة." },
        { id: 4, number: 4, date: "22/07/2026", doctor: "د. سارة خالد", status: "جارية", notes: "تمارين تقوية." }
      ],
      exercises: [
        { id: 1, name: "Calf Stretch", sets: 3, reps: 10, duration: "30 ثانية", description: "إطالة عضلة الساق", icon: "bi-person-arms-up" },
        { id: 2, name: "Toe Raises", sets: 3, reps: 15, duration: "10 دقائق", description: "تقوية عضلة الساق", icon: "bi-activity" }
      ],
      devices: [
        { id: 1, name: "Ice Pack", description: "كمادات باردة", sessions: "بعد الجلسة", icon: "bi-snow2" }
      ],
      attachments: [],
      notes: [
        { id: 1, date: "30/07/2026", doctor: "د. سارة خالد", text: "التحسن مستمر، ويمكن البدء في الجري الخفيف قريباً." }
      ],
      currentSessionNote: "",
      assessment: {
        medicalHistory: { mainDiagnosis: "Calf Muscle Tear", medicalDiagnosis: "Grade II Tear", referringDoctor: "د. يوسف رشدي", hospital: "مستشفى المعادي", conditionStartDate: "08/07/2026", conditionDescription: "ألم في الساق اليسرى بعد الجري." },
        chronicHistory: { diseases: [], allergies: "لا يوجد", previousSurgeries: "لا يوجد" },
        referral: { source: "عيادة العظام", date: "08/07/2026", reason: "علاج طبيعي" },
        medicalSurgicalHistory: { previousHospitalization: "لا", previousPhysiotherapy: "لا", surgicalHistory: "لا يوجد" },
        physicalAssessment: { rom: "جيد", flexibility: "ضعيف", balance: "جيد", coordination: "جيد" },
        measurements: { height: "165 سم", weight: "60 كجم", bmi: "22.0" },
        functionalStatus: { mobilityStatus: "تمشي بشكل طبيعي", assistiveDevice: "لا يوجد" },
        disability: { hasDisability: "لا", type: "-", severity: "-", symptoms: "-" },
        specialTests: { details: "Thompson Test إيجابي." },
        painAssessment: { location: "الساق اليسرى", score: 2 },
        qualityOfLife: { occupation: "طالبة", workImpact: "لا يؤثر." },
        medications: { current: "لا يوجد" },
        followUp: { exercises: "تمارين إطالة وتقوية الساق", nutrition: "زيادة البروتين", precautions: "تجنب الجري لمسافات طويلة", homeProgram: "تمارين يومية لمدة 10 دقائق" },
        healthEducation: ["الإحماء قبل التمارين", "الراحة الكافية"]
      }
    },
    {
      id: 1009, fileNumber: "PT-1009", fullName: "مريم عادل", gender: "أنثى", age: 50, dateOfBirth: "20/02/1976",
      nationalId: "27602201234567", phone: "01022221111", nationality: "مصرية", maritalStatus: "متزوجة",
      emergencyPhone: "01011110000", responsiblePerson: "عادل (الزوج)",
      address: "الشرقية - بلبيس", doctorId: 1,
      startDate: "01/08/2026", lastVisit: "01/08/2026", createdAt: "01/08/2026",
      status: "active", totalSessions: 10, completedSessions: 1, remainingSessions: 9, nextAppointment: "08/08/2026",
      diagnosis: { diagnosis: "التهاب مفصل الفخذ", complaint: "ألم أثناء المشي", injuryDate: "01/08/2026", painLevel: "متوسطة", doctorNotes: "تحتاج إلى تمارين لتقوية العضلات المحيطة بمفصل الفخذ." },
      treatmentPlan: { treatmentType: "علاج طبيعي", sessions: 10, sessionDuration: "45 دقيقة", weeklySessions: 3, goals: ["تقليل الألم", "تحسين المشي", "زيادة مرونة المفصل"] },
      sessions: [
        { id: 1, number: 1, date: "02/08/2026", doctor: "د. أحمد محمد", status: "مكتملة", notes: "تقييم الحالة." },
        { id: 2, number: 2, date: "05/08/2026", doctor: "د. أحمد محمد", status: "جارية", notes: "تمارين تقوية عضلات الفخذ، استجابة جيدة." }
      ],
      exercises: [
        { id: 1, name: "Hip Flexor Stretch", sets: 3, reps: 10, duration: "30 ثانية", description: "إطالة عضلات الفخذ", icon: "bi-person-arms-up" }
      ],
      devices: [
        { id: 1, name: "Heat Pack", description: "كمادات ساخنة", sessions: "قبل التمارين", icon: "bi-thermometer-half" }
      ],
      attachments: [],
      notes: [
        { id: 1, date: "02/08/2026", doctor: "د. أحمد محمد", text: "بدأت الجلسات." }
      ],
      currentSessionNote: "",
      assessment: {
        medicalHistory: { mainDiagnosis: "Hip Osteoarthritis", medicalDiagnosis: "Grade II OA", referringDoctor: "د. كريم عادل", hospital: "مستشفى بلبيس", conditionStartDate: "01/08/2026", conditionDescription: "ألم في الفخذ الأيمن أثناء المشي." },
        chronicHistory: { diseases: ["ضغط"], allergies: "لا يوجد", previousSurgeries: "لا يوجد" },
        referral: { source: "عيادة العظام", date: "01/08/2026", reason: "علاج طبيعي" },
        medicalSurgicalHistory: { previousHospitalization: "لا", previousPhysiotherapy: "لا", surgicalHistory: "لا يوجد" },
        physicalAssessment: { rom: "ضعيف", flexibility: "متوسط", balance: "جيد", coordination: "جيد" },
        measurements: { height: "162 سم", weight: "75 كجم", bmi: "28.6" },
        functionalStatus: { mobilityStatus: "تمشي بعصا", assistiveDevice: "عصا" },
        disability: { hasDisability: "لا", type: "-", severity: "-", symptoms: "-" },
        specialTests: { details: "FABER Test إيجابي." },
        painAssessment: { location: "الفخذ الأيمن", score: 5 },
        qualityOfLife: { occupation: "ربة منزل", workImpact: "تؤثر على الأنشطة اليومية." },
        medications: { current: "Celebrex" },
        followUp: { exercises: "تمارين تقوية عضلات الفخذ", nutrition: "تقليل الوزن", precautions: "تجنب صعود السلالم", homeProgram: "تمارين يومية لمدة 10 دقائق" },
        healthEducation: ["الحفاظ على الوزن المثالي", "استخدام العصا بالطريقة الصحيحة"]
      }
    },
    {
      id: 1010, fileNumber: "PT-1010", fullName: "خالد سامي", gender: "ذكر", age: 40, dateOfBirth: "15/06/1986",
      nationalId: "28606151234567", phone: "01011112222", nationality: "مصري", maritalStatus: "متزوج",
      emergencyPhone: "01022223333", responsiblePerson: "سامي (الأخ)",
      address: "القاهرة - مدينة نصر", doctorId: 3,
      startDate: "05/07/2026", lastVisit: "30/07/2026", createdAt: "05/07/2026",
      status: "active", totalSessions: 6, completedSessions: 4, remainingSessions: 2, nextAppointment: "12/08/2026",
      diagnosis: { diagnosis: "التهاب الأوتار في الكتف", complaint: "ألم أثناء رفع الذراع", injuryDate: "04/07/2026", painLevel: "خفيفة", doctorNotes: "يحتاج إلى جلسات علاج طبيعي لتحسين المدى الحركي." },
      treatmentPlan: { treatmentType: "علاج طبيعي", sessions: 6, sessionDuration: "30 دقيقة", weeklySessions: 2, goals: ["تقليل الألم", "زيادة المدى الحركي", "تقوية العضلات"] },
      sessions: [
        { id: 1, number: 1, date: "06/07/2026", doctor: "د. كريم علي", status: "مكتملة", notes: "تقييم الحالة." },
        { id: 2, number: 2, date: "08/07/2026", doctor: "د. كريم علي", status: "مكتملة", notes: "تمارين إطالة." },
        { id: 3, number: 3, date: "12/07/2026", doctor: "د. كريم علي", status: "مكتملة", notes: "تمارين تقوية." },
        { id: 4, number: 4, date: "16/07/2026", doctor: "د. كريم علي", status: "جارية", notes: "تحسن ملحوظ." }
      ],
      exercises: [
        { id: 1, name: "Shoulder Stretch", sets: 3, reps: 10, duration: "30 ثانية", description: "تمارين إطالة الكتف", icon: "bi-person-arms-up" }
      ],
      devices: [
        { id: 1, name: "Ultrasound", description: "موجات فوق صوتية", sessions: "كل جلسة", icon: "bi-soundwave" }
      ],
      attachments: [],
      notes: [
        { id: 1, date: "30/07/2026", doctor: "د. كريم علي", text: "المريض يستجيب بشكل جيد للعلاج." }
      ],
      currentSessionNote: "",
      assessment: {
        medicalHistory: { mainDiagnosis: "Shoulder Tendonitis", medicalDiagnosis: "Supraspinatus Tendonitis", referringDoctor: "د. عمرو سامي", hospital: "مستشفى النصر", conditionStartDate: "04/07/2026", conditionDescription: "ألم في الكتف الأيسر." },
        chronicHistory: { diseases: [], allergies: "لا يوجد", previousSurgeries: "لا يوجد" },
        referral: { source: "عيادة العظام", date: "04/07/2026", reason: "علاج طبيعي" },
        medicalSurgicalHistory: { previousHospitalization: "لا", previousPhysiotherapy: "لا", surgicalHistory: "لا يوجد" },
        physicalAssessment: { rom: "متوسط", flexibility: "متوسط", balance: "جيد", coordination: "جيد" },
        measurements: { height: "175 سم", weight: "80 كجم", bmi: "26.1" },
        functionalStatus: { mobilityStatus: "يمشي بشكل طبيعي", assistiveDevice: "لا يوجد" },
        disability: { hasDisability: "لا", type: "-", severity: "-", symptoms: "-" },
        specialTests: { details: "Empty Can Test إيجابي." },
        painAssessment: { location: "الكتف الأيسر", score: 2 },
        qualityOfLife: { occupation: "مهندس", workImpact: "لا يؤثر على العمل." },
        medications: { current: "لا يوجد" },
        followUp: { exercises: "تمارين إطالة وتقوية الكتف", nutrition: "لا يوجد", precautions: "تجنب الحركات المفاجئة", homeProgram: "تمارين يومية لمدة 10 دقائق" },
        healthEducation: ["الإحماء قبل التمارين", "تجنب رفع الأوزان الثقيلة"]
      }
    }
  ],
  appointments: [
    { id: 1, patientId: 1001, doctorId: 1, date: "05/08/2026", time: "10:00", status: "قيد الانتظار" },
    { id: 2, patientId: 1002, doctorId: 1, date: "08/08/2026", time: "11:30", status: "تم التأكيد" },
    { id: 3, patientId: 1003, doctorId: 2, date: "06/08/2026", time: "09:00", status: "قيد الانتظار" },
    { id: 4, patientId: 1004, doctorId: 3, date: "10/08/2026", time: "14:00", status: "تم التأكيد" },
    { id: 5, patientId: 1005, doctorId: 1, date: "08/08/2026", time: "13:00", status: "قيد الانتظار" },
    { id: 6, patientId: 1006, doctorId: 2, date: "15/08/2026", time: "12:00", status: "قيد الانتظار" }
  ],
  notifications: [
    { id: 1, type: "new-patient", title: "تم إضافة مريض جديد (مريم عادل)", time: "منذ 5 دقائق", icon: "bi-person-plus-fill" },
    { id: 2, type: "session", title: "بدأت جلسة محمد أحمد", time: "منذ 15 دقيقة", icon: "bi-calendar-check" },
    { id: 3, type: "update", title: "تم تعديل ملف أحمد علي", time: "منذ ساعة", icon: "bi-pencil-square" },
    { id: 4, type: "appointment", title: "موعد جديد ليوسف خالد غداً", time: "منذ ساعتين", icon: "bi-calendar-event" },
    { id: 5, type: "session", title: "انتهت جلسة فاطمة السيد", time: "منذ 3 ساعات", icon: "bi-clock-history" },
    { id: 6, type: "new-patient", title: "تم إضافة مريض جديد (خالد سامي)", time: "منذ يوم", icon: "bi-person-plus-fill" }
  ]
};

export default database;