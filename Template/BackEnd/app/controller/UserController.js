const db = require("../config/db.config.js");
const User = db.user;
const Role = db.role;
const { accesscontrol: AC } = require("../config/AccessControl");
const { Resource } = require("../config/Permission");
var bcrypt = require("bcryptjs");
const utils = require("../../utils");

exports.signup = async (req, res) => {
  const username = req.body.username.trim();
  const { password, email } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      error: true,
      message: "Username and Password required.",
    });
  }

  let user = await User.findOne({
    where: {
      username: username,
    },
  });

  if (user) {
    return res.status(400).json({
      error: true,
      message: "Username is already taken.",
      code: 100,
    });
  }

  let role = await Role.findOne({
    where: {
      name: "USER",
    },
  });

  user = (
    await User.create({
      name: req.body.name,
      username: username,
      password: bcrypt.hashSync(password, 8),
      email: email,
      roleId: role.id,
    })
  ).dataValues;

  if (!user) {
    res.status(500).json({
      error: true,
      message: err,
    });
  } else {
    const token = await utils.generateToken(user);
    const userObj = await utils.getCleanUser(user);
    return res.json({ user: userObj, token });
  }
};

exports.signin = async (req, res) => {
  const username = req.body.username.trim();
  const pwd = req.body.password;

  if (!username || !pwd) {
    return res.status(400).json({
      error: true,
      message: "Username and Password required.",
    });
  }

  var data = (
    await User.findOne({
      where: {
        username: username,
      },
    })
  );

  var user = null;
  if(data!=null){
    user = data.dataValues;
  }

  if (user==null) {
    return res.status(404).json({
      error: true,
      message: "User Not Found.",
    });
  } else {
    var passwordIsValid = bcrypt.compareSync(pwd, user.password);
    if (!passwordIsValid) {
      return res.status(401).json({
        auth: false,
        accessToken: null,
        reason: "Invalid Password!",
      });
    }

    const token = await utils.generateToken(user);
    const userObj = await utils.getCleanUser(user);

    return res.json({ user: userObj, token });
  }
};

exports.findAll = async (req, res) => {
  const permission = AC.can(req.user.roleId.toString()).readAny(Resource.USERS)
    .granted;

  if (!permission) {
    return res.status(403).json({
      error: true,
      message: "Permission Denied.",
    });
  }

  var users = await User.findAll({ raw: true });
  var _users = users.map((user) => {
    return utils.getCleanUser(user);
  });
  return res.json({ users: _users });
};

exports.findOne = async (req, res) => {
  const { id } = req.params;
  const permission =
    id == req.user.id
      ? AC.can(req.user.roleId.toString()).readOwn(Resource.USERS).granted
      : AC.can(req.user.roleId.toString()).readAny(Resource.USERS).granted;

  if (!permission) {
    return res.status(403).json({
      error: true,
      message: "Permission Denied.",
    });
  }

  if (id == undefined) {
    return res.status(500).json({
      error: true,
      message: "Please input user id.",
    });
  }

  const user = await User.findByPk(id);

  if (user == undefined) {
    return res.json({ user: {} });
  }
  const _user = utils.getCleanUser(user.dataValues);
  return res.json({ user: _user });
};

exports.update = async (req, res) => {
  const { user } = req.body;
  const permission =
    user.id == req.user.id
      ? AC.can(req.user.roleId.toString()).updateOwn(Resource.USERS).granted
      : AC.can(req.user.roleId.toString()).updateAny(Resource.USERS).granted;

  if (!permission) {
    return res.status(403).json({
      error: true,
      message: "Permission Denied.",
    });
  }

  if (user.id == undefined) {
    return res.status(500).json({
      error: true,
      message: "Update user unsuccessfully.",
    });
  }

  var _user;
  if (user.password != undefined) {
    _user = {
      ...user,
      password: bcrypt.hashSync(user.password, 8),
    };
  } else {
    _user = user;
  }

  const num = await User.update(_user, {
    where: { id: user.id },
  });

  if (num > 0) {
    return res.json({ user: user });
  } else {
    return res.status(500).json({
      error: true,
      message: "Update user unsuccessfully.",
    });
  }
};

exports.create = async (req, res) => {
  try {
    const permission = AC.can(req.user.roleId.toString()).createAny(
      Resource.USERS
    ).granted;
    if (!permission) {
      return res.status(403).json({
        error: true,
        message: "Permission Denied.",
      });
    }

    var { user } = req.body;
    if (!user.username || !user.password) {
      return res.status(400).json({
        error: true,
        message: "Username and Password required.",
      });
    }

    var _user = await User.findOne({
      where: {
        username: user.username,
      },
    });

    if (_user) {
      return res.status(400).json({
        error: true,
        message: "Username is already taken.",
        code: 100,
      });
    }

    const _password = bcrypt.hashSync(user.password, 8);
    _user = { ...user, password: _password };
    user = (await User.create(_user)).dataValues;

    if (!user) {
      res.status(500).json({
        error: true,
        message: err,
      });
    } else {
      const token = await utils.generateToken(user);
      const userObj = await utils.getCleanUser(user);
      return res.json({ user: userObj, token });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: true,
      message: error,
      code: 500,
    });
  }
};

exports.delete = async (req, res) => {
  const permission = AC.can(req.user.roleId.toString()).deleteAny(
    Resource.USERS
  ).granted;

  if (!permission) {
    return res.status(403).json({
      error: true,
      message: "Permission Denied.",
    });
  }

  const { id } = req.params;
  const num = await User.destroy({
    where: { id: id },
  });

  if (num != 0) {
    return res.json({ message: "Delete user successfully." });
  } else {
    return res.status(500).json({
      error: true,
      message: "Delete user unsuccessfully.",
    });
  }
};
