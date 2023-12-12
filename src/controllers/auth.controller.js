const bcrypt = require("bcryptjs");
const authService = require("../services/auth.service");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await authService.login(email);

    if (!user)
      return res
        .status(404)
        .json({ msg: "Usuário ou Senha não encontrado/cadastrado." });

    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid)
      return res
        .status(404)
        .json({ msg: "Usuário ou Senha não encontrado/cadastrado." });

    const token = authService.generateToken(user.id);

    user.password = "";
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ msg: "Erro de servidor." });
  }
};

module.exports = { login };
