import dr1 from "./dr/dr1.png";
import dr2 from "./dr/dr2.png";
import dr3 from "./dr/dr3.png";
import dr4 from "./dr/dr4.png";
import dr5 from "./dr/dr5.png";
import dr6 from "./dr/dr6.png";
import dr7 from "./dr/dr7.png";
import dr8 from "./dr/dr8.png";
import dr9 from "./dr/dr9.png";
import dr10 from "./dr/dr10.png";
import dr11 from "./dr/dr11.png";
import dr12 from "./dr/dr12.png";
import dr13 from "./dr/dr13.png";
import dr14 from "./dr/dr14.png";
import dr15 from "./dr/dr15.png";
import drsc from "./dr/drsc.jpg";
import drmt from "./dr/drmt.jpg";
import drer from "./dr/drer.jpg";
import drjw from "./dr/drjw.jpg";
import homeImage from "./home.jpg";
import about from "./about.jpg";
import contact from "./contact.jpg";
import userImage from "./user.png";

export const assets = {
  dr1,
  dr2,
  dr3,
  dr4,
  dr5,
  dr6,
  dr7,
  dr8,
  dr9,
  dr10,
  dr11,
  dr12,
  dr13,
  dr14,
  dr15,
  drsc,
  drmt,
  drer,
  drjw,
  homeImage,
  about,
  contact,
  userImage,
};

export const specialityData = [
  {
    speciality: "Primary care",
    image: [dr1, dr2, dr3, dr5],
  },
  {
    speciality: "General physician",
    image: [dr4, dr15],
  },
  {
    speciality: "Cardiologist",
    image: [dr7, dr8],
  },
  {
    speciality: "Dermatologist",
    image: [dr9],
  },
  {
    speciality: "Gynecologist",
    image: [dr11, dr10],
  },
  {
    speciality: "Pediatrician",
    image: [dr12, dr13],
  },
  {
    speciality: "Psychiatrist",
    image: [dr14],
  },
  {
    speciality: "Orthopedic",
    image: [dr6],
  },
];

