const utils = require("../../utils");

module.exports = function (app) {
  const userController = require("../controller/UserController.js");
  const roleController = require("../controller/RoleController");

  //Users
  app.post("/api/signup", userController.signup);
  app.post("/api/signin", userController.signin);
  app.post("/api/createUser", [utils.verifyToken], userController.create);
  app.get("/api/users", [utils.verifyToken], userController.findAll);
  app.get("/api/user/:id", [utils.verifyToken], userController.findOne);
  app.post("/api/updateUser", [utils.verifyToken], userController.update);
  app.get("/api/deleteUser/:id", [utils.verifyToken], userController.delete);


  //Role
  app.post("/api/createRole", [utils.verifyToken], roleController.create);
  app.get("/api/roles", [utils.verifyToken], roleController.findAll);
  app.get("/api/role/:id", [utils.verifyToken], roleController.findOne);
  app.post("/api/updateRole", [utils.verifyToken], roleController.update);
  app.get("/api/deleteRole/:id", [utils.verifyToken], roleController.delete);
};
