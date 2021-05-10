// generate token using secret from process.env.JWT_SECRET
var jwt = require("jsonwebtoken");
const db = require("./app/config/db.config");
const Role = db.role;
const User = db.user;

// generate token and return it
async function generateToken(user) {
  if (!user) return null;

  var u = await getCleanUser(user);
  return jwt.sign(u, process.env.JWT_SECRET, {
    expiresIn: 60 * 60 * 24 * 29, // expires in 24 hours
  });
}

function verifyToken(req, res, next) {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      auth: false,
      message: "No token provided.",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        error: true,
        auth: false,
        message: "Fail to Authentication.",
      });
    }
    User.findByPk(decoded.id)
      .then((user) => {
        if (!user) {
          return res.status(401).send({
            error: true,
            auth: false,
            message: "Fail to Authentication.",
          });
        }
        req.user = decoded;
        next();
      })
      .catch((err) => {
        return res.status(500).send({
          error: true,
          auth: false,
          message: "Fail to Authentication.",
        });
      });
  });
}

// return basic user details
function getCleanUser(user) {
  if (!user) return null;
  const { password, ..._user } = user;
  return _user;
}

const syncDB = new Promise((resolve, reject) => {
  const force = false;

  // force: true will drop the table if it already exists
  db.sequelize
    .sync({ force: force })
    .then(async () => {
      console.log("Drop and Resync with { force: " + force + " }");
      await initial();
      resolve(true);
    })
    .catch((error) => {
      resolve(error);
    });

  async function initial() {
    await Role.create({
      id: 1,
      name: "ADMIN",
    });
    await Role.create({
      id: 2,
      name: "USER",
    });

    await User.create({
      username: "admin",
      password: "$2a$08$Jm9M0Ndl8zANH.c70QQrGOTdLzq4SypLdew.phkY7WrS0U1907VRq",
      roleId: 1,
    });

    await User.create({
      username: "user",
      password: "$2a$08$Jm9M0Ndl8zANH.c70QQrGOTdLzq4SypLdew.phkY7WrS0U1907VRq",
      roleId: 2,
    });
  }
});

module.exports = {
  generateToken,
  verifyToken,
  getCleanUser,
  syncDB,
};
