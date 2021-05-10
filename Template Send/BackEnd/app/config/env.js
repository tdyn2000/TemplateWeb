const env = {
  database: "db_template",
  username: "root",
  password: "password123",
  host: "localhost",
  dialect: "mssql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

module.exports = env;
