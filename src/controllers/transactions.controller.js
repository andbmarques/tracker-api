const transactionsService = require("../services/transactions.service");
const walletService = require("../services/wallet.service");


const create = async (req, res) => {
  try {
    const { title, type, value } = req.body;
    const id = req.id;
    const walletId = req.params.walletId;

    if (!walletId)
      return res
        .status(400)
        .json({ msg: "Uma wallet deve ser associada com o seu ID." });

    const wallet = await walletService.findById(walletId);

    if (!wallet) return res.status(404).json({ msg: "Wallet não existe." });

    if (!title || !type || !value)
      return res.status(400).json({
        msg: "Todos os campos devem estar preenchidos para criar uma transação.",
      });

    const transaction = await transactionsService.create({
      title,
      type,
      value,
      owner: id,
      wallet: walletId,
    });

    if (!transaction)
      return res.status(400).json({ msg: "Erro ao criar transação" });

    res.status(200).json(transaction);
  } catch (error) {
    return res.status(500).json({ msg: "Erro de servidor." });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const transactionId = req.params.id;
    const walletId = req.params.walletId;

    await transactionsService.deleteTransaction(transactionId, walletId);

    res.status(200).json({ msg: "Transaction deletada com sucesso." });
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

    const transactions = await transactionsService.findAll(offset, limit);

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ msg: "Erro de servidor." });
  }
};

const findByUserId = async (req, res) => {
  try {
    const id = req.id;

    const transactions = await transactionsService.findByUserId(id);

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ msg: "Erro de servidor" });
  }
};

module.exports = { create, findAll, findByUserId, deleteTransaction };
