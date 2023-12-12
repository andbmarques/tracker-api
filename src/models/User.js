const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  transactions: [
    {
      title: "string",
      type: {
        type: String,
        enum: ["Income", "Expense"],
      },
      value: Number,
    },
  ],
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
