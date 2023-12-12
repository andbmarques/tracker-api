const mongoose = require("mongoose");
const userService = require("../services/user.service");

const validID = (req, res, next) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ msg: "ID de Usuário inválido." });

  next();
};

const validUser = async (req, res, next) => {
  const id = req.params.id;

  const user = await userService.findById(id);

  if (!user)
    return res.status(404).json({ msg: "Usuário não encontrado/cadastrado." });

  req.id = id;
  req.user = user;

  next();
};

module.exports = { validID, validUser };
