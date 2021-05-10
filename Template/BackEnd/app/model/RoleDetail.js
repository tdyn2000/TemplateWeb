module.exports = (sequelize, Sequelize) => {
  const RoleDetail = sequelize.define("role_details", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    resource: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    action: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    actionType: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    roleId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });

  return RoleDetail;
};
