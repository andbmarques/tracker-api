const route = require("express").Router();
const transactionsController = require("../controllers/transactions.controller")

route.post("/create/:id", transactionsController.create);

module.exports = route;