const userService = require("../services/user.service");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({
      msg: "Você precisa preencher todos os campos para se registrar!",
    });
  }

  const user = await userService.register(req.body);

  if (!user) {
    return res.status(400).json({ msg: "Erro ao criar Usuário" });
  }

  res.status(200).json({
    msg: "Usuário cadastrado com sucesso!",
    user: { id: user._id, name, email },
  });
};

module.exports = { register };
