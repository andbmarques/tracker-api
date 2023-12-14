const route = require("express").Router();
const walletController = require("../controllers/wallet.controller");
const authMiddleware = require("../middlewares/auth.middleware");

route.post("/create", authMiddleware, walletController.create);
route.get("/", walletController.findAll);
route.get("/user", authMiddleware, walletController.findByUserId);

module.exports = route;
