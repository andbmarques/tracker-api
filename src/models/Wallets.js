const mongoose = require("mongoose");

const WalletSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: false,
  },
  totalIncome: {
    type: Number,
    default: 0,
  },
  totalExpense: {
    type: Number,
    default: 0,
  },
  transactions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transactions",
    },
  ],
  balance: {
    type: Number,
    default: 0,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Wallet = mongoose.model("Wallet", WalletSchema);

module.exports = Wallet;
