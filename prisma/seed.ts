/**
 * Seed script — fictional demo data only.
 * NEVER use real student records.
 * Run: npm run db:seed
 */
import { PrismaClient, Role, UserStatus, Gender, EnrollmentStatus, ExamStatus, MarksStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding S.K.R. INTER COLLEGE demo database...\n");

  // School settings
  await prisma.schoolSetting.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      schoolName: "S.K.R. INTER COLLEGE & PVT ITI",
      schoolNameHindi: "एस.के.आर. इंटर कॉलेज एवं प्राइवेट आईटीआई",
      tagline: "Quality Education for Rural Excellence",
      address: "Udaypur Khalsa, Post Bhadrauli, Bah, Pinahat, Agra, Uttar Pradesh, India — PIN 283113",
      pinCode: "283113",
      city: "Agra",
      state: "Uttar Pradesh",
      phone: "9837183726",
      mapUrl: "https://maps.app.goo.gl/8XxfUuM4fMUAxzqd7",
      latitude: 26.8774282,
      longitude: 78.453594,
      udiseCode: "09151302903",
      vision: "To provide quality education that empowers rural students to achieve academic excellence and become responsible citizens.",
      mission: "To nurture every student with knowledge, values and skills through dedicated teaching and a supportive learning environment.",
      workingHours: "Monday–Saturday: 8:00 AM – 2:00 PM",
      primaryColor: "#1e3a5f",
      accentColor: "#c9a227",
    },
  });
  console.log("✓ School settings");

  // Academic session
  const session = await prisma.academicSession.upsert({
    where: { name: "2025-26" },
    update: { isCurrent: true },
    create: {
      name: "2025-26",
      startDate: new Date("2025-04-01"),
      endDate: new Date("2026-03-31"),
      isCurrent: true,
      isActive: true,
    },
  });
  console.log("✓ Academic session 2025-26");

  // Divisions
  const interDiv = await prisma.division.upsert({
    where: { id: "div-inter" },
    update: {},
    create: {
      id: "div-inter",
      name: "Inter College",
      nameHindi: "इंटर कॉलेज",
      type: "INTER_COLLEGE",
      description: "High School and Intermediate (UP Board)",
    },
  });
  const itiDiv = await prisma.division.upsert({
    where: { id: "div-iti" },
    update: {},
    create: {
      id: "div-iti",
      name: "Private ITI",
      nameHindi: "प्राइवेट आईटीआई",
      type: "ITI",
      description: "Industrial Training Institute programmes",
    },
  });
  console.log("✓ Divisions");

  // Classes
  const class11 = await prisma.class.upsert({
    where: { id: "cls-11" },
    update: {},
    create: {
      id: "cls-11",
      name: "Class 11",
      nameHindi: "कक्षा 11",
      numericLevel: 11,
      divisionId: interDiv.id,
      academicSessionId: session.id,
      capacity: 60,
    },
  });
  const class12 = await prisma.class.upsert({
    where: { id: "cls-12" },
    update: {},
    create: {
      id: "cls-12",
      name: "Class 12",
      nameHindi: "कक्षा 12",
      numericLevel: 12,
      divisionId: interDiv.id,
      academicSessionId: session.id,
      capacity: 60,
    },
  });
  console.log("✓ Classes");

  // Sections
  const sec11A = await prisma.section.upsert({
    where: { classId_name: { classId: class11.id, name: "A" } },
    update: {},
    create: { name: "A", classId: class11.id, capacity: 40 },
  });
  const sec12A = await prisma.section.upsert({
    where: { classId_name: { classId: class12.id, name: "A" } },
    update: {},
    create: { name: "A", classId: class12.id, capacity: 40 },
  });
  console.log("✓ Sections");

  // Subjects for Class 11
  const subjects11 = [
    { name: "Hindi", nameHindi: "हिन्दी", code: "HIN", maxTheory: 100 },
    { name: "English", nameHindi: "अंग्रेज़ी", code: "ENG", maxTheory: 100 },
    { name: "Physics", nameHindi: "भौतिक विज्ञान", code: "PHY", maxTheory: 70, maxPractical: 30, isPractical: true },
    { name: "Chemistry", nameHindi: "रसायन विज्ञान", code: "CHE", maxTheory: 70, maxPractical: 30, isPractical: true },
    { name: "Mathematics", nameHindi: "गणित", code: "MAT", maxTheory: 100 },
  ];
  for (const s of subjects11) {
    await prisma.subject.upsert({
      where: { id: `sub-11-${s.code}` },
      update: {},
      create: { id: `sub-11-${s.code}`, classId: class11.id, ...s },
    });
  }
  console.log("✓ Subjects");

  // Super Admin
  const adminPass = process.env.BOOTSTRAP_ADMIN_PASSWORD || "ChangeMeImmediately123!";
  const adminHash = await bcrypt.hash(adminPass, 12);
  const admin = await prisma.user.upsert({
    where: { email: process.env.BOOTSTRAP_ADMIN_EMAIL || "admin@skrcollege.local" },
    update: {},
    create: {
      email: process.env.BOOTSTRAP_ADMIN_EMAIL || "admin@skrcollege.local",
      passwordHash: adminHash,
      role: Role.SUPER_ADMIN,
      status: UserStatus.ACTIVE,
      firstName: "System",
      lastName: "Administrator",
      displayName: "Super Admin",
      emailVerifiedAt: new Date(),
    },
  });
  console.log("✓ Super Admin:", admin.email);

  // Demo Teacher
  const teacherHash = await bcrypt.hash("Teacher@123", 12);
  const teacherUser = await prisma.user.upsert({
    where: { email: "teacher.demo@skrcollege.local" },
    update: {},
    create: {
      email: "teacher.demo@skrcollege.local",
      passwordHash: teacherHash,
      role: Role.TEACHER,
      status: UserStatus.ACTIVE,
      firstName: "Ramesh",
      lastName: "Sharma",
      displayName: "Mr. Ramesh Sharma",
      emailVerifiedAt: new Date(),
    },
  });
  const teacherStaff = await prisma.staff.upsert({
    where: { employeeId: "EMP001" },
    update: {},
    create: {
      userId: teacherUser.id,
      employeeId: "EMP001",
      firstName: "Ramesh",
      lastName: "Sharma",
      designation: "PGT Physics",
      isTeaching: true,
      phone: "9800000001",
      email: "teacher.demo@skrcollege.local",
      qualifications: "M.Sc. Physics, B.Ed.",
    },
  });
  console.log("✓ Demo Teacher");

  // Demo Students (fictional)
  const studentHash = await bcrypt.hash("Student@123", 12);
  const demoStudents = [
    { adm: "SKR2025001", first: "Aarav", last: "Kumar", gender: Gender.MALE, roll: "1" },
    { adm: "SKR2025002", first: "Priya", last: "Singh", gender: Gender.FEMALE, roll: "2" },
    { adm: "SKR2025003", first: "Rohan", last: "Verma", gender: Gender.MALE, roll: "3" },
    { adm: "SKR2025004", first: "Ananya", last: "Sharma", gender: Gender.FEMALE, roll: "4" },
    { adm: "SKR2025005", first: "Vikram", last: "Yadav", gender: Gender.MALE, roll: "5" },
  ];

  for (const s of demoStudents) {
    const user = await prisma.user.upsert({
      where: { email: `${s.adm.toLowerCase()}@student.skrcollege.local` },
      update: {},
      create: {
        email: `${s.adm.toLowerCase()}@student.skrcollege.local`,
        passwordHash: studentHash,
        role: Role.STUDENT,
        status: UserStatus.ACTIVE,
        firstName: s.first,
        lastName: s.last,
        displayName: `${s.first} ${s.last}`,
      },
    });
    const student = await prisma.student.upsert({
      where: { admissionNumber: s.adm },
      update: {},
      create: {
        userId: user.id,
        admissionNumber: s.adm,
        firstName: s.first,
        lastName: s.last,
        gender: s.gender,
        phone: `98${Math.floor(10000000 + Math.random() * 89999999)}`,
      },
    });
    await prisma.enrollment.upsert({
      where: { studentId_academicSessionId: { studentId: student.id, academicSessionId: session.id } },
      update: {},
      create: {
        studentId: student.id,
        classId: class11.id,
        sectionId: sec11A.id,
        academicSessionId: session.id,
        rollNumber: s.roll,
        status: EnrollmentStatus.ENROLLED,
      },
    });
  }
  console.log("✓ Demo students (5)");

  // Demo Parent
  const parentHash = await bcrypt.hash("Parent@123", 12);
  const parentUser = await prisma.user.upsert({
    where: { email: "parent.demo@skrcollege.local" },
    update: {},
    create: {
      email: "parent.demo@skrcollege.local",
      passwordHash: parentHash,
      role: Role.PARENT,
      status: UserStatus.ACTIVE,
      firstName: "Suresh",
      lastName: "Kumar",
      displayName: "Suresh Kumar (Parent)",
    },
  });
  const parent = await prisma.parent.upsert({
    where: { id: "parent-demo-1" },
    update: {},
    create: {
      id: "parent-demo-1",
      userId: parentUser.id,
      firstName: "Suresh",
      lastName: "Kumar",
      phone: "9811111111",
      relation: "Father",
      isPrimary: true,
    },
  });
  const firstStudent = await prisma.student.findFirst({ where: { admissionNumber: "SKR2025001" } });
  if (firstStudent) {
    await prisma.studentGuardian.upsert({
      where: { studentId_parentId: { studentId: firstStudent.id, parentId: parent.id } },
      update: {},
      create: {
        studentId: firstStudent.id,
        parentId: parent.id,
        relation: "Father",
        isPrimary: true,
      },
    });
  }
  console.log("✓ Demo Parent linked to Aarav Kumar");

  // Sample notice
  await prisma.notice.create({
    data: {
      title: "Academic Session 2025-26 Begins",
      titleHindi: "शैक्षणिक सत्र 2025-26 प्रारंभ",
      content: "Classes for the new academic session will commence from 1 April 2025. All students are requested to report on time with required books and stationery.",
      priority: "HIGH",
      audience: "PUBLIC",
      isPublished: true,
      publishAt: new Date(),
      academicSessionId: session.id,
      createdById: admin.id,
    },
  });
  console.log("✓ Sample notice");

  // Sample exam (draft)
  const exam = await prisma.exam.create({
    data: {
      name: "Unit Test 1",
      nameHindi: "इकाई परीक्षा 1",
      examType: "UNIT",
      academicSessionId: session.id,
      classId: class11.id,
      status: ExamStatus.MARKS_ENTRY,
      passingPercentage: 33,
      createdById: admin.id,
    },
  });
  const phy = await prisma.subject.findFirst({ where: { code: "PHY", classId: class11.id } });
  if (phy) {
    await prisma.examSubject.create({
      data: {
        examId: exam.id,
        subjectId: phy.id,
        maxTheory: 70,
        maxPractical: 30,
        passingMarks: 33,
      },
    });
  }
  console.log("✓ Sample exam (Unit Test 1)");

  console.log("\n✅ Seed complete.\n");
  console.log("Demo accounts (change passwords immediately):");
  console.log("  Super Admin : admin@skrcollege.local / ChangeMeImmediately123!");
  console.log("  Teacher     : teacher.demo@skrcollege.local / Teacher@123");
  console.log("  Student     : skr2025001@student.skrcollege.local / Student@123");
  console.log("  Parent      : parent.demo@skrcollege.local / Parent@123");
  console.log("\n⚠️  These are FICTIONAL demo accounts. Remove before production.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
