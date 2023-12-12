const User = require("../models/User");

const register = (body) => User.create(body);
const findAll = () => User.find();
const findById = (id) => User.findById(id);

module.exports = { register, findAll, findById };
