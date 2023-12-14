const walletService = require("../services/wallet.service");

const create = async (req, res) => {
  try {
    const { title } = req.body;
    const id = req.id;

    if (!title)
      return res
        .status(400)
        .json({ msg: "Você deve informar o campo Titulo para prosseguir." });

    const wallet = await walletService.create({ title: title, owner: id });

    if (!wallet)
      return res.status(400).json({ msg: "Erro ao criar carteira." });

    res.status(200).json(wallet)
  } catch (error) {
    res.status(500).json({ msg: "Erro de servidor.", err: error });
  }
};
const findAll = (req, res) => {};
const findByUserId = (req, res) => {};

module.exports = { create, findAll, findByUserId };
