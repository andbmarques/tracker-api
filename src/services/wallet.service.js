const Wallet = require("../models/Wallets");
const User = require("../models/User");

const create = async (body) => {
  console.log(body)
  const wallet = await Wallet.create({ title: body.title, owner: body.owner });
  await User.findByIdAndUpdate(
    body.owner,
    { $push: { wallets: wallet._id } },
    { new: true }
  );
  return wallet;
};
const findAll = (offset, limit) =>
  Wallet.find().sort({ _id: -1 }).skip(offset).limit(limit).populate("owner");

const findByUserId = (id) => Wallet.find({ owner: id });

module.exports = { create, findAll, findByUserId };
