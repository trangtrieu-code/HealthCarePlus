module.exports = (sequelize, DataTypes) => {
  // User Model
  const User = sequelize.define('User', {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [
          ['Doctor', 'Patient']
        ]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^[a-zA-Z][a-zA-Z\s-']{0,20}[a-zA-Z]$/,
        len: [1, 255]
      }
    },
    family_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone_no: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // must be (111)111-1111
        is: /^\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
      }
    },
    postal_code: {
      type: DataTypes.STRING,
      validate: {
        // allows spaces
      is: /^[A-Za-z0-9]+$/
      }
    },
    gender: {
      type: DataTypes.ENUM('M', 'F', 'X'),
      allowNull: false
    },
    dob: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    permit_number: {
      type: DataTypes.STRING, // For doctors
      unique: true,
      validate: {
        // must be formatted as DR11111
        is: /^DR\d{5}$/
      }
    },
    specialty: {
      type: DataTypes.STRING, // For doctors
      unique: false,
      validate: {
        is: /^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$/,
        len: [1, 255]
      }
    },
    ramq_number: {
      type: DataTypes.STRING, // For patients
      unique: true,
      validate: {
        // Example regex for RAMQ number format
        is: /^[A-Za-z]{4}\d{8}$/
      }
    },
    health_history: DataTypes.TEXT, // For patients
    resetTokenExpiry: {
      type: DataTypes.DATE,
      allowNull: true,
      validate: {
        isDate: true // Ensure it's a valid date
      }
    }
  }, {
    tableName: 'Users',
    timestamps: false,
  });

  // Clinic Model
  const Clinic = sequelize.define('Clinic', {
    clinic_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // Add any other fields specific to clinics
  }, {
    tableName: 'Clinics',
    timestamps: false,
  });

  // Appointment Model
  const Appointment = sequelize.define('Appointment', {
    appointment_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    patient_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    doctor_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    clinic_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    appointment_date: {
      type: DataTypes.DATE,
      allowNull: false
    },

    status: { 
      type: DataTypes.ENUM('Scheduled', 'Completed', 'Cancelled'), 
      allowNull: false 
    },
  }, 
  {
    tableName: 'Appointments',
    timestamps: false,
  });

  // Document Model
  const Document = sequelize.define("Document", {
    document_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        notNull: true,
        min: 1
      }
    },
    file_path: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 255],
        isValidPath(value) {
          if (!/^[a-zA-Z0-9_\-\/\\]+(\.[a-zA-Z0-9]+)?$/.test(value)) {
            throw new Error('Invalid file path format');
          }
        }
      }
    },
    data: {
      type: DataTypes.BLOB('long'),
      allowNull: true,
      validate: {
        notEmpty: true
      }
    },
    mimeType: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: "application/octet-stream",
      validate: {
        isValidMimeType(value) {
          const validMimeTypes = [
            "application/octet-stream",
            "application/pdf",
            "image/jpeg",
            "image/png",
            "text/plain"
            // Add more valid MIME types as needed
          ];
          if (!validMimeTypes.includes(value)) {
            throw new Error('Invalid MIME type');
          }
        }
      }
    },
    file_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 255],
        is: /^[a-zA-Z0-9_\-\.]+$/
      }
    },
    upload_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      validate: {
        isDate: true,
        notNull: true
      }
    }
  }, {
    tableName: 'Documents',
    timestamps: false,
  });

  // Define associations
  User.hasMany(Appointment, {
    foreignKey: 'patient_id',
    as: 'patientAppointments'
  });
  User.hasMany(Appointment, {
    foreignKey: 'doctor_id',
    as: 'doctorAppointments'
  });
  User.hasMany(Document, {
    foreignKey: 'user_id'
  });
  Clinic.hasMany(Appointment, {
    foreignKey: 'clinic_id'
  });
  Appointment.belongsTo(User, {
    foreignKey: 'patient_id',
    as: 'patient'
  });
  Appointment.belongsTo(User, {
    foreignKey: 'doctor_id',
    as: 'doctor'
  });
  Appointment.belongsTo(Clinic, {
    foreignKey: 'clinic_id'
  });
  Document.belongsTo(User, {
    foreignKey: 'user_id'
  });

  return {
    User,
    Clinic,
    Appointment,
    Document
  };
};