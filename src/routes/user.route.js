const route = require("express").Router();
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const { validID, validUser } = require("../middlewares/global.middlewares");

route.post("/", userController.register);
route.get("/", userController.findAll);
route.get("/:id", validID, validUser, userController.findById);
route.patch("/:id", authMiddleware, validUser, userController.update);
route.delete("/:id", authMiddleware, validUser, userController.deleteAccount);

module.exports = route;
