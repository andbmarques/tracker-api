const User = require("../models/User");
const Wallet = require("../models/Wallets");

const register = (body) => User.create(body);
const findAll = () => User.find().populate("wallets", "title").exec();
const findById = (id) => User.findById(id).populate("wallets", "title").exec();
const update = (id, name, email, password) =>
  User.findOneAndUpdate({ _id: id }, { name, email, password });
const deleteAccount = async (id) => {
  await Wallet.deleteMany({ owner: id })
  return await User.findByIdAndRemove(id);
};

module.exports = { register, findAll, findById, update, deleteAccount };
