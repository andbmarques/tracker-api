const register = (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res
      .status(400)
      .json({
        msg: "Você precisa preencher todos os campos para se registrar!",
      });
  }

  res
    .status(200)
    .json({ msg: "Usuário cadastrado com sucesso!", user: { name, email } });
};

module.exports = { register };
