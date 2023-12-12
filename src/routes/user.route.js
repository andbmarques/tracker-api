const route = require("express").Router();
const userController = require("../controllers/user.controller");

route.post("/", userController.register);
route.get("/", userController.findAll);
route.get("/:id", userController.findById);

module.exports = route;
