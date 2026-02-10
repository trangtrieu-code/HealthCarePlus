'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      role: {
        type: Sequelize.ENUM('Doctor', 'Patient'),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      family_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phone_no: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      postal_code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      gender: {
        type: Sequelize.ENUM('M', 'F', 'X'),
        allowNull: false,
      },
      dob: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      permit_number: {
        type: Sequelize.STRING, // For doctors
        unique: true,
        allowNull: true, 
      },
      specialty: {
        type: Sequelize.STRING, // For doctors
        allowNull: true, 
      },
      ramq_number: {
        type: Sequelize.STRING, // For patients
        unique: true,
        allowNull: true, 
      },
      health_history: {
        type: Sequelize.TEXT, // For patients
        allowNull: true, 
      }
    }, {
      tableName: 'Users',
      timestamps: false, 
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  },
};
