const route = require("express").Router();
const transactionsController = require("../controllers/transactions.controller");
const authMiddleware = require("../middlewares/auth.middleware");

route.post("/create", authMiddleware, transactionsController.create);
route.get("/", transactionsController.findAll);
route.get("/user", authMiddleware, transactionsController.findByUserId);

module.exports = route;
