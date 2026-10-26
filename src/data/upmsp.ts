/**
 * Official public school profile from UPMSP Pehchan
 * Source: https://upmsp.edu.in/Pehchan/SchoolInformation.aspx?Code=011424
 * School code 011424 — SKR I C UDAYPUR KHALSA BHADRAULI BAH AGRA
 */

const UPMSP_IMG = (name: string) =>
  `/api/school-image?class=S&name=${encodeURIComponent(name)}`;

const UPMSP_TEACHER_IMG = (name: string) =>
  `/api/school-image?class=T&name=${encodeURIComponent(name)}`;

export const UPMSP_SOURCE =
  "https://upmsp.edu.in/Pehchan/SchoolInformation.aspx?Code=011424";

export const schoolProfile = {
  code: "011424",
  nameEn: "SKR I C UDAYPUR KHALSA BHADRAULI BAH AGRA",
  nameDisplay: "S.K.R. INTER COLLEGE",
  locationLine: "Udaypur Khalsa, Bhadrauli, Bah, Agra, Uttar Pradesh",
  district: "Agra",
  tehsil: "Bah",
  block: "Pinahat",
  distanceTehsilKm: 18,
  distanceBlockKm: 10,
  udise: "09181302903",
  type: "वित्तविहीन (self-financed / unaided)",
  level: "Intermediate",
  recognition: {
    highSchool: 2004,
    intermediate: 2011,
  },
  principal: {
    name: "Uttam Singh Tyagi",
    mobile: "9719903732",
  },
  manager: {
    name: "Omveer Tyagi",
  },
  websiteOfficial: "http://skrintercollege.in",
  publicEmail: "skrintercollege@gmail.com",
  coordinates: { lat: 26.8671452, lng: 78.4519261 },
  streamsInter: [
    "Humanities (Arts)",
    "Science",
    "Commerce",
    "Agriculture Part-1",
    "Agriculture Part-2",
    "Vocational",
  ],
  facilities: {
    classrooms: 22,
    cctv: { available: true, count: 22 },
    smartClass: false,
    scienceLab: true,
    artLab: false,
    computerLab: true,
    internetWifi: true,
    library: true,
    playground: true,
    boundaryWall: true,
    ironGate: true,
    electricity: true,
    generator: true,
    drinkingWater: true,
    toiletsBoys: true,
    toiletsGirls: true,
    cashRoom: true,
    fireExtinguisher: true,
  },
};

