const Transactions = require("../models/Transactions");

const create = (body) => Transactions.create(body);

const findAll = () => Transactions.find();

module.exports = { create, findAll };