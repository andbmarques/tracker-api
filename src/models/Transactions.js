const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["Expense", "Income"],
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  wallet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Wallet',
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

const Transaction = mongoose.model("Transactions", TransactionSchema, "transactions");

module.exports = Transaction;
