const mongoose = require("mongoose");

const connectDatabase = () => {
  console.log("\n[DB] Conectando ao MongoDB");

  mongoose
    .connect(
      `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster0.lhphqlj.mongodb.net/trackerdb?retryWrites=true&w=majority`
    )
    .then(() => console.log("\n[DB] MongoDB Conectado!"))
    .catch((err) => console.log("\n[DB] Erro: ", err));
};

module.exports = connectDatabase;
