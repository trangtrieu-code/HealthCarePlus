const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/db.config');
const bscloneModel = require('./bsclone.model');

// Initialize Sequelize with the database configuration
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    dialectOptions: config.dialectOptions,
    pool: config.pool
  }
);

const models = bscloneModel(sequelize, DataTypes);

// Test the database connection
sequelize.authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err.message);
    console.error('Error details:', err);
  });

// Sync all models with the database
sequelize.sync({ force: false })
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });

// Check database connection
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database: ', error.message || error);
  });

// Export sequelize instance and models
module.exports = {
  sequelize,
  ...models
};
