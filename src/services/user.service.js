const User = require("../models/User");

const register = (body) => User.create(body);
const findAll = () => User.find();
const findById = (id) => User.findById(id);
const update = (id, name, email, password) =>
  User.findOneAndUpdate({ _id: id }, { name, email, password });
const deleteAccount = (id) => User.findByIdAndRemove(id);

module.exports = { register, findAll, findById, update, deleteAccount };
