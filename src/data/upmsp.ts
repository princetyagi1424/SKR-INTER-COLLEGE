/**
 * Official public school profile from UPMSP Pehchan
 * Source: https://upmsp.edu.in/Pehchan/SchoolInformation.aspx?Code=011424
 * School code 011424 — SKR I C UDAYPUR KHALSA BHADRAULI BAH AGRA
 */

const UPMSP_IMG = (name: string) =>
  `https://upmsp.edu.in/Pehchan/GetImage.aspx?Class=S&Dist=01&ImageName=${encodeURIComponent(name)}`;

const UPMSP_TEACHER_IMG = (name: string) =>
  `https://upmsp.edu.in/Pehchan/GetImage.aspx?Class=T&Dist=011424&ImageName=${encodeURIComponent(name)}`;

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
  { title: "CCTV", src: UPMSP_IMG("011424_ALLSCHOOLWEBSITE_09_CCTV.jpg") },
  { title: "Playground", src: UPMSP_IMG("011424_ALLSCHOOLWEBSITE_15_PlayGround.jpg") },
  { title: "Computer class", src: UPMSP_IMG("011424_ALLSCHOOLWEBSITE_16_ComputerClass.jpg") },
];
