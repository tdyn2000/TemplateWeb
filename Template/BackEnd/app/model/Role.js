const {
  Resource,
  Action: PAction,
  ActionType,
} = require("../config/Permission");

const actions = [PAction.CREATE, PAction.UPDATE, PAction.DELETE, PAction.READ];

module.exports = (sequelize, Sequelize) => {
  const RoleDetail = require("./RoleDetail")(sequelize, Sequelize);

  const Role = sequelize.define(
    "roles",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      timestamps: false,
      hooks: {
        afterCreate: async (role) => {
          var roleDetails = [];
          for (const [key, resouce] of Object.entries(Resource)) {
            for (action of actions) {
              var roleDetail = {};
              roleDetail.resource = resouce;
              roleDetail.action = action;
              roleDetail.actionType = ActionType.ANY;
              roleDetail.roleId = role.id;
              roleDetails.push(roleDetail);
            }
          }
          var roleDetails = await RoleDetail.bulkCreate(roleDetails, {
            returning: true,
          });
        }
      },
    }
  );

  return Role;
};
