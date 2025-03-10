const pool = require("../config/database");
const Cliente = require("../models/Cliente");

class ClienteService {
  static async criarCliente(nome) {
    try {
      const [result] = await pool.execute("INSERT INTO cliente (nome) VALUES (?)", [nome]);
      return new Cliente(result.insertId, nome);
    } catch (error) {
      console.error("Erro ao criar Cliente:", error);
      throw error;
    }
  }

  static async buscarTodosClientes() {
    try {
      const [rows] = await pool.execute("SELECT * FROM cliente");
      return rows.map(row => new Cliente(row.id, row.nome));
    } catch (error) {
      console.error("Erro ao buscar Clientes:", error);
      throw error;
    }
  }

  static async buscarClientePorId(id) {
    try {
      const [rows] = await pool.execute("SELECT * FROM cliente WHERE id = ?", [id]);
      if (rows.length === 0) return null;
      return new Cliente(rows[0].id, rows[0].nome);
    } catch (error) {
      console.error("Erro ao buscar CLiente por ID:", error);
      throw error;
    }
  }

  static async buscarClientePorNome(nome) {
    try {
        const [rows] = await pool.execute("SELECT * FROM cliente WHERE nome LIKE ? COLLATE utf8_general_ci", [`%${nome}%`]);
        return rows.map(row => new Cliente(row.id, row.nome));
    } catch (error) {
        console.error("❌ Erro ao buscar Cliente por nome:", error);
        throw error;
    }
}

  static async atualizarCliente(id, novoNome) {
    try {
      const [result] = await pool.execute("UPDATE cliente SET nome = ? WHERE id = ?", [novoNome, id]);
      if (result.affectedRows === 0) return null;
      return new Cliente(id, novoNome);
    } catch (error) {
      console.error("Erro ao atualizar Cliente:", error);
      throw error;
    }
  }
}

module.exports = ClienteService;
