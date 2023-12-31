const { default: mongoose } = require("mongoose");
const userService = require("../services/user.service");

const register = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({ msg: "Erro de Servidor." });
  }
};

const findAll = async (req, res) => {
  try {
    const users = await userService.findAll();

    if (users.length === 0)
      return res.status(404).json({ msg: "Nenhum usuário encontrado." });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ msg: "Erro de servidor." });
  }
};

const findById = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res.status(404).json({ msg: "Usuário não encontrado/cadastrado." });
  }
};

const update = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name && !email && !password)
      return res
        .status(400)
        .json({
          msg: "Você deve alterar pelo menos um campo para prosseguir.",
        });

    await userService.update(req.id, name, email, password);

    res.status(200).send({ msg: "Usuário alterado com sucesso." });
  } catch (error) {
    res.status(500).json({ msg: "Erro de servidor.", err: error });
  }
};

const deleteAccount = async (req, res) => {
  try {
    await userService.deleteAccount(req.id);

    res.status(200).json({ msg: "Usuário deletado com sucesso." });
  } catch (error) {
    res.status(500).json({ msg: "Erro de Servidor.", err: error });
  }
};

module.exports = { register, findAll, findById, update, deleteAccount };