export const doctors = [
  // Primary care (4 doctors)
  {
    _id: "dr1",
    name: "Dr. John Doe",
    speciality: "Primary care",
    image: dr1,
    degree: "MBBS, MD",
    experience: 10,
    about:
      "Dr. John Doe is a highly experienced primary care physician with over 10 years of practice in providing comprehensive healthcare services to patients of all ages.",
    fee: 100,
    address: {
      line1: "123 Main St",
      line2: "QC, Canada",
    },
  },
  {
    _id: "dr2",
    name: "Dr. Patricia Lee",
    speciality: "Primary care",
    image: dr2,
    degree: "MBBS, MD",
    experience: 8,
    about:
      "Dr. Patricia Lee is a dedicated primary care physician with 8 years of experience, focusing on preventive medicine and comprehensive patient care.",
    fee: 105,
    address: {
      line1: "234 Health Blvd",
      line2: "QC, Canada",
    },
  },
  {
    _id: "dr3",
    name: "Dr. Robert Chen",
    speciality: "Primary care",
    image: dr3,
    degree: "MBBS, MD",
    experience: 12,
    about:
      "Dr. Robert Chen is a skilled primary care physician with over 12 years of experience in diagnosing and treating a wide range of medical conditions.",
    fee: 110,
    address: {
      line1: "345 Medical Ave",
      line2: "QC, Canada",
    },
  },
  {
    _id: "dr5",
    name: "Dr. Lisa Anderson",
    speciality: "Primary care",
    image: dr5,
    degree: "MBBS, MD",
    experience: 9,
    about:
      "Dr. Lisa Anderson provides comprehensive primary medical care with 9 years of experience, emphasizing patient-centered treatment approaches.",
    fee: 108,
    address: {
      line1: "456 Care St",
      line2: "QC, Canada",
    },
  },
  // General physician (2 doctors)
  {
    _id: "dr4",
    name: "Dr. Michael Brown",
    speciality: "General physician",
    image: dr4,
    degree: "MBBS, MD",
    experience: 11,
    about:
      "Dr. Michael Brown is a compassionate general physician with over 11 years of experience providing comprehensive healthcare services.",
    fee: 112,
    address: {
      line1: "567 General Ave",
      line2: "QC, Canada",
    },
  },
  {
    _id: "dr15",
    name: "Dr. Jennifer White",
    speciality: "General physician",
    image: dr15,
    degree: "MBBS, MD",
    experience: 7,
    about:
      "Dr. Jennifer White is a dedicated general physician specializing in comprehensive medical care and preventive health services.",
    fee: 110,
    address: {
      line1: "678 Physician St",
      line2: "QC, Canada",
    },
  },
  // Cardiologist (2 doctors)
  {
    _id: "dr7",
    name: "Dr. John Smith",
    speciality: "Cardiologist",
    image: dr7,
    degree: "MBBS, MD, DM",
    experience: 8,
    about:
      "Dr. John Smith is a renowned cardiologist specializing in the diagnosis and treatment of heart-related conditions. With 18 years of experience, he is dedicated to improving cardiovascular health.",
    fee: 150,
    address: {
      line1: "789 Heart Ave",
      line2: "QC, Canada",
    },
  },
  {
    _id: "dr8",
    name: "Dr. David Kumar",
    speciality: "Cardiologist",
    image: dr8,
    degree: "MBBS, MD, DM",
    experience: 11,
    about:
      "Dr. David Kumar is an expert cardiologist with 11 years of experience in interventional cardiology and cardiac rehabilitation programs.",
    fee: 155,
    address: {
      line1: "890 Cardiac Rd",
      line2: "QC, Canada",
    },
  },
  // Dermatologist (1 doctor)
  {
    _id: "dr9",
    name: "Dr. Emily Johnson",
    speciality: "Dermatologist",
    image: dr9,
    degree: "MBBS, MD",
    experience: 6,
    about:
      "Dr. Emily Johnson is a skilled dermatologist with expertise in treating various skin conditions. With 6 years of experience, she provides personalized care to enhance skin health and appearance.",
    fee: 120,
    address: {
      line1: "901 Skin Blvd",
      line2: "QC, Canada",
    },
  },
  // Gynecologist (2 doctors)
  {
    _id: "dr11",
    name: "Dr. Sarah Davis",
    speciality: "Gynecologist",
    image: dr11,
    degree: "MBBS, MD",
    experience: 12,
    about:
      "Dr. Sarah Davis is a compassionate gynecologist with over 12 years of experience in women's health. She is committed to providing comprehensive care for all stages of womanhood.",
    fee: 130,
    address: {
      line1: "101 Women's Way",
      line2: "QC, Canada",
    },
  },
  {
    _id: "dr10",
    name: "Dr. James Taylor",
    speciality: "Gynecologist",
    image: dr10,
    degree: "MBBS, MD",
    experience: 9,
    about:
      "Dr. James Taylor is an experienced gynecologist with 9 years of practice, specializing in reproductive health and minimally invasive procedures.",
    fee: 128,
    address: {
      line1: "202 Gynecology St",
      line2: "QC, Canada",
    },
  },
  // Pediatrician (2 doctors)
  {
    _id: "dr12",
    name: "Dr. William Wilson",
    speciality: "Pediatrician",
    image: dr12,
    degree: "MBBS, MD",
    experience: 7,
    about:
      "Dr. William Wilson is a dedicated pediatrician with 7 years of experience in caring for children's health. He focuses on providing preventive care and managing childhood illnesses.",
    fee: 110,
    address: {
      line1: "303 Kids St",
      line2: "QC, Canada",
    },
  },
  {
    _id: "dr13",
    name: "Dr. Maria Garcia",
    speciality: "Pediatrician",
    image: dr13,
    degree: "MBBS, MD",
    experience: 9,
    about:
      "Dr. Maria Garcia is an experienced pediatrician with 9 years of practice, specializing in developmental pediatrics and adolescent medicine.",
    fee: 112,
    address: {
      line1: "404 Children Ave",
      line2: "QC, Canada",
    },
  },
  // Psychiatrist (1 doctor)
  {
    _id: "dr14",
    name: "Dr. Olivier Martinez",
    speciality: "Psychiatrist",
    image: dr14,
    degree: "MBBS, MD",
    experience: 11,
    about:
      "Dr. Olivier Martinez is a board-certified psychiatrist with 11 years of experience in treating anxiety, depression, and mood disorders. He is dedicated to helping patients achieve mental well-being through therapy and medication management.",
    fee: 140,
    address: {
      line1: "505 Mind Ave",
      line2: "QC, Canada",
    },
  },
  // Orthopedic (1 doctor)
  {
    _id: "dr6",
    name: "Dr. Mark Thompson",
    speciality: "Orthopedic",
    image: dr6,
    degree: "MBBS, MS",
    experience: 10,
    about:
      "Dr. Mark Thompson is a skilled orthopedic surgeon with over 10 years of experience in treating musculoskeletal conditions. He is committed to restoring mobility and improving quality of life for his patients.",
    fee: 160,
    address: {
      line1: "606 Bone Rd",
      line2: "QC, Canada",
    },
  },
];
