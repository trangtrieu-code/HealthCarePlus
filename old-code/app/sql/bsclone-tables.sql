use bsclone;
 
-- Users table
CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    family_name VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone_no VARCHAR(20) NOT NULL,
    postal_code VARCHAR(20),
    role VARCHAR(10) NOT NULL,
    gender VARCHAR(10) NOT NULL,
    dob DATE NOT NULL,
    -- Only for Doctors
    permit_number VARCHAR(10) UNIQUE,
    specialty VARCHAR(40),
    -- Only for Patients
    ramq_number VARCHAR(12) UNIQUE,
    health_history TEXT
);
 
-- Clinics table
CREATE TABLE Clinics (
    clinic_id INT AUTO_INCREMENT PRIMARY KEY,
    clinic_name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    phone_no VARCHAR(20),
    email VARCHAR(100),
    postal_code VARCHAR(20),
    website VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
 
-- Appointments table
CREATE TABLE Appointments (
    appointment_id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT NOT NULL,
    doctor_id INT NOT NULL,
    clinic_id INT NOT NULL,
    appointment_date DATETIME NOT NULL,
    status VARCHAR(20) NOT NULL
);
 
-- Documents table
CREATE TABLE Documents (
    document_id INT AUTO_INCREMENT PRIMARY KEY,
    appointment_id INT NOT NULL,
    document_type VARCHAR(50) NOT NULL,
    document_url VARCHAR(255) NOT NULL,
    upload_date DATETIME DEFAULT CURRENT_TIMESTAMP
);