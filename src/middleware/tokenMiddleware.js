const db = require("../config/database");

const verificarTokenRevogado = async (token) => {
  try {
    const [resultado] = await db.execute(
      "SELECT * FROM tokens_revogados WHERE token = ?",
      [token]
    );
    return resultado.length > 0;
  } catch (error) {
    console.error("Erro na verificação do token revogado:", error);
    throw new Error("Erro ao verificar token revogado.");
  }
};

module.exports = verificarTokenRevogado;
