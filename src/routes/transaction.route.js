const route = require("express").Router();
const transactionsController = require("../controllers/transactions.controller");
const authMiddleware = require("../middlewares/auth.middleware");

route.post("/create/:walletId", authMiddleware, transactionsController.create);

route.get("/", transactionsController.findAll);
route.get("/user", authMiddleware, transactionsController.findByUserId);
route.get("/:id", authMiddleware, transactionsController.findById);
route.get("/wallet/:walletId", authMiddleware, transactionsController.findByWalletId);

route.delete(
  "/:walletId/:id",
  authMiddleware,
  transactionsController.deleteTransaction
);

module.exports = route;
