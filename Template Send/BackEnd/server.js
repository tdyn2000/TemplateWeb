require("dotenv").config();

var express = require("express");
var app = express();
var bodyParser = require("body-parser");
const cors = require("cors");

const utils = require("./utils");
const ac = require("./app/config/AccessControl");
const compression = require("compression");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());

require("./app/router/router.js")(app);

utils.syncDB.then(async () => {
  ac.grantAccess();
});

// Create a Server
var server = app.listen(10000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("App listening at http://%s:%s", host, port);
});
