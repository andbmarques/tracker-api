const Transactions = require("../models/Transactions");
const User = require("../models/User");
const Wallet = require("../models/Wallets");
const mongoose = require("mongoose");

const create = async (body) => {
  const transaction = await Transactions.create(body);
  const wallet = await Wallet.findById(body.wallet);
  await Wallet.findByIdAndUpdate(
    body.wallet,
    { $push: { transactions: transaction._id } },
    { new: true }
  );
  if (body.type === "Income") {
    const newBalance = transaction.value + wallet.balance;
    const newTotal = transaction.value + wallet.totalIncome;
    await Wallet.findByIdAndUpdate(body.wallet, {
      balance: newBalance,
      totalIncome: newTotal,
    });
  } else {
    const newBalance = wallet.balance - transaction.value;
    const newTotal = transaction.value + wallet.totalExpense;
    await Wallet.findByIdAndUpdate(body.wallet, {
      balance: newBalance,
      totalExpense: newTotal,
    });
  }
  return transaction;
};

const deleteTransaction = async (transactionId, walletId) => {
  const transaction = await Transactions.findById(transactionId);
  const wallet = await Wallet.findById(walletId);
  if (transaction.type === "Income") {
    const newBalance = wallet.balance - transaction.value;
    const newTotal = wallet.totalIncome - transaction.value;
    await Wallet.findByIdAndUpdate(walletId, {
      balance: newBalance,
      totalIncome: newTotal,
    });
  } else {
    const newBalance = wallet.balance + transaction.value;
    const newTotal = wallet.totalExpense - transaction.value;
    await Wallet.findByIdAndUpdate(walletId, {
      balance: newBalance,
      totalExpense: newTotal,
    });
  }
  await Wallet.findOneAndUpdate(
    { _id: walletId },
    { $pull: { transactions: new mongoose.Types.ObjectId(transactionId) } },
    { new: true }
  );
  return await Transactions.findByIdAndDelete(transactionId);
};

const findAll = (offset, limit) =>
  Transactions.find()
    .sort({ _id: -1 })
    .skip(offset)
    .limit(limit)
    .populate("owner", "name")
    .populate("wallet", "title balance");

const findByUserId = (id) => Transactions.find({ owner: id });

const findById = (id) => Transactions.findById(id);

const findByWalletId = (walletId, offset, limit) =>
  Transactions.find({ wallet: walletId })
    .sort({ _id: -1 })
    .skip(offset)
    .limit(limit)

module.exports = {
  create,
  findAll,
  findByUserId,
  deleteTransaction,
  findById,
  findByWalletId,
};
