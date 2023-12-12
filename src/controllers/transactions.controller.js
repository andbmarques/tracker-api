const transactionsService = require("../services/transactions.service");

const create = async (req, res) => {
  try {
    const body = req.body;
    const id = req.params.id

    if (!body) return res.status(400).json({ msg: "Bad request" });

    const transaction = await transactionsService.create(body);


    if (!transaction)
      return res.status(400).json({ msg: "Erro ao criar transação" });

    res.status(200).json(transaction);
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
};

module.exports = { create };
