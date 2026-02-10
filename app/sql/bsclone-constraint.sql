use bsclone;

-- Users table constraints
ALTER TABLE Users
    ADD CONSTRAINT chk_role CHECK (role IN ('Doctor', 'Patient')),
    ADD CONSTRAINT chk_gender CHECK (gender IN ('Male', 'Female', 'Other')),
    ADD CONSTRAINT chk_doctor_fields CHECK (
        (role = 'Doctor' AND permit_number IS NOT NULL AND ramq_number IS NULL) 
        OR
        (role = 'Patient' AND ramq_number IS NOT NULL AND permit_number IS NULL)
    );

-- Appointments table constraints
ALTER TABLE Appointments
    ADD CONSTRAINT chk_status CHECK (status IN ('Scheduled', 'Completed', 'Cancelled')),
    ADD CONSTRAINT fk_patient FOREIGN KEY (patient_id) REFERENCES Users(user_id) ON DELETE NO ACTION,
    ADD CONSTRAINT fk_doctor FOREIGN KEY (doctor_id) REFERENCES Users(user_id) ON DELETE NO ACTION,
    ADD CONSTRAINT fk_clinic FOREIGN KEY (clinic_id) REFERENCES Clinics(clinic_id) ON DELETE NO ACTION;

-- Documents table constraints
ALTER TABLE Documents
    ADD CONSTRAINT chk_document_type CHECK (document_type IN ('Prescription', 'Lab Result', 'Imagery')),
    ADD CONSTRAINT fk_appointment FOREIGN KEY (appointment_id) REFERENCES Appointments(appointment_id) ON DELETE CASCADE;

show databases

select * from appointments;
select * from clinics;
select * from documents;
select * from users;