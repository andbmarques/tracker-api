const Transactions = require("../models/Transactions");
const User = require("../models/User");

const create = async (body) => {
  const transaction = await Transactions.create(body);
  await User.findByIdAndUpdate(body.owner, { $push: { transactions: transaction._id } }, { new: true })
  return transaction;
};

const findAll = (offset, limit) =>
  Transactions.find()
    .sort({ _id: -1 })
    .skip(offset)
    .limit(limit)
    .populate("owner");

const findByUserId = (id) => Transactions.find({ owner: id });

module.exports = { create, findAll, findByUserId };
