require("dotenv").config();

const jwt = require("jsonwebtoken");
const userService = require("../services/user.service");

const authMiddleware = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization)
      return res.status(401).json({ msg: "Token não informado." });

    const parts = authorization.split(" ");

    if (parts.length !== 2) {
      return res.status(400).json({ msg: "Token não formatado." });
    }

    const [schema, token] = parts;

    if (schema !== "Bearer")
      return res
        .status(400)
        .json({ msg: "Token deve possuir Bearer no inicio. " });

    jwt.verify(token, process.env.SECRET, async (error, decoded) => {
      if (error) return res.status(400).json({ msg: "Token inválido" });
      const user = await userService.findById(decoded.id);

      if (!user || !user.id)
        return res.status(400).json({ msg: "Token inválido" });

      req.id = decoded.id;
      return next();
    });
  } catch (error) {
    res.status(500).json({ msg: "Erro de servidor." });
  }
};

module.exports = authMiddleware;
