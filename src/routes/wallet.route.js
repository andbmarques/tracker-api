const route = require("express").Router();
const walletController = require("../controllers/wallet.controller");
const authMiddleware = require("../middlewares/auth.middleware");

route.post("/create", authMiddleware, walletController.create);

route.get("/", walletController.findAll);
route.get("/user", authMiddleware, walletController.findByUserId);
route.get("/:id", authMiddleware, walletController.findById);

route.patch("/:id", authMiddleware, walletController.update);

route.delete("/delete/:id", authMiddleware, walletController.deleteWallet);

module.exports = route;
