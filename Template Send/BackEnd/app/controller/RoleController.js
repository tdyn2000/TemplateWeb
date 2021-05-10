const db = require("../config/db.config.js");
const Role = db.role;
const RoleDetail = db.roleDetail;
const { accesscontrol: AC } = require("../config/AccessControl");
const { Resource } = require("../config/Permission");
const ac = require("../config/AccessControl");

exports.create = async (req, res) => {
  try {
    if (!AC.can(req.user.roleId.toString()).createAny(Resource.ROLES).granted) {
      return res.status(403).json({
        error: true,
        message: "Permission Denied.",
      });
    }

    const { role } = req.body;
    if (!role) {
      return res.status(400).json({
        error: true,
        message: "Please input role name.",
      });
    }

    Role.create(role)
      .then(async (role) => {
        const details = await RoleDetail.findAll({
          where: { roleId: role.id },
        });
        res.json({ role: role, details: details });
        await ac.grantAccess();
        return;
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: true,
          message: "Name is used, please use another name.",
        });
      });
  } catch (err) {
    res.status(500).json({
      error: true,
      message: err,
    });
  }
};

exports.findAll = async (req, res) => {
  if (!AC.can(req.user.roleId.toString()).readAny(Resource.ROLES).granted) {
    return res.status(403).json({
      error: true,
      message: "Permission Denied.",
    });
  }

  const roles = await Role.findAll();
  return res.json({ roles: roles });
};

exports.findOne = async (req, res) => {
  const permission =
    req.params.id == req.user.roleId
      ? AC.can(req.user.roleId.toString()).readOwn(Resource.ROLES).granted
      : AC.can(req.user.roleId.toString()).readAny(Resource.ROLES).granted;

  if (!permission) {
    return res.status(403).json({
      error: true,
      message: "Permission Denied.",
    });
  }

  const { id } = req.params;

  const role = await Role.findByPk(id);
  if (!role) {
    return res.json({ role: {}, details: [] });
  }
  const details = await RoleDetail.findAll({ where: { roleId: role.id } });
  return res.json({ role: role, details: details });
};

exports.update = async (req, res) => {
  const permission = AC.can(req.user.roleId.toString()).updateAny(
    Resource.ROLES
  ).granted;

  if (!permission) {
    return res.status(403).json({
      error: true,
      message: "Permission Denied.",
    });
  }

  const { role, details } = req.body;

  var num = await Role.update(role, {
    where: { id: role.id },
  });

  var ids = await RoleDetail.bulkCreate(details, {
    returning: true,
    updateOnDuplicate: ["id", "actionType"],
    plain: true,
  });

  AC.reset();
  console.log(JSON.stringify(AC));
  await ac.grantAccess();

  if (num != 0 || ids != undefined) {
    return res.json({ role: role, details: ids });
  } else {
    return res.status(500).json({
      error: true,
      message: "Role update unsuccessfully.",
    });
  }
};

exports.delete = async (req, res) => {
  const permission = AC.can(req.user.roleId.toString()).deleteAny(
    Resource.ROLES
  ).granted;

  if (!permission) {
    return res.status(403).json({
      error: true,
      message: "Permission Denied.",
    });
  }

  const { id } = req.params;
  const num = await Role.destroy({
    where: { id: id },
  });
  if (num > 0) {
    await RoleDetail.destroy({
      where: { roleId: id },
    });
    await ac.grantAccess();
    return res.json({ message: "Delete role successfully." });
  } else {
    return res.status(500).json({
      error: true,
      message: "Delete role unsuccessfully.",
    });
  }
};
