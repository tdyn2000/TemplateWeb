const env = require("./env.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,

  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle,
  },
  logging: false,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../model/User.js")(sequelize, Sequelize);
db.roleDetail = require("../model/RoleDetail")(sequelize, Sequelize);
db.role = require("../model/Role.js")(sequelize, Sequelize);

db.user.belongsTo(db.role, {
  foreignKey: { name: "roleId", allowNull: false },
});

db.roleDetail.belongsTo(db.role, {
  foreignKey: { name: "roleId", allowNull: false },
});

module.exports = db;
