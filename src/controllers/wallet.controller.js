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

    res.status(200).json(wallet);
  } catch (error) {
    res.status(500).json({ msg: "Erro de servidor.", err: error });
  }
};

const deleteWallet = async (req, res) => {
  try {
    const walletId = req.params.id;
    const userId = req.id;

    console.log({ walletId, userId });

    await walletService.deleteWallet(walletId, userId);

    res.status(200).json({ msg: "Wallet deletada com sucesso." });
  } catch (error) {
    res.status(500).json({ msg: "Erro de servidor.", err: error.message });
  }
};

const findAll = async (req, res) => {
  try {
    let { limit, offset } = req.query;
    limit = Number(limit);
    offset = Number(offset);

    if (!limit) limit = 5;
    if (!offset) offset = 0;

    const wallets = await walletService.findAll(offset, limit);

    res.status(200).json(wallets);
  } catch (error) {
    res.status(500).json({ msg: "Erro de servidor." });
  }
};

const findByUserId = async (req, res) => {
  try {
    const id = req.id;

    const wallets = await walletService.findByUserId(id);

    res.status(200).json(wallets);
  } catch (error) {
    res.status(500).json({ msg: "Erro de servidor." });
  }
};

const findById = async (req, res) => {
  try {
    const id = req.params.id;

    const wallet = await walletService.findById(id);

    if (!wallet) return res.status(404).json({ msg: "Wallet não existe." });

    res.status(200).json(wallet);
  } catch (error) {
    res.status(500).json({ msg: "Erro de servidor.", err: error.message });
  }
};

const update = async (req, res) => {
  try {
    const body = req.body;
    const id = req.params.id;

    if (!body)
      return res.status(400).json({
        msg: "Você deve alterar pelo menos um campo para prosseguir.",
      });

    const wallet = await walletService.update(body, id);

    if (!wallet) return res.status(404).json({ msg: "Wallet não existe." });

    res.status(200).json({ msg: "Wallet alterada com sucesso." });
  } catch (error) {
    res.status(500).json({ msg: "Erro de servidor.", err: error.message });
  }
};

module.exports = {
  create,
  findAll,
  findByUserId,
  deleteWallet,
  findById,
  update,
};
