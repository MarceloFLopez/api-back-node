const pool = require("../config/database");
const Autor = require("../models/Autor");

class AutorService {
  // Criar uma nova autor
  static async criarAutor(nome) {
    try {
      const [result] = await pool.execute("INSERT INTO autor (nome) VALUES (?)", [nome]);
      return new Autor(result.insertId, nome);
    } catch (error) {
      console.error("Erro ao criar Autor:", error);
      throw error;
    }
  }

  // Buscar todas as Autor
  static async buscarTodosAutores() {
    try {
      const [rows] = await pool.execute("SELECT * FROM autor");
      return rows.map(row => new Autor(row.id, row.nome));
    } catch (error) {
      console.error("Erro ao buscar Autores:", error);
      throw error;
    }
  }

  // Buscar Autor por ID
  static async buscarAutorPorId(id) {
    try {
      const [rows] = await pool.execute("SELECT * FROM autor WHERE id = ?", [id]);
      if (rows.length === 0) return null;
      return new Autor(rows[0].id, rows[0].nome);
    } catch (error) {
      console.error("Erro ao buscar Autor por ID:", error);
      throw error;
    }
  }

  // Buscar Autor por nome
  static async buscarAutorPorNome(nome) {
    try {
        const [rows] = await pool.execute("SELECT * FROM autor WHERE nome LIKE ? COLLATE utf8_general_ci", [`%${nome}%`]);
        return rows.map(row => new Autor(row.id, row.nome));
    } catch (error) {
        console.error("❌ Erro ao buscar Autor por nome:", error);
        throw error;
    }
}

  // Atualizar Autor
  static async atualizarAutor(id, novoNome) {
    try {
      const [result] = await pool.execute("UPDATE autor SET nome = ? WHERE id = ?", [novoNome, id]);
      if (result.affectedRows === 0) return null;
      return new Autor(id, novoNome);
    } catch (error) {
      console.error("Erro ao atualizar Autor:", error);
      throw error;
    }
  }
}

module.exports = AutorService;
