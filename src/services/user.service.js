const User = require("../models/User");

const register = (body) => User.create(body);

module.exports = { register };
