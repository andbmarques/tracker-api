const transactionsService = require("../services/transactions.service");

const create = async (req, res) => {
  try {
    const { title, type, value } = req.body;
    const id = req.id;

    if (!title || !type || !value) return res.status(400).json({ msg: "Todos os campos devem estar preenchidos para criar uma transação." })

    const transaction = await transactionsService.create({ title, type, value, owner: id });

    if (!transaction)
      return res.status(400).json({ msg: "Erro ao criar transação" });

    res.status(200).json(transaction);
  } catch (error) {
    return res.status(500).json({ msg: "Erro de servidor." });
  }
};

const findAll = async (req, res) => {
  try {
    const transactions = await transactionsService.findAll();

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ msg: "Erro de servidor." });
  }
};

module.exports = { create, findAll };
