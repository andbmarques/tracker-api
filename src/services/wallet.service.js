const Wallet = require("../models/Wallets");
const User = require("../models/User");
const { default: mongoose } = require("mongoose");

const create = async (body) => {
  console.log(body);
  const wallet = await Wallet.create({ title: body.title, owner: body.owner });
  await User.findByIdAndUpdate(
    body.owner,
    { $push: { wallets: wallet._id } },
    { new: true }
  );
  return wallet;
};

const deleteWallet = async (id, userId) => {
  await User.findOneAndUpdate(
    { _id: userId },
    { $pull: { wallets: new mongoose.Types.ObjectId(id) } },
    { new: true }
  );
  return await Wallet.findByIdAndDelete(id);
};

const findAll = (offset, limit) =>
  Wallet.find()
    .sort({ _id: -1 })
    .skip(offset)
    .limit(limit)
    .populate("owner", "name");

const findByUserId = (id) => Wallet.find({ owner: id });

const findById = (id) => Wallet.findById(id);

const update = async (body, id) => await Wallet.findByIdAndUpdate(id, body);

module.exports = {
  create,
  findAll,
  findByUserId,
  deleteWallet,
  findById,
  update,
};