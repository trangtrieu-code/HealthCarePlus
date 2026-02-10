module.exports = {
  HOST: "fsdtrang4.mysql.database.azure.com",
  USER: "dbadmin",
  PASSWORD: "k@)4U562%wDDA[C",
  DB: "bsclone",
  dialect: "mysql",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};