const userService = require("../services/user.service");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({
      msg: "Você precisa preencher todos os campos para se registrar.",
    });
  }

  const user = await userService.register(req.body);

  if (!user) {
    return res.status(400).json({ msg: "Erro ao criar Usuário." });
  }

  res.status(200).json({
    msg: "Usuário cadastrado com sucesso!",
    user: { id: user._id, name, email },
  });
};

const findAll = async (req, res) => {
  const users = await userService.findAll();

  if (users.length === 0)
    return res.status(404).json({ msg: "Nenhum usuário encontrado." });

  res.status(200).json(users);
};

const findById = async (req, res) => {
  try {
    const user = await userService.findById(req.params.id);

    if (!user)
      return res
        .status(404)
        .json({ msg: "Usuário não encontrado/cadastrado." });

    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ msg: "Usuário não encontrado/cadastrado." })
  }
};

module.exports = { register, findAll, findById };