export const teachers = [
  {
    name: "Uttam Singh",
    role: "Principal",
    subject: "Intermediate — Geography",
    experienceYears: 16,
    image: UPMSP_TEACHER_IMG("011424_Teacher_uttamsingh_418888538957176.jpg"),
  },
  {
    name: "Mukesh Kumar",
    role: "Lecturer",
    subject: "Intermediate — Biology",
    experienceYears: 16,
    image: null as string | null,
  },
  {
    name: "Umakant",
    role: "Lecturer",
    subject: "Intermediate — Chemistry",
    experienceYears: 7,
    image: null as string | null,
  },
  {
    name: "Mahaveer Tyagi",
    role: "Lecturer",
    subject: "Intermediate — Civics",
    experienceYears: 16,
    image: UPMSP_TEACHER_IMG("011424_Teacher_mahaveertyagi_422677700795486.jpg"),
  },
  {
    name: "Abhay Tyagi",
    role: "Assistant Teacher",
    subject: "Intermediate — Ag. Botany",
    experienceYears: 3,
    image: UPMSP_TEACHER_IMG("011424_teacher_abhay_tyagi_28_07_1996.jpg"),
  },
  {
    name: "Rohit Pal",
    role: "Assistant Teacher",
    subject: "High School — Computer",
    experienceYears: 2,
    image: UPMSP_TEACHER_IMG("011424_teacher_rohit_pal_02_08_1991.jpg"),
  },
  {
    name: "Beena Bhadauriya",
    role: "Assistant Teacher",
    subject: "Intermediate — Sociology",
    experienceYears: 10,
    image: UPMSP_TEACHER_IMG("011424_teacher_beena_bhadauriya_12_07_1985.jpg"),
  },
  {
    name: "Vijay Devi",
    role: "Assistant Teacher",
    subject: "High School — Social Science",
    experienceYears: 9,
    image: UPMSP_TEACHER_IMG("011424_Teacher_vijaydevi_418888646628009.jpg"),
  },
  {
    name: "Shyam Bahadur Singh",
    role: "Assistant Teacher",
    subject: "High School — English",
    experienceYears: 6,
    image: UPMSP_TEACHER_IMG("011424_teacher_shyam_bahadur_singh_03_11_1987.jpg"),
  },
  {
    name: "Keshav Baboo",
    role: "Assistant Teacher",
    subject: "High School — Science",
    experienceYears: 2,
    image: UPMSP_TEACHER_IMG("011424_teacher_keshav_baboo_19_08_1994.jpg"),
  },
  {
    name: "Aman Tyagi",
    role: "Assistant Teacher",
    subject: "High School — Science",
    experienceYears: 5,
    image: null as string | null,
  },
  {
    name: "Vineet Kumar",
    role: "Assistant Teacher",
    subject: "Intermediate — Physics",
    experienceYears: 5,
    image: UPMSP_TEACHER_IMG("011424_teacher_vineet_kumar_02_03_1993.jpg"),
  },
  {
    name: "Ajay Sharma",
    role: "Assistant Teacher",
    subject: "Intermediate — English",
    experienceYears: 1,
    image: UPMSP_TEACHER_IMG("011424_teacher_ajay_sharma_06_02_1995.jpeg"),
  },
  {
    name: "Sonu Baghel",
    role: "Assistant Teacher",
    subject: "High School — Commerce",
    experienceYears: 0,
    image: UPMSP_TEACHER_IMG("011424_teacher_sonu_baghel_18_08_1996.jpg"),
  },
  {
    name: "Hari Singh",
    role: "Assistant Teacher",
    subject: "High School — Mathematics",
    experienceYears: 2,
    image: UPMSP_TEACHER_IMG("011424_teacher_hari_singh_01_10_2002.jpg"),
  },
  {
    name: "Bijendra",
    role: "Other",
    subject: "High School — Social Science",
    experienceYears: 16,
    image: UPMSP_TEACHER_IMG("011424_Teacher_bijendra_418887591789931.jpg"),
  },
];

export const highSchoolBoardResults = [
  { year: 2020, registered: 121, appeared: 118, passed: 116, passPercent: 98.31 },
  { year: 2021, registered: 125, appeared: 124, passed: 124, passPercent: 100 },
  { year: 2022, registered: 69, appeared: 64, passed: 62, passPercent: 89.86 },
  { year: 2023, registered: 80, appeared: 79, passed: 79, passPercent: 98.75 },
  { year: 2024, registered: 100, appeared: 99, passed: 99, passPercent: 100 },
  { year: 2025, registered: 72, appeared: 71, passed: 68, passPercent: 95.77 },
  { year: 2026, registered: 66, appeared: 63, passed: 63, passPercent: 100 },
];


export const intermediateBoardResults = [
  { year: 2020, registered: 140, appeared: 140, passed: 121, passPercent: 86.43 },
  { year: 2021, registered: 170, appeared: 168, passed: 168, passPercent: 100 },
  { year: 2022, registered: 85, appeared: 79, passed: 75, passPercent: 88.24 },
  { year: 2023, registered: 124, appeared: 118, passed: 105, passPercent: 84.68 },
  { year: 2024, registered: 85, appeared: 83, passed: 70, passPercent: 84.34 },
  { year: 2025, registered: 93, appeared: 93, passed: 80, passPercent: 86.02 },
  { year: 2026, registered: 73, appeared: 73, passed: 72, passPercent: 98.63 },
];

export const studentStatistics = [
  { className: "Class 9", boys: 38, girls: 24, total: 62 },
  { className: "Class 10", boys: 33, girls: 33, total: 66 },
  { className: "Class 11", boys: null, girls: null, total: 56 },
  { className: "Class 12", boys: 41, girls: 32, total: 73 },
];

