require("dotenv").config();
const express = require("express");
const app = express();
const db = require("./src/database/db");

const userRoute = require("./src/routes/user.route");
const transactionsRoute = require("./src/routes/transaction.route");

db();
app.use(express.json());
app.use("/user", userRoute);
app.use("/transactions", transactionsRoute);

app.listen(3000);
