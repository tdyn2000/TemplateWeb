const Resource = {
  USERS: "users",
  ROLES: "roles",
};

const Action = {
  CREATE: "create",
  READ: "read",
  UPDATE: "update",
  DELETE: "delete",
};

const ActionType = {
  ANY: "any",
  OWN: "own",
  DENY: "deny",
};

const Permission = { Resource, Action, ActionType };

module.exports = Permission;