export const schoolReportCard = {
  totalStudents: 257,
  totalTeachers: 16,
  classrooms: 22,
  infrastructureAvailable: 13,
  infrastructureTotal: 15,
  score: 122,
  scoreOutOf: 200,
  grade: "A",
  stateRank: "5338 / 28529",
  districtRank: "203 / 908",
  class10ScoreBands: [
    { label: "Above 75%", students: 24 },
    { label: "60–75%", students: 37 },
    { label: "45–60%", students: 2 },
  ],
  class12ScoreBands: [
    { label: "Above 75%", students: 2 },
    { label: "60–75%", students: 45 },
    { label: "45–60%", students: 25 },
  ],
};

export const schoolAchievements = [
  "Parent outreach and regular communication with families",
  "Tree plantation and environmental awareness activities",
  "Community health and awareness initiatives",
  "Sports competitions and extracurricular activities",
  "Remedial support for students who need additional academic help",
  "Teacher training and student safety awareness activities",
];

export const officialLinks = [
  { title: "UPMSP — Uttar Pradesh Madhyamik Shiksha Parishad", url: "https://upmsp.edu.in" },
  { title: "NCERT", url: "https://ncert.nic.in" },
  { title: "Scholarship & Fee Reimbursement (Uttar Pradesh)", url: "https://services.india.gov.in/service/detail/scholarship-and-fee-reimbursement-online-system-uttar-pradesh-1" },
  { title: "DIKSHA e-learning", url: "https://diksha.gov.in" },
  { title: "NCERT Books", url: "https://www.ncertbooks.guru/ncert-books-pdf" },
  { title: "INSPIRE Awards", url: "https://www.inspireawards-dst.gov.in" },
  { title: "UDISE+", url: "https://udiseplus.gov.in" },
  { title: "School website", url: "http://skrintercollege.in" },
  { title: "UPMSP Pehchan report card method (PDF)", url: "https://upmsp.edu.in/Downloads/REPORT_CARD_SCHOOL.pdf" },
];

export const galleryImages = [
  { title: "School building", src: UPMSP_IMG("011424_ALLSCHOOLWEBSITE_01_SchoolBuilding.jpg") },
  { title: "School gate", src: UPMSP_IMG("011424_ALLSCHOOLWEBSITE_02_SchoolGate.jpg") },
  { title: "Principal room", src: UPMSP_IMG("011424_ALLSCHOOLWEBSITE_03_PrincipalRoom.jpeg") },
  { title: "Class 10", src: UPMSP_IMG("011424_ALLSCHOOLWEBSITE_04_Class10.jpg") },
  { title: "Class 12", src: UPMSP_IMG("011424_ALLSCHOOLWEBSITE_05_Class12.jpg") },
  { title: "Library", src: UPMSP_IMG("011424_ALLSCHOOLWEBSITE_06_Library.jpg") },
  { title: "Laboratory", src: UPMSP_IMG("011424_ALLSCHOOLWEBSITE_07_Laboratory.jpg") },
  { title: "Prayer assembly", src: UPMSP_IMG("011424_ALLSCHOOLWEBSITE_07_PrayerAssembly.jpg") },
  { title: "CCTV / router", src: UPMSP_IMG("011424_ALLSCHOOLWEBSITE_09_CCTV.jpg") },
  { title: "Other campus photo", src: UPMSP_IMG("011424_ALLSCHOOLWEBSITE_08_Other.jpg") },
  { title: "Art laboratory", src: UPMSP_IMG("011424_ALLSCHOOLWEBSITE_13_ArtClass.jpg") },
  { title: "Playground", src: UPMSP_IMG("011424_ALLSCHOOLWEBSITE_15_PlayGround.jpg") },
  { title: "Computer class", src: UPMSP_IMG("011424_ALLSCHOOLWEBSITE_16_ComputerClass.jpg") },
  { title: "Additional campus photo 1", src: UPMSP_IMG("011424_ALLSCHOOLWEBSITE_15_Image1.jpg") },
  { title: "Additional campus photo 2", src: UPMSP_IMG("011424_ALLSCHOOLWEBSITE_16_Image2.jpg") },
  { title: "Additional campus photo 3", src: UPMSP_IMG("011424_ALLSCHOOLWEBSITE_17_Image3.jpg") },
  { title: "Additional campus photo 4", src: UPMSP_IMG("011424_ALLSCHOOLWEBSITE_18_Image4.jpg") },
  { title: "Additional campus photo 5", src: UPMSP_IMG("011424_ALLSCHOOLWEBSITE_19_Image5.jpg") },
];
