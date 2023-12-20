require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./src/database/db");

const userRoute = require("./src/routes/user.route");
const transactionsRoute = require("./src/routes/transaction.route");
const walletRoute = require("./src/routes/wallet.route");
const authRoute = require("./src/routes/auth.route");

db();
app.use(express.json());
app.use(cors({
    origin: "*"
}));
app.use("/user", userRoute);
app.use("/transactions", transactionsRoute);
app.use("/wallet", walletRoute);
app.use("/auth", authRoute);

app.listen(3000);
