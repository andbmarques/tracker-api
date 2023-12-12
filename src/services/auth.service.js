const User = require("../models/User");
const jwt = require("jsonwebtoken");

const login = (email) => User.findOne({ email: email }).select("+password");

const generateToken = (id) => jwt.sign({ id: id }, process.env.SECRET, { expiresIn: 86400 });

module.exports = { login, generateToken };
