const db = require("../config/database");
const Saque = require("../models/Saque");

class SaqueService {
  // Criar um novo saque
  static async criarSaque(dados) {
    try {
      const { data, plataforma, intermediador, banco, valor, prazo } = dados;

      const query = `
        INSERT INTO saques (data, plataforma, intermediador, banco, valor, prazo)
        VALUES (?, ?, ?, ?, ?, ?)
      `;

      const valores = [data, plataforma, intermediador, banco, valor, prazo];

      const [resultado] = await db.execute(query, valores);
      return new Saque(resultado.insertId, data, plataforma, intermediador, banco, valor, prazo);
    } catch (error) {
      throw new Error("Erro ao criar saque: " + error.message);
    }
  }

  // Listar todos os saques
  static async listarTodosSaques() {
    try {
      const query = `SELECT * FROM saques`;
      const [rows] = await db.execute(query);
      return rows.map(row => new Saque(row.id, row.data, row.plataforma, row.intermediador, row.banco, row.valor, row.prazo));
    } catch (error) {
      throw new Error("Erro ao listar saques: " + error.message);
    }
  }

  // Buscar saque por ID
  static async buscarSaquePorId(id) {
    try {
      const query = `SELECT * FROM saques WHERE id = ?`;
      const [rows] = await db.execute(query, [id]);
      if (rows.length === 0) return null;
      const row = rows[0];
      return new Saque(row.id, row.data, row.plataforma, row.intermediador, row.banco, row.valor, row.prazo);
    } catch (error) {
      throw new Error("Erro ao buscar saque por ID: " + error.message);
    }
  }

static async buscarSaquePorPlataforma(plataforma) {
    try {
      const query = `
      SELECT * FROM saques WHERE plataforma LIKE ?;
      `;
      if (!plataforma) {
        throw new Error("Plataforma não fornecida");
      }
      const [saques] = await db.execute(query, [`%${plataforma}%`]);
      return saques; // Retorna os saques encontrados
    } catch (error) {
      throw new Error("Erro ao buscar saques pela plataforma: " + error.message);
    }
  }

  // Editar saque
  static async editarSaque(id, dados) {
    try {
      const { data, plataforma, intermediador, banco, valor, prazo } = dados;

      const query = `
        UPDATE saques
        SET data = ?, plataforma = ?, intermediador = ?, banco = ?, valor = ?, prazo = ?
        WHERE id = ?
      `;

      const valores = [data, plataforma, intermediador, banco, valor, prazo, id];
      const [resultado] = await db.execute(query, valores);

      if (resultado.affectedRows === 0) return null;

      return new Saque(id, data, plataforma, intermediador, banco, valor, prazo);
    } catch (error) {
      throw new Error("Erro ao editar saque: " + error.message);
    }
  }

  // Deletar saque
  static async deletarSaque(id) {
    try {
      const query = `DELETE FROM saques WHERE id = ?`;
      const [resultado] = await db.execute(query, [id]);

      return resultado.affectedRows > 0;
    } catch (error) {
      throw new Error("Erro ao deletar saque: " + error.message);
    }
  }
}

module.exports = SaqueService;
