const Transactions = require("../models/Transactions");

const create = (body) => Transactions.create(body);

module.exports = { create };