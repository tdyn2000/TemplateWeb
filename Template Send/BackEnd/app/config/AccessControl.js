const AccessControl = require("accesscontrol");
const db = require("./db.config");
const RoleDetail = db.roleDetail;

var ac = {};
ac.accesscontrol = new AccessControl();
ac.grantAccess = async function grantAccess() {
  const roleDetails = await RoleDetail.findAll({ raw: true });
  const _roleDetails = roleDetails
    .filter((roleDetail) => {
      return roleDetail.actionType != "deny";
    })
    .map((roleDetail) => {
      return {
        role: roleDetail.roleId.toString(),
        resource: roleDetail.resource,
        action: roleDetail.action + ":" + roleDetail.actionType,
      };
    });
    ac.accesscontrol.setGrants(_roleDetails);
};

module.exports = ac;
